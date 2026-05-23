import test from "node:test";
import assert from "node:assert/strict";
import {
  createSessionValidator,
  markAttendanceValidator,
  attendanceQueryValidator,
} from "../../src/validators/attendanceSession.validator.js";

test("createSessionValidator accepts a minimal valid payload", () => {
  const result = createSessionValidator.safeParse({
    subjectId: 1,
    subjectType: "THEORY",
  });

  assert.equal(result.success, true);
});

test("createSessionValidator enforces start/end time pairing", () => {
  const result = createSessionValidator.safeParse({
    subjectId: 1,
    subjectType: "LAB",
    startTime: "2026-01-01T10:00:00.000Z",
  });

  assert.equal(result.success, false);
});

test("markAttendanceValidator requires at least one record", () => {
  const result = markAttendanceValidator.safeParse({ records: [] });
  assert.equal(result.success, false);
});

test("attendanceQueryValidator coerces numeric query params", () => {
  const result = attendanceQueryValidator.safeParse({ page: "2", limit: "20" });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.page, 2);
    assert.equal(result.data.limit, 20);
  }
});
