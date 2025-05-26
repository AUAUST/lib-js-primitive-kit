import { isAsyncFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isAsyncFunction()", () => {
  it("should work", () => {
    expect(isAsyncFunction(async () => {})).toBe(true);

    expect(isAsyncFunction(() => {})).toBe(false);
    expect(isAsyncFunction(function* () {})).toBe(false);
    expect(isAsyncFunction(class {})).toBe(false);
  });
});
