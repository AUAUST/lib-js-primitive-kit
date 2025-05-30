import { slug } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("slug()", () => {
  it("should work without options", () => {
    expect(slug("Hello World")).toBe("hello-world");
  });

  it("should support a custom separator", () => {
    expect(slug("Hello World", "_")).toBe("hello_world");
    expect(slug("Hello World", { separator: "_" })).toBe("hello_world");
  });

  it("should unaccent characters", () => {
    expect(slug("hÉllô wœrld")).toBe("hello-woerld");
    expect(slug("Café №5")).toBe("cafe-no5");
  });

  it("should respect the ignoreCaps option", () => {
    expect(slug("TEST")).toBe("test");
    expect(slug("TEST", { ignoreCaps: false })).toBe("t-e-s-t");
  });

  it("should replace according to the provided replacements", () => {
    expect(
      slug("someone@example.com", {
        replacements: { "@": " at ", ".": " dot " },
      })
    ).toBe("someone-at-example-dot-com");

    expect(
      slug("123 Main St.", {
        replacements: [
          [/\d/g, "x"],
          ["St", "street"],
        ],
      })
    ).toBe("xxx-main-street");
  });

  it("should strip all non-word characters", () => {
    expect(slug("Hey!!! 😀")).toBe("hey");
    expect(slug("🔥💡$%#&()[]{}<>?@!")).toBe("");
  });
});
