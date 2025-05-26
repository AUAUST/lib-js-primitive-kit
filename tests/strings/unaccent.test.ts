import { unaccent } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("unaccent()", () => {
  it("should work", () => {
    expect(unaccent("éàç")).toBe("eac");
    expect(unaccent("ÉÀÇ")).toBe("EAC");
    expect(unaccent("ﬁèﬂ")).toBe("fiefl");

    expect(unaccent("ab$£0123*!")).toBe("ab$£0123*!"); // no change
  });
});
