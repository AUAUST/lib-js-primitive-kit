import { trim } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("trim()", () => {
  it("should trim spaces and newlines by default", () => {
    expect(trim(" \r foo \n\t")).toBe("foo");
    expect(trim(" foo")).toBe("foo");
    expect(trim("foo ")).toBe("foo");
    expect(trim("foo")).toBe("foo");
  });

  it("should trim specific characters", () => {
    expect(trim("foo", "f")).toBe("oo");
    expect(trim("foo", "o")).toBe("f");
    expect(trim("foo", "fo")).toBe("");
    expect(trim("foo", "a")).toBe("foo");
  });

  it("should trim using a regular expression to match characters", () => {
    expect(trim("yolollololo", /lo/)).toBe("yolol");
    expect(trim("tatatatafalatatata", /tatata/)).toBe("tafala");
    expect(trim("lolooolyolollololo", /[lo]/)).toBe("y");
  });

  it("should throw if the second argument is provided and not a string or RegExp", () => {
    // @ts-expect-error
    expect(() => trim("foo", 1)).toThrow(TypeError);
    // @ts-expect-error
    expect(() => trim("foo", true)).toThrow(TypeError);
    // @ts-expect-error
    expect(() => trim("foo", Symbol("test"))).toThrow(TypeError);
    // @ts-expect-error
    expect(() => trim("foo", {}).toThrow(TypeError));
  });
});
