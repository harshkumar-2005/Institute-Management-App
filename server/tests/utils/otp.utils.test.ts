import test from "node:test";
import assert from "node:assert/strict";
import { generateOtp, hashOtp, verifyOtpHash } from "../../src/utils/otp.utils.js";

test("generateOtp returns a 6-digit numeric code", () => {
  const otp = generateOtp();
  assert.match(otp, /^\d{6}$/);
});

test("hashOtp and verifyOtpHash validate matching otp", async () => {
  const otp = "123456";
  const hashed = await hashOtp(otp);
  const isValid = await verifyOtpHash(hashed, otp);
  assert.equal(isValid, true);
});

test("verifyOtpHash fails for wrong otp", async () => {
  const hashed = await hashOtp("123456");
  const isValid = await verifyOtpHash(hashed, "000000");
  assert.equal(isValid, false);
});
