import { startsWith } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("startsWith()", () => {
  it("should work", () => {
    expect(startsWith("foo", "f")).toBe(true);
    expect(startsWith("foobar", "foo")).toBe(true);
    expect(startsWith("foo", "bar")).toBe(false);
    expect(startsWith("", "foo")).toBe(false);
  });

  it("should return true for empty substrings", () => {
    expect(startsWith("foo", "")).toBe(true);
    expect(startsWith("", "")).toBe(true);
    expect(startsWith(" ", "")).toBe(true);
  });

  it("should respect the caseSensitive option", () => {
    expect(startsWith("foo", "F", { caseSensitive: true })).toBe(false);
    expect(startsWith("foo", "F", { caseSensitive: false })).toBe(true);
    expect(startsWith("Foo", "foo", { caseSensitive: false })).toBe(true);
  });

  it("should respect the trim option", () => {
    expect(startsWith(" hello ", "he", { trim: false })).toBe(false);
    expect(startsWith(" hello ", "he", { trim: true })).toBe(true);
    expect(startsWith(" foo", " f ", { trim: true })).toBe(false);
    expect(startsWith(" foo", " f", { trim: true })).toBe(true);
  });

  it("should respect the unaccent option", () => {
    expect(startsWith("héllo, fiou", "hello")).toBe(false);
    expect(startsWith("héllo, fiou", "hello", { unaccent: true })).toBe(true);
  });
});
