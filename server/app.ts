import express, { type NextFunction, type Request, type Response } from "express";
import { authConfigured, clearSessionCookie, sessionFromRequest, setSessionCookie, verifyCredentials, type AdminEnv } from "./auth";
import type { AppStore } from "./store";
import { contentUpdateSchema, leadInputSchema, leadUpdateSchema, loginSchema, sectionUpdateSchema, seoUpdateSchema } from "./validation";
import { isPublicRoute, validateSchemaJson } from "../shared/site";

export type AppOptions = { store: AppStore; env: AdminEnv; databaseConfigured: boolean };
type Envelope = { success: boolean; data: unknown; error: { code: string; message: string; fields?: unknown } | null };
const ok = (res: Response, data: unknown, status = 200) => res.status(status).json({ success: true, data, error: null } satisfies Envelope);
const fail = (res: Response, status: number, code: string, message: string, fields?: unknown) => res.status(status).json({ success: false, data: null, error: { code, message, ...(fields ? { fields } : {}) } } satisfies Envelope);

function limiter(windowMs: number, max: number) {
  const hits = new Map<string, { count: number; reset: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const hit = hits.get(key);
    if (!hit || hit.reset <= now) hits.set(key, { count: 1, reset: now + windowMs });
    else if (++hit.count > max) return fail(res, 429, "RATE_LIMITED", "Too many requests. Please wait and try again.");
    next();
  };
}

function asyncRoute(handler: (req: Request, res: Response) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => void handler(req, res).catch(next);
}

