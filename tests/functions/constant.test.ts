import { constant } from "@auaust/primitive-kit/functions";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("constant()", () => {
  it("should work", () => {
    const fn = constant(1 as const);

    expect(fn).toBeTypeOf("function");
    expect(fn()).toBe(1);
    // @ts-expect-error
    expect(fn(2)).toBe(1);

    const value = fn();

    type Test = Expect<Equal<typeof value, 1>>;
  });
});
