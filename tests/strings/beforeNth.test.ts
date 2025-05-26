import { beforeNth } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("beforeNth()", () => {
  it("should work", () => {
    expect(beforeNth("0.1.2.3", ".", 0)).toBe("0");
    expect(beforeNth("0.1.2.3", ".", 1)).toBe("0.1");
    expect(beforeNth("0.1.2.3", ".", 2)).toBe("0.1.2");
    expect(beforeNth("0.1.2.3", ".", 3)).toBe("");

    expect(beforeNth("0.1.2.3", ".", -1)).toBe("0.1.2");
    expect(beforeNth("0.1.2.3", ".", -3)).toBe("0");
    expect(beforeNth("0.1.2.3", ".", -4)).toBe("");
  });
});
