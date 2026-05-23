import test from "node:test";
import assert from "node:assert/strict";
import validLogin from "../../src/validators/login.validator.js";

test("validLogin accepts a valid payload", () => {
  const result = validLogin.safeParse({
    email: "user@example.com",
    password: "strongpass",
    role: "TEACHER",
  });

  assert.equal(result.success, true);
});

test("validLogin rejects short passwords", () => {
  const result = validLogin.safeParse({
    email: "user@example.com",
    password: "123",
    role: "TEACHER",
  });

  assert.equal(result.success, false);
});

test("validLogin rejects invalid role", () => {
  const result = validLogin.safeParse({
    email: "user@example.com",
    password: "strongpass",
    role: "INVALID",
  });

  assert.equal(result.success, false);
});
