import { map } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("map()", () => {
  it("should map values correctly", () => {
    const arr = [1, 2, 3];

    const result = map(arr, (x) => x * 2);

    expect(result).toEqual([2, 4, 6]);
  });

  it("handles mapping with method names", () => {
    const arr = [1, 2];

    const result = map(arr, "toString");

    expect(result).toEqual(["1", "2"]);
  });

  it("handles mixed types with method names", () => {
    const arr = [1, "hello", null];

    const result = map(arr, "toUpperCase");

    expect(result).toEqual([undefined, "HELLO", undefined]);
  });

  it("accepts every callable method name in a heterogeneous array", () => {
    const values = [
      { stringify: () => "string" as const },
      { calculate: () => 42 as const },
    ] as const;

    const strings = map(values, "stringify");

    const numbers = map(values, "calculate");

    type Tests = [
      Expect<Equal<typeof strings, ("string" | undefined)[]>>,
      Expect<Equal<typeof numbers, (42 | undefined)[]>>,
    ];

    expect(strings).toEqual(["string", undefined]);

    expect(numbers).toEqual([undefined, 42]);
  });

  it("intersects the arguments of the members that implement a method", () => {
    const values: (
      | { render(value: string | number): "wide" }
      | { render(value: string): "narrow" }
      | null
    )[] = [
      { render: (_value: string | number) => "wide" as const },
      { render: (_value: string) => "narrow" as const },
      null,
    ];

    const result = map(values, "render", "value");

    type Test = Expect<Equal<typeof result, ("wide" | "narrow" | undefined)[]>>;

    expect(result).toEqual(["wide", "narrow", undefined]);

    // @ts-expect-error - The second implementation cannot accept a number.
    map(values, "render", 1);
  });
});
