import { toString } from "@auaust/primitive-kit/booleans";

import { describe, expect, it } from "vitest";

describe("toString()", () => {
  it("should work", () => {
    expect(toString("False")).toBe("false");
    expect(toString("true")).toBe("true");
  });
});
