import { between } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("between()", () => {
  it("should work", () => {
    expect(between("foo", "f", "o")).toBe("o");
    expect(between("foo", "o", "f")).toBe("");
    expect(between("foo", "o", "o")).toBe("");
    expect(between("foo", "a", "b")).toBe("");
    expect(between("foo bar foo", "foo", "foo")).toBe(" bar ");
  });
});
