import { afterStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("afterStart()", () => {
  it("should work", () => {
    expect(afterStart("foo", "f")).toBe("oo");
    expect(afterStart("foo", "o")).toBe("");
    expect(afterStart("foo", "oo")).toBe("");
    expect(afterStart("foo", "a")).toBe("");
    expect(afterStart("foo bar foo", "foo")).toBe(" bar foo");
  });
});
