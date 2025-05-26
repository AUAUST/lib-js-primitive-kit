import { toLocaleString } from "@auaust/primitive-kit/numbers";

import { describe, expect, it } from "vitest";

describe("toLocaleString()", () => {
  it("should work", () => {
    expect(toLocaleString(2)).toBe("2");
    expect(toLocaleString(2.42, "en-US")).toBe("2.42");
    expect(toLocaleString(2.42, "fr-FR")).toBe("2,42");

    expect(
      toLocaleString(2.42, "en-US", { style: "currency", currency: "USD" })
    ).toBe("$2.42");
  });
});
