import { toKebabCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toKebabCase()", () => {
  it("should work", () => {
    expect(toKebabCase("Foo")).toBe("foo");
    expect(toKebabCase("foo bar")).toBe("foo-bar");
    expect(toKebabCase("foo-bar")).toBe("foo-bar");
    expect(toKebabCase("Foo_Bar")).toBe("foo-bar");
    expect(toKebabCase("foo.bar")).toBe("foo-bar");
    expect(toKebabCase("foo bar baz")).toBe("foo-bar-baz");
    expect(toKebabCase("Foo_Bar_Baz")).toBe("foo-bar-baz");
    expect(toKebabCase("foo.bar.baz")).toBe("foo-bar-baz");
    expect(toKebabCase("foo1.32.bar.baz489")).toBe("foo1-32-bar-baz489");
  });

  it("should handle empty strings", () => {
    expect(toKebabCase("")).toBe("");
    expect(toKebabCase(" ")).toBe("");
    expect(toKebabCase("   ")).toBe("");
  });

  it("should respect the ignoreCaps option", () => {
    expect(toKebabCase("FOO-BAR-BAZ")).toBe("f-o-o-b-a-r-b-a-z");
    expect(toKebabCase("FOO-BAR-BAZ", true)).toBe("foo-bar-baz");
    expect(toKebabCase("FOO-BAR-BAZ", { ignoreCaps: true })).toBe(
      "foo-bar-baz"
    );
  });

  it("should respect the unaccent option", () => {
    expect(toKebabCase("I ate a crème brûlée", { unaccent: true })).toBe(
      "i-ate-a-creme-brulee"
    );

    expect(toKebabCase("I ate a crème brûlée", { unaccent: false })).toBe(
      "i-ate-a-crème-brûlée"
    );
  });
});
