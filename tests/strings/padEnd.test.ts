import { padEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("padEnd()", () => {
  it("should work", () => {
    expect(padEnd("foo", 3)).toBe("foo");
    expect(padEnd("foo", 2)).toBe("foo");
    expect(padEnd("foo", 5, ".")).toBe("foo..");
    expect(padEnd("foo", 5, "123")).toBe("foo12");
  });
});
