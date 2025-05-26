import { isAsyncGeneratorFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isAsyncGeneratorFunction()", () => {
  it("should work", () => {
    expect(isAsyncGeneratorFunction(async function* () {})).toBe(true);

    expect(isAsyncGeneratorFunction(() => {})).toBe(false);
    expect(isAsyncGeneratorFunction(function* () {})).toBe(false);
    expect(isAsyncGeneratorFunction(class {})).toBe(false);
  });
});
