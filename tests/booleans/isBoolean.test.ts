import { isBoolean, isNotBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, test } from "vitest";

describe("isBoolean() and isNotBoolean()", () => {
  test.each([true, false])("should detect booleans", (value) => {
    expect(isBoolean(value)).toBe(true);
    expect(isNotBoolean(value)).toBe(false);
  });

  test.each([
    "false",
    "true",
    0,
    1,
    "",
    "0",
    "1",
    new String(""),
    new Number(0),
    new Boolean(false),
    {},
    [[]],
    null,
    undefined,
  ])("should not detect %s as boolean", (value) => {
    expect(isBoolean(value)).toBe(false);
    expect(isNotBoolean(value)).toBe(true);
  });
});
