import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";
import {
  DEFAULT_SEO,
  ORGANIZATION_SCHEMA,
  PUBLIC_ROUTES,
  WEBSITE_SCHEMA,
  type SeoSeed,
} from "../shared/site";
import { createApp } from "./app";
import { getDb, ping, seedDefaults } from "./db";
import { postgresStore, type AppStore } from "./store";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    char =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char]!
  );
}

function jsonForScript(value: unknown) {
  return JSON.stringify(value)
    .replaceAll("</", "<\\/")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

function sitemapXml(siteUrl: string, records: SeoSeed[]) {
  const urls = PUBLIC_ROUTES.map(
    route =>
      records.find(record => record.route === route) ??
      DEFAULT_SEO.find(record => record.route === route)!
  )
    .filter(record => !record.noindex)
    .map(
      record =>
        `  <url><loc>${escape(`${siteUrl}${record.canonicalPath}`)}</loc></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function internalSeo(route: string): SeoSeed {
  const admin = route === "/admin" || route === "/admin/login";
  return {
    route: "/" as SeoSeed["route"],
    title: admin ? "Admin sign in | DocPropel" : "Page not found | DocPropel",
    description: admin
      ? "Protected DocPropel administration sign-in."
      : "This DocPropel page is not available.",
    canonicalPath: "/",
    noindex: true,
    ogTitle: admin ? "Admin sign in | DocPropel" : "Page not found | DocPropel",
    ogDescription: admin
      ? "Protected DocPropel administration sign-in."
      : "This DocPropel page is not available.",
    ogImage: "/og-image-1200x630.png",
    twitterImage: "/twitter-card-1200x630.png",
    schemaJson: "",
  };
}

async function main() {
  const production = process.env.NODE_ENV === "production";
  const db = getDb();
  if (
    production &&
    (!process.env.SESSION_SECRET ||
      process.env.SESSION_SECRET.length < 32 ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD)
  ) {
    throw new Error(
      "Production requires SESSION_SECRET (32+ characters), ADMIN_EMAIL, and ADMIN_PASSWORD."
    );
  }
  if (production && !db) throw new Error("Production requires DATABASE_URL.");
  if (db) {
    await ping(db);
    if (process.env.SEED_DEFAULTS !== "false") await seedDefaults(db);
  }

  const unavailable = async () => {
    throw new Error("Database is not configured.");
  };
  const emptyStore: AppStore = {
    createLead: unavailable,
    listLeads: unavailable,
    updateLead: unavailable,
    leadCounts: async () => ({
      all: 0,
      new: 0,
      contacted: 0,
      qualified: 0,
      closed: 0,
    }),
    publicConfig: async () => ({ content: [], sections: [], seo: [] }),
    getContent: async () => [],
    updateContent: unavailable,
    getSections: async () => [],
    updateSection: unavailable,
    getSeo: async () => [],
    putSeo: unavailable,
  };
  const store = db ? postgresStore(db) : emptyStore;
  const app = createApp({
    store,
    databaseConfigured: Boolean(db),
    env: {
      adminEmail: process.env.ADMIN_EMAIL,
      adminPassword: process.env.ADMIN_PASSWORD,
      sessionSecret: process.env.SESSION_SECRET,
      production,
    },
  });
  const server = createHttpServer(app);
  const siteUrl = (process.env.SITE_URL || "https://docpropel.com").replace(
    /\/$/,
    ""
  );

  async function seoFor(pathname: string) {
    if (!PUBLIC_ROUTES.includes(pathname as (typeof PUBLIC_ROUTES)[number])) {
      return internalSeo(pathname);
    }
    const fallback =
      DEFAULT_SEO.find(item => item.route === pathname) ?? DEFAULT_SEO[0];
    try {
      const config = await store.publicConfig();
      return (config.seo.find((item: SeoSeed) => item.route === pathname) ??
        fallback) as SeoSeed;
    } catch {
      return fallback;
    }
  }

  async function allSeo() {
    try {
      const config = await store.publicConfig();
      return config.seo.length ? (config.seo as SeoSeed[]) : DEFAULT_SEO;
    } catch {
      return DEFAULT_SEO;
    }
  }

  function injectMetadata(html: string, record: SeoSeed) {
    const absolute = (value: string) =>
      value.startsWith("http") ? value : `${siteUrl}${value}`;
    const rootSchema =
      record.route === "/" ? [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA] : [];
    const schemas = record.schemaJson
      ? [...rootSchema, record.schemaJson]
      : rootSchema;
    const schema = schemas.length
      ? jsonForScript(schemas).replaceAll("https://docpropel.com", siteUrl)
      : "";
    return html
      .replaceAll("__META_TITLE__", escape(record.title))
      .replaceAll("__META_DESCRIPTION__", escape(record.description))
      .replaceAll(
        "__META_CANONICAL__",
        escape(`${siteUrl}${record.canonicalPath}`)
      )
      .replaceAll(
        "__META_ROBOTS__",
        record.noindex ? "noindex,follow" : "index,follow"
      )
      .replaceAll("__META_OG_IMAGE__", escape(absolute(record.ogImage)))
      .replaceAll(
        "__META_TWITTER_IMAGE__",
        escape(absolute(record.twitterImage))
      )
      .replace("__ROOT_SCHEMA__", schema);
  }

  app.get("/robots.txt", async (_req, res) => {
    res
      .type("text/plain")
      .send(
        `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`
      );
  });
  app.get("/sitemap.xml", async (_req, res, next) => {
    try {
      res.type("application/xml").send(sitemapXml(siteUrl, await allSeo()));
    } catch (error) {
      next(error);
    }
  });
  app.get("/calculator", (_req, res) => res.redirect(301, "/contact"));
  app.get("/compare", (_req, res) => res.redirect(301, "/how-it-works"));

  if (production) {
    const publicDir = path.resolve(root, "dist/public");
    const template = await fs.readFile(
      path.join(publicDir, "index.html"),
      "utf8"
    );
    app.use(express.static(publicDir, { index: false }));
    app.get("*", async (req, res, next) => {
      try {
        res.type("html").send(injectMetadata(template, await seoFor(req.path)));
      } catch (error) {
        next(error);
      }
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.get("*", async (req, res, next) => {
      try {
        const raw = await fs.readFile(
          path.resolve(root, "client/index.html"),
          "utf8"
        );
        const html = await vite.transformIndexHtml(
          req.originalUrl,
          injectMetadata(raw, await seoFor(req.path))
        );
        res.status(200).type("html").send(html);
      } catch (error) {
        vite.ssrFixStacktrace(error as Error);
        next(error);
      }
    });
  }

  const port = Number(process.env.PORT || 3000);
  server.listen(port, "0.0.0.0", () =>
    console.log(`DocPropel v6 listening on 0.0.0.0:${port}`)
  );
}

main().catch(error => {
  console.error(
    "[startup]",
    error instanceof Error ? error.message : "Unknown error"
  );
  process.exit(1);
});
