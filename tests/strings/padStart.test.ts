import { padStart } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("padStart()", () => {
  it("should work", () => {
    expect(padStart("foo", 3)).toBe("foo");
    expect(padStart("foo", 2)).toBe("foo");
    expect(padStart("foo", 5, ".")).toBe("..foo");
    expect(padStart("foo", 5, "123")).toBe("12foo");
    expect(padStart(".", 10, "1234")).toBe("123412341.");
  });
});
