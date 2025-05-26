import { or } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("or()", () => {
  it("should work", () => {
    expect(or("foo", "bar")).toBe("foo");
    expect(or("", "bar")).toBe("bar");
    expect(or(null, "bar")).toBe("bar");
    expect(or(undefined, { toString: () => "" }, "bar")).toBe("bar");
    expect(or(undefined, { toString: () => "foo" }, "bar")).toBe("foo");
    expect(or()).toBe("");
  });
});
