import test from "node:test";
import assert from "node:assert/strict";
import { canCreateUser } from "../../src/middlewares/create.middleware.js";

type MockResponse = {
  statusCode?: number;
  payload?: unknown;
  status: (code: number) => MockResponse;
  json: (data: unknown) => MockResponse;
};

const createResponse = (): MockResponse => {
  const res: MockResponse = {
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: unknown) {
      this.payload = data;
      return this;
    },
  };
  return res;
};

test("canCreateUser returns 401 when actor role is missing", () => {
  const middleware = canCreateUser();
  const req = { body: { role: "TEACHER" } };
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, false);
  assert.equal(res.statusCode, 401);
});

test("canCreateUser returns 400 for invalid target role", () => {
  const middleware = canCreateUser();
  const req = { user: { role: "ADMIN" }, body: { role: "INVALID" } };
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, false);
  assert.equal(res.statusCode, 400);
});

test("canCreateUser returns 403 for unmanaged role", () => {
  const middleware = canCreateUser();
  const req = { user: { role: "TEACHER" }, body: { role: "ADMIN" } };
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, false);
  assert.equal(res.statusCode, 403);
});

test("canCreateUser calls next for manageable role", () => {
  const middleware = canCreateUser();
  const req = { user: { role: "ADMIN" }, body: { role: "TEACHER" } };
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(res.statusCode, undefined);
});
