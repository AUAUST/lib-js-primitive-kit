import { afterNth } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("afterNth()", () => {
  it("should work", () => {
    expect(afterNth("0.1.2.3", ".", 0)).toBe("1.2.3");
    expect(afterNth("0.1.2.3", ".", 1)).toBe("2.3");
    expect(afterNth("0.1.2.3", ".", 2)).toBe("3");
    expect(afterNth("0.1.2.3", ".", 3)).toBe("");

    expect(afterNth("0.1.2.3", ".", -1)).toBe("3");
    expect(afterNth("0.1.2.3", ".", -3)).toBe("1.2.3");
    expect(afterNth("0.1.2.3", ".", -5)).toBe("");
  });
});
