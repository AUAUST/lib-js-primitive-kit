import { trimStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("trimStart()", () => {
  it("should trim spaces and newlines by default", () => {
    expect(trimStart(" \r foo \n\t")).toBe("foo \n\t");
    expect(trimStart(" foo")).toBe("foo");
    expect(trimStart("foo ")).toBe("foo ");
    expect(trimStart("foo")).toBe("foo");
  });

  it("should trim specific characters", () => {
    expect(trimStart("foo", "f")).toBe("oo");
    expect(trimStart("foo", "o")).toBe("foo");
  });

  it("should trim using a regular expression to match characters", () => {
    expect(trimStart("lolololooooooyolollolo", /lo/)).toBe("oooooyolollolo");
    expect(trimStart("tatatatatafalatata", /tatata/)).toBe("tatafalatata");
    expect(trimStart("lolololooooooyolollololo", /[lo]/)).toBe("yolollololo");
  });

  it("should throw if the second argument is provided and not a string or RegExp", () => {
    // @ts-expect-error
    expect(() => trimStart("foo", 1)).toThrow(TypeError);
    // @ts-expect-error
    expect(() => trimStart("foo", true)).toThrow(TypeError);
  });
});
