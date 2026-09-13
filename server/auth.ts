import crypto from "node:crypto";
import type { Request, Response } from "express";

export const SESSION_COOKIE = "docpropel_admin";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

export type AdminEnv = {
  adminEmail?: string;
  adminPassword?: string;
  sessionSecret?: string;
  production: boolean;
};

function safeEqual(left: string, right: string) {
  const leftHash = crypto.createHash("sha256").update(left).digest();
  const rightHash = crypto.createHash("sha256").update(right).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
}

function signature(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function authConfigured(env: AdminEnv) {
  return Boolean(env.adminEmail && env.adminPassword && env.sessionSecret && env.sessionSecret.length >= 32);
}

export function verifyCredentials(email: string, password: string, env: AdminEnv) {
  return authConfigured(env) && safeEqual(email.toLowerCase(), env.adminEmail!.toLowerCase()) && safeEqual(password, env.adminPassword!);
}

export function createSessionToken(email: string, secret: string, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ email, exp: now + SESSION_TTL_SECONDS * 1000 })).toString("base64url");
  return `${payload}.${signature(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined, secret: string | undefined, now = Date.now()) {
  if (!token || !secret) return null;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature || !safeEqual(suppliedSignature, signature(payload, secret))) return null;
  try {
    const value = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { email?: string; exp?: number };
    if (!value.email || !value.exp || value.exp <= now) return null;
    return { email: value.email, expiresAt: value.exp };
  } catch {
    return null;
  }
}

function cookieValue(req: Request, name: string) {
  const cookie = req.headers.cookie?.split(";").map(value => value.trim()).find(value => value.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : undefined;
}

export function sessionFromRequest(req: Request, env: AdminEnv) {
  return verifySessionToken(cookieValue(req, SESSION_COOKIE), env.sessionSecret);
}

export function setSessionCookie(res: Response, email: string, env: AdminEnv) {
  res.cookie(SESSION_COOKIE, createSessionToken(email, env.sessionSecret!), {
    httpOnly: true,
    secure: env.production,
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS * 1000,
  });
}

export function clearSessionCookie(res: Response, env: AdminEnv) {
  res.clearCookie(SESSION_COOKIE, { httpOnly: true, secure: env.production, sameSite: "strict", path: "/" });
}