function csvCell(value: unknown) {
  const text = value instanceof Date ? value.toISOString() : String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export function createApp({ store, env, databaseConfigured }: AppOptions) {
  const app = express();
  if (process.env.TRUST_PROXY) app.set("trust proxy", process.env.TRUST_PROXY);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "64kb" }));
  app.use(express.urlencoded({ extended: false, limit: "64kb" }));

  app.get("/api/health", (_req, res) => ok(res, { status: "ok", databaseConfigured, timestamp: new Date().toISOString() }));
  app.get("/api/public/config", asyncRoute(async (_req, res) => ok(res, await store.publicConfig())));

  app.post("/api/leads", limiter(15 * 60_000, 5), asyncRoute(async (req, res) => {
    const parsed = leadInputSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Check the highlighted fields.", parsed.error.flatten().fieldErrors);
    if (parsed.data.website) return ok(res, { accepted: true }, 201);
    const { consent: _consent, website: _website, ...lead } = parsed.data;
    const created = await store.createLead(lead);
    return ok(res, created, 201);
  }));

  app.post("/api/admin/login", limiter(15 * 60_000, 8), (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Enter a valid email and password.");
    if (!authConfigured(env)) return fail(res, 503, "ADMIN_NOT_CONFIGURED", "Admin login is not configured.");
    if (!verifyCredentials(parsed.data.email, parsed.data.password, env)) return fail(res, 401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
    setSessionCookie(res, env.adminEmail!, env);
    return ok(res, { email: env.adminEmail, expiresInSeconds: 8 * 60 * 60 });
  });

  app.post("/api/admin/logout", (req, res) => {
    clearSessionCookie(res, env);
    return ok(res, { loggedOut: true });
  });

  app.get("/api/admin/session", (req, res) => {
    const session = sessionFromRequest(req, env);
    return session ? ok(res, session) : fail(res, 401, "UNAUTHORIZED", "Sign in to continue.");
  });

  app.use("/api/admin", (req, res, next) => {
    if (!sessionFromRequest(req, env)) return fail(res, 401, "UNAUTHORIZED", "Sign in to continue.");
    next();
  });

  app.get("/api/admin/leads", asyncRoute(async (req, res) => {
    const filter = {
      status: typeof req.query.status === "string" ? req.query.status.trim() : undefined,
      search: typeof req.query.search === "string" ? req.query.search.trim().slice(0, 180) : undefined,
      specialty: typeof req.query.specialty === "string" ? req.query.specialty.trim() : undefined,
    };
    const [items, counts] = await Promise.all([store.listLeads(filter), store.leadCounts()]);
    return ok(res, { items, counts });
  }));

  app.get("/api/admin/leads.csv", asyncRoute(async (req, res) => {
    const items = await store.listLeads({
      status: typeof req.query.status === "string" ? req.query.status.trim() : undefined,
      search: typeof req.query.search === "string" ? req.query.search.trim().slice(0, 180) : undefined,
      specialty: typeof req.query.specialty === "string" ? req.query.specialty.trim() : undefined,
    });
    const keys = ["id", "createdAt", "name", "email", "phone", "practiceName", "specialty", "location", "monthlyPatients", "source", "utmSource", "utmMedium", "utmCampaign", "status", "message", "notes"];
    const csv = [keys.join(","), ...items.map(item => keys.map(key => csvCell(item[key])).join(","))].join("\r\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="docpropel-leads.csv"');
    return res.send(csv);
  }));

  app.patch("/api/admin/leads/:id", asyncRoute(async (req, res) => {
    const id = Number(req.params.id);
    const parsed = leadUpdateSchema.safeParse(req.body);
    if (!Number.isSafeInteger(id) || id < 1 || !parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Provide a valid lead update.");
    const updated = await store.updateLead(id, parsed.data);
    return updated ? ok(res, updated) : fail(res, 404, "NOT_FOUND", "Lead not found.");
  }));

  app.get("/api/admin/content", asyncRoute(async (_req, res) => ok(res, await store.getContent())));
  app.put("/api/admin/content/:id", asyncRoute(async (req, res) => {
    const id = Number(req.params.id);
    const parsed = contentUpdateSchema.safeParse(req.body);
    if (!Number.isSafeInteger(id) || id < 1 || !parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Provide valid content.", parsed.success ? undefined : parsed.error.flatten().fieldErrors);
    const updated = await store.updateContent(id, parsed.data);
    return updated ? ok(res, updated) : fail(res, 404, "NOT_FOUND", "Content block not found.");
  }));

  app.get("/api/admin/sections", asyncRoute(async (_req, res) => ok(res, await store.getSections())));
  app.patch("/api/admin/sections/:id", asyncRoute(async (req, res) => {
    const id = Number(req.params.id);
    const parsed = sectionUpdateSchema.safeParse(req.body);
    if (!Number.isSafeInteger(id) || id < 1 || !parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Provide a valid section update.");
    const updated = await store.updateSection(id, parsed.data);
    return updated ? ok(res, updated) : fail(res, 404, "NOT_FOUND", "Section not found.");
  }));

  app.get("/api/admin/seo", asyncRoute(async (_req, res) => ok(res, await store.getSeo())));
  app.put("/api/admin/seo/:route(*)", asyncRoute(async (req, res) => {
    const route = `/${req.params.route || ""}`.replace(/\/$/, "") || "/";
    const parsed = seoUpdateSchema.safeParse(req.body);
    if (!isPublicRoute(route) || !parsed.success) return fail(res, 400, "VALIDATION_ERROR", "Provide valid SEO fields.", parsed.success ? undefined : parsed.error.flatten().fieldErrors);
    const schemaResult = validateSchemaJson(parsed.data.schemaJson);
    if (!schemaResult.valid) return fail(res, 400, "INVALID_SCHEMA", schemaResult.message);
    const { schemaJson: _raw, ...record } = parsed.data;
    return ok(res, await store.putSeo(route, { ...record, route, schemaJson: schemaResult.parsed }));
  }));

  app.use("/api", (_req, res) => fail(res, 404, "NOT_FOUND", "API endpoint not found."));
  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[server] request failed", error instanceof Error ? error.message : "Unknown error");
    return fail(res, 500, "SERVER_ERROR", "The request could not be completed.");
  });
  return app;
}
