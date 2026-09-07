import { mapWithKeys } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("mapWithKeys()", () => {
  it("infers tuple entries without an assertion", () => {
    const result = mapWithKeys([1, 2, 3], (value) => [value, value * 2]);
    const value = result[1];

    type Test = Expect<Equal<typeof value, number>>;

    expect(result).toEqual({ 1: 2, 2: 4, 3: 6 });
  });

  it("maps entry tuples while preserving key and value pairs", () => {
    const result = mapWithKeys(["foo", 42], (value) =>
      typeof value === "string" ? ["string", value] : ["number", value],
    );

    type Test = Expect<Equal<typeof result, { string: "foo"; number: 42 }>>;

    expect(result).toEqual({ string: "foo", number: 42 });
  });

  it("correlates object values with keys derived from their properties", () => {
    const input = [
      { id: "first", value: 1 },
      { id: "second", value: "two" },
    ] as const;

    const result = mapWithKeys(input, (value) => [value.id, value]);

    type Test = Expect<
      Equal<
        typeof result,
        { first: (typeof input)[0]; second: (typeof input)[1] }
      >
    >;

    expect(result).toEqual({ first: input[0], second: input[1] });
  });

  it("merges every property returned in an object", () => {
    const result = mapWithKeys([1], () => ({
      first: 1,
      second: "two",
    }));

    type Test = Expect<Equal<typeof result, { first: 1; second: "two" }>>;

    expect(result).toEqual({ first: 1, second: "two" });
  });

  it("excludes false, null, and undefined results", () => {
    const result = mapWithKeys([1, 2, 3, 4], (value) => {
      if (value === 1) {
        return false;
      }

      if (value === 2) {
        return null;
      }

      if (value === 3) {
        return undefined;
      }

      return [value, "included"];
    });

    type Test = Expect<Equal<typeof result, { 4: "included" }>>;

    expect(result).toEqual({ 4: "included" });
  });

  it("uses the provided this value", () => {
    const result = mapWithKeys(
      [1, 2],
      function (value) {
        return [value, value * this.multiplier];
      },
      { multiplier: 2 },
    );

    expect(result).toEqual({ 1: 2, 2: 4 });
  });

  it("allows duplicate keys and reflects every possible value", () => {
    const result = mapWithKeys([1, 2], (value) => ["key", value]);

    type Test = Expect<Equal<typeof result, { key: 1 | 2 }>>;

    expect(result).toEqual({ key: 2 });
  });
});
