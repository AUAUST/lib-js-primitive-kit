import { toCamelCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("totoCamelCaseCase()", () => {
  it("should work", () => {
    expect(toCamelCase("Foo")).toBe("foo");
    expect(toCamelCase("foo bar")).toBe("fooBar");
    expect(toCamelCase("foo-bar")).toBe("fooBar");
    expect(toCamelCase("Foo_Bar")).toBe("fooBar");
    expect(toCamelCase("foo.bar")).toBe("fooBar");
    expect(toCamelCase("foo bar baz")).toBe("fooBarBaz");
    expect(toCamelCase("Foo_Bar_Baz")).toBe("fooBarBaz");
    expect(toCamelCase("foo.bar.baz")).toBe("fooBarBaz");
    expect(toCamelCase("foo1.32.bar.baz489")).toBe("foo132BarBaz489");
  });

  it("should handle empty strings", () => {
    expect(toCamelCase("")).toBe("");
    expect(toCamelCase(" ")).toBe("");
    expect(toCamelCase("   ")).toBe("");
  });

  it("should respect the ignoreCaps option", () => {
    expect(toCamelCase("FOO-BAR-BAZ")).toBe("fOOBARBAZ");
    expect(toCamelCase("FOO-BAR-BAZ", true)).toBe("fooBarBaz");
    expect(toCamelCase("FOO-BAR-BAZ", { ignoreCaps: true })).toBe("fooBarBaz");
  });

  it("should respect the unaccent option", () => {
    expect(toCamelCase("I ate a crème brûlée", { unaccent: true })).toBe(
      "iAteACremeBrulee"
    );

    expect(toCamelCase("I ate a crème brûlée", { unaccent: false })).toBe(
      "iAteACrèmeBrûlée"
    );
  });
});
