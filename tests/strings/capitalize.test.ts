import { capitalize } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("capitalize()", () => {
  it("should work", () => {
    expect(capitalize("foo")).toBe("Foo");
    expect(capitalize("FooBar")).toBe("FooBar");
    expect(capitalize("0")).toBe("0");
    expect(capitalize("hello")).toBe("Hello");
  });
});
