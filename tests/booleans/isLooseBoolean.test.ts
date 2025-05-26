import { isLooseBoolean } from "@auaust/primitive-kit/booleans";

import { describe, expect, it, test } from "vitest";

describe("isLooseBoolean()", () => {
  it("should return true for values that commonly represent boolean values", () => {
    expect(isLooseBoolean(true)).toBe(true);
    expect(isLooseBoolean(false)).toBe(true);
    expect(isLooseBoolean("True")).toBe(true);
    expect(isLooseBoolean("False")).toBe(true);
    expect(isLooseBoolean(1)).toBe(true);
    expect(isLooseBoolean(0)).toBe(true);
    expect(isLooseBoolean(new Boolean(true))).toBe(true);
  });

  test.each(["", new String("Foo"), 31, 1.1, {}, [], null, undefined])(
    "should return false for non-boolean-like values",
    (value) => {
      expect(isLooseBoolean(value)).toBe(false);
    }
  );
});
