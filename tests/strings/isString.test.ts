import { isNotString, isString } from "@auaust/primitive-kit/strings";

import { describe, expect, test } from "vitest";

describe("isString() and isNotString()", () => {
  test.each(["", "foo"])("should detect %s as a string", (value) => {
    expect(isString(value)).toBe(true);
    expect(isNotString(value)).toBe(false);
  });

  test.each([new String("foo"), 0, false, [[]], null, undefined])(
    "should detect %s as not a string",
    (value) => {
      expect(isString(value)).toBe(false);
      expect(isNotString(value)).toBe(true);
    }
  );
});
