import { toString } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toString()", () => {
  it("should convert null and undefined to empty strings", () => {
    expect(toString(null)).toBe("");
    expect(toString(undefined)).toBe("");
  });

  it("should stringify primitive values", () => {
    expect(toString("foo")).toBe("foo");
    expect(toString(0)).toBe("0");
    expect(toString(false)).toBe("false");
    expect(toString(Symbol("sym"))).toBe("Symbol(sym)");
  });

  it("should stringify objects using their toString method", () => {
    expect(
      toString({
        toString: () => "Hey!",
      })
    ).toBe("Hey!");
  });

  it("should stringify objects using their valueOf method", () => {
    expect(
      toString({
        valueOf: () => 15.75,
      })
    ).toBe("15.75");
  });

  it("should prioritize toString over valueOf", () => {
    expect(
      toString({
        toString: () => "toString",
        valueOf: () => "valueOf",
      })
    ).toBe("toString");
  });

  it("should stringify arrays", () => {
    expect(toString([])).toBe("");
    expect(toString([1, 2, 3])).toBe("1,2,3");
  });

  it("should stringify various objects", () => {
    expect(toString(new Number(4))).toBe("4");
    expect(toString(new Boolean(false))).toBe("false");
    expect(toString(new String("foo"))).toBe("foo");
  });
});
