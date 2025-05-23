import { insert } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("insert()", () => {
  it("should put at the start by default", () => {
    expect(insert("world", "hello")).toBe("helloworld");
  });

  it("should put at the provided index", () => {
    expect(insert("wrld", "o", 1)).toBe("world");
    expect(insert("world", "-x-", 2)).toBe("wo-x-rld");
  });

  it("should put at the end if index is greater than string length", () => {
    expect(insert("world", "hello", 10)).toBe("worldhello");
  });

  it("should count from the end if index is negative", () => {
    expect(insert("world", "hello", -1)).toBe("worldhello");
    expect(insert("world", "-x-", -2)).toBe("worl-x-d");
  });
});
