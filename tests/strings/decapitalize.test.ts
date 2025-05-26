import { decapitalize } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("decapitalize()", () => {
  it("should work", () => {
    expect(decapitalize("Foo")).toBe("foo");
    expect(decapitalize("fooBar")).toBe("fooBar");
    expect(decapitalize("HELLO")).toBe("hELLO");
  });
});
