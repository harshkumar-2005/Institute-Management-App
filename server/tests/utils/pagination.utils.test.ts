import test from "node:test";
import assert from "node:assert/strict";
import getPagination from "../../src/utils/pagination.utils.js";

test("getPagination falls back to default page and limit", () => {
  const result = getPagination(0, 0);
  assert.deepEqual(result, { pages: 1, limits: 10, skip: 0 });
});

test("getPagination clamps negative values to minimum", () => {
  const result = getPagination(-5, -2);
  assert.deepEqual(result, { pages: 1, limits: 1, skip: 0 });
});

test("getPagination computes skip correctly", () => {
  const result = getPagination(3, 25);
  assert.deepEqual(result, { pages: 3, limits: 25, skip: 50 });
});
