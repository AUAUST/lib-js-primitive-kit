import { toSnakeCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toSnakeCase()", () => {
  it("should work", () => {
    expect(toSnakeCase("Foo")).toBe("foo");
    expect(toSnakeCase("foo bar")).toBe("foo_bar");
    expect(toSnakeCase("foo-bar")).toBe("foo_bar");
    expect(toSnakeCase("Foo_Bar")).toBe("foo_bar");
    expect(toSnakeCase("foo.bar")).toBe("foo_bar");
    expect(toSnakeCase("foo bar baz")).toBe("foo_bar_baz");
    expect(toSnakeCase("Foo_Bar_Baz")).toBe("foo_bar_baz");
    expect(toSnakeCase("foo.bar.baz")).toBe("foo_bar_baz");
    expect(toSnakeCase("foo1.32.bar.baz489")).toBe("foo1_32_bar_baz489");
  });

  it("should handle empty strings", () => {
    expect(toSnakeCase("")).toBe("");
    expect(toSnakeCase(" ")).toBe("");
    expect(toSnakeCase("   ")).toBe("");
  });

  it("should respect the ignoreCaps option", () => {
    expect(toSnakeCase("FOO-BAR-BAZ")).toBe("f_o_o_b_a_r_b_a_z");
    expect(toSnakeCase("FOO-BAR-BAZ", true)).toBe("foo_bar_baz");
    expect(toSnakeCase("FOO-BAR-BAZ", { ignoreCaps: true })).toBe(
      "foo_bar_baz"
    );
  });

  it("should respect the unaccent option", () => {
    expect(toSnakeCase("I ate a crème brûlée", { unaccent: true })).toBe(
      "i_ate_a_creme_brulee"
    );

    expect(toSnakeCase("I ate a crème brûlée", { unaccent: false })).toBe(
      "i_ate_a_crème_brûlée"
    );
  });
});
