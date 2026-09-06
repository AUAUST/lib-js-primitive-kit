import { pull } from "@auaust/primitive-kit/arrays";

import { describe, expect } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

describe("pull() works", () => {
  test("with a single value", () => {
    {
      const input = [1, 2, 3, 4, 5];
      const output = pull(input, 3);

      expect(input).toEqual([1, 2, 4, 5]);
      expect(output).toBe(1); // Amount of values removed

      type Tests = Expect<Equal<typeof output, number>>;
    }

    {
      const input = [1, "a", 3, "hello", 3, "world", 4];
      const output = pull(input, 3);

      expect(input).toEqual([1, "a", "hello", "world", 4]);
      expect(output).toBe(2);

      type Tests = Expect<Equal<typeof output, number>>;
    }
  });

  test("with multiple values", () => {
    const input = [1, 2, 3, 4, 5, "string"];
    const output = pull(input, [3, 4]);

    expect(input).toEqual([1, 2, 5, "string"]);
    expect(output).toEqual([3, 4]);

    type Tests = Expect<Equal<typeof output, (number | string)[]>>;
  });

  test("with a callback", () => {
    const input = [1, 2, 3, 4, 5];
    const output = pull(input, (value) => {
      type Test = Expect<Equal<typeof value, number>>;

      return value > 3;
    });

    expect(input).toEqual([1, 2, 3]);
    expect(output).toEqual([4, 5]);

    type Tests = Expect<Equal<typeof output, number[]>>;
  });
});
