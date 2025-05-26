import { trimEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("trimEnd()", () => {
  it("should trim spaces and newlines by default", () => {
    expect(trimEnd(" \r foo \n\t")).toBe(" \r foo");
    expect(trimEnd(" foo")).toBe(" foo");
    expect(trimEnd("foo ")).toBe("foo");
    expect(trimEnd("foo")).toBe("foo");
  });

  it("should trim specific characters", () => {
    expect(trimEnd("foo", "f")).toBe("foo");
    expect(trimEnd("foo", "o")).toBe("f");
    expect(trimEnd("foo", "fo")).toBe("");
    expect(trimEnd("foo", "a")).toBe("foo");
  });

  it("should trim using a regular expression to match characters", () => {
    expect(trimEnd("yolollololo", /lo/)).toBe("yolol");
    expect(trimEnd("tatatatafalatatata", /tatata/)).toBe("tatatatafala");
    expect(trimEnd("lolooolyolollololo", /[lo]/)).toBe("loloooly");
  });

  it("should throw if the second argument is provided and not a string or RegExp", () => {
    // @ts-expect-error
    expect(() => trimEnd("foo", 1)).toThrow(TypeError);
    // @ts-expect-error
    expect(() => trimEnd("foo", true)).toThrow(TypeError);
  });
});
