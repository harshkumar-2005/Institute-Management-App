import test from "node:test";
import assert from "node:assert/strict";
import { authorizeRoles } from "../../src/middlewares/roleBased.middleware.js";

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

test("authorizeRoles returns 401 when user is missing", () => {
  const middleware = authorizeRoles("TEACHER");
  const req = {};
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, false);
  assert.equal(res.statusCode, 401);
});

test("authorizeRoles returns 403 when user has insufficient role", () => {
  const middleware = authorizeRoles("ADMIN");
  const req = { user: { role: "STUDENT" } };
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, false);
  assert.equal(res.statusCode, 403);
});

test("authorizeRoles calls next when user satisfies role", () => {
  const middleware = authorizeRoles("TEACHER");
  const req = { user: { role: "ADMIN" } };
  const res = createResponse();
  let called = false;

  middleware(req as never, res as never, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(res.statusCode, undefined);
});
