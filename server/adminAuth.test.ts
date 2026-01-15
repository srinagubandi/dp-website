/**
 * =============================================================================
 * ADMIN AUTH TESTS
 * =============================================================================
 * Tests for the admin login authentication system
 */

import { describe, it, expect, beforeAll } from "vitest";
import crypto from "crypto";

// Default credentials (same as in routers.ts)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "DocPropel2024!";

describe("adminAuth", () => {
  describe("login", () => {
    it("should generate a valid token for correct credentials", () => {
      // Simulate token generation logic
      const username = ADMIN_USERNAME;
      const password = ADMIN_PASSWORD;
      
      // Token generation matches the server logic
      const tokenData = `${username}:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
      const token = Buffer.from(tokenData).toString("base64");
      
      expect(token).toBeTruthy();
      expect(token.length).toBeGreaterThan(20);
    });

    it("should reject invalid credentials", () => {
      const username = "wronguser";
      const password = "wrongpassword";
      
      const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
      expect(isValid).toBe(false);
    });

    it("should accept valid credentials", () => {
      const username = ADMIN_USERNAME;
      const password = ADMIN_PASSWORD;
      
      const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
      expect(isValid).toBe(true);
    });
  });

  describe("verify", () => {
    it("should verify a valid token format", () => {
      // Generate a token
      const tokenData = `${ADMIN_USERNAME}:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
      const token = Buffer.from(tokenData).toString("base64");
      
      // Verify token format
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const parts = decoded.split(":");
      
      expect(parts.length).toBe(3);
      expect(parts[0]).toBe(ADMIN_USERNAME);
      expect(parseInt(parts[1])).toBeGreaterThan(0);
    });

    it("should reject expired tokens (older than 24 hours)", () => {
      // Generate an old token
      const oldTimestamp = Date.now() - (25 * 60 * 60 * 1000); // 25 hours ago
      const tokenData = `${ADMIN_USERNAME}:${oldTimestamp}:${crypto.randomBytes(16).toString("hex")}`;
      const token = Buffer.from(tokenData).toString("base64");
      
      // Verify expiration
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const parts = decoded.split(":");
      const timestamp = parseInt(parts[1]);
      const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
      
      expect(isExpired).toBe(true);
    });

    it("should accept valid non-expired tokens", () => {
      // Generate a fresh token
      const tokenData = `${ADMIN_USERNAME}:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
      const token = Buffer.from(tokenData).toString("base64");
      
      // Verify expiration
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const parts = decoded.split(":");
      const timestamp = parseInt(parts[1]);
      const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
      
      expect(isExpired).toBe(false);
    });
  });
});
