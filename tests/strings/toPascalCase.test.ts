import { toPascalCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toPascalCase()", () => {
  it("should work", () => {
    expect(toPascalCase("Foo")).toBe("Foo");
    expect(toPascalCase("foo bar")).toBe("FooBar");
    expect(toPascalCase("foo-bar")).toBe("FooBar");
    expect(toPascalCase("Foo_Bar")).toBe("FooBar");
    expect(toPascalCase("foo.bar")).toBe("FooBar");
    expect(toPascalCase("foo bar baz")).toBe("FooBarBaz");
    expect(toPascalCase("Foo_Bar_Baz")).toBe("FooBarBaz");
    expect(toPascalCase("foo.bar.baz")).toBe("FooBarBaz");
    expect(toPascalCase("foo1.32.bar.baz489")).toBe("Foo132BarBaz489");
  });

  it("should handle empty strings", () => {
    expect(toPascalCase("")).toBe("");
    expect(toPascalCase(" ")).toBe("");
    expect(toPascalCase("   ")).toBe("");
  });

  it("should respect the ignoreCaps option", () => {
    expect(toPascalCase("FOO-BAR-BAZ")).toBe("FOOBARBAZ");
    expect(toPascalCase("FOO-BAR-BAZ", true)).toBe("FooBarBaz");
    expect(toPascalCase("FOO-BAR-BAZ", { ignoreCaps: true })).toBe("FooBarBaz");
  });

  it("should respect the unaccent option", () => {
    expect(toPascalCase("I ate a crème brûlée", { unaccent: true })).toBe(
      "IAteACremeBrulee"
    );

    expect(toPascalCase("I ate a crème brûlée", { unaccent: false })).toBe(
      "IAteACrèmeBrûlée"
    );
  });
});
