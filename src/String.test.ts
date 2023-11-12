import { S } from "~/String";

import { describe, expect, test } from "@jest/globals";

describe("S class", () => {
  test("non-strict typecheck works", () => {
    // Primitive strings and String objects should both pass the check.
    expect(S.is("string")).toBe(true);
    expect(S.is(new String("string"))).toBe(true);

    // Other types should fail the check.
    expect(S.is(0)).toBe(false);
    expect(S.is(new Number(0))).toBe(false);
    expect(S.is(false)).toBe(false);
    expect(S.is(new Boolean(false))).toBe(false);
    expect(S.is({})).toBe(false);
    expect(S.is([])).toBe(false);
    expect(S.is(null)).toBe(false);
    expect(S.is(undefined)).toBe(false);
  });

  test("strict typecheck works", () => {
    // Primitive strings should pass the check.
    expect(S.isStrict("string")).toBe(true);
    // Empty strings should fail the check.
    expect(S.isStrict("")).toBe(false);
    // String objects should fail the check.
    expect(S.isStrict(new String("string"))).toBe(false);

    // Other types should fail the check.
    expect(S.isStrict(0)).toBe(false);
    expect(S.isStrict(new Number(0))).toBe(false);
    expect(S.isStrict(false)).toBe(false);
    expect(S.isStrict(new Boolean(false))).toBe(false);
    expect(S.isStrict({})).toBe(false);
    expect(S.isStrict([])).toBe(false);
    expect(S.isStrict(null)).toBe(false);
    expect(S.isStrict(undefined)).toBe(false);
  });
});
