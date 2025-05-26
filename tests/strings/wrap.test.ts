import { wrap } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("wrap()", () => {
  it("should work", () => {
    expect(wrap("foo", "bar")).toBe("barfoobar");
    expect(wrap("hello", "« ", " »")).toBe("« hello »");
    expect(wrap(0, { toString: () => "{" }, { toString: () => "}" })).toBe(
      "{0}"
    );
  });
});
