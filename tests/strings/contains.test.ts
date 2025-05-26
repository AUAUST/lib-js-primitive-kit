import { contains } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("contains()", () => {
  it("should work case sensitively by default", () => {
    expect(contains("foo", "f")).toBe(true);
    expect(contains("foo", "foo")).toBe(true);
    expect(contains("Foo", "foo")).toBe(false);
    expect(contains("foo bar foo", "foo")).toBe(true);
  });

  it("should always return true for empty substrings", () => {
    expect(contains("", "")).toBe(true);
    expect(contains(" ", "")).toBe(true);
    expect(contains("foo", "")).toBe(true);
  });

  it("should respect the caseSensitive option", () => {
    expect(contains("foo", "F", false)).toBe(true); // boolean as the options is a shorthand for caseSensitive
    expect(contains("foo", "F", { caseSensitive: true })).toBe(false);
    expect(contains("foo", "F", { caseSensitive: false })).toBe(true);
    expect(contains("Foo", "foo", { caseSensitive: false })).toBe(true);
  });

  it("should respect the trim option", () => {
    expect(contains("hello", " ll ", { trim: false })).toBe(false);
    expect(contains("hello", " ll ", { trim: true })).toBe(true);
  });

  it("should respect the unaccent option", () => {
    expect(contains("héllo, ﬁou", "fiou")).toBe(false);
    expect(contains("héllo, ﬁou", "fiou", { unaccent: true })).toBe(true);
  });
});
