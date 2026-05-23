import test from "node:test";
import assert from "node:assert/strict";
import {
  ROLE_HIERARCHY,
  getRoleRank,
  canManageRole,
  hasAtLeastRole,
} from "../../src/utils/role.hierarchy.js";

test("getRoleRank returns configured role rank", () => {
  assert.equal(getRoleRank("ADMIN"), ROLE_HIERARCHY.ADMIN);
  assert.equal(getRoleRank("STUDENT"), ROLE_HIERARCHY.STUDENT);
});

test("canManageRole allows only strictly higher roles", () => {
  assert.equal(canManageRole("ADMIN", "TEACHER"), true);
  assert.equal(canManageRole("TEACHER", "STAFF"), false);
  assert.equal(canManageRole("STAFF", "STUDENT"), true);
});

test("hasAtLeastRole allows equal and higher roles", () => {
  assert.equal(hasAtLeastRole("ADMIN", "ADMIN"), true);
  assert.equal(hasAtLeastRole("TEACHER", "STUDENT"), true);
  assert.equal(hasAtLeastRole("STUDENT", "TEACHER"), false);
});
