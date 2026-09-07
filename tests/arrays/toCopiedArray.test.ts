import { toCopiedArray } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect, NotEqual } from "type-testing";
import { expect, test } from "vitest";

test("copy() works", () => {
  {
    const input = [1, 2, 3];
    const output = toCopiedArray(input);
    expect(input).toEqual(output);
    expect(input).not.toBe(output);

    // Various non-array inputs should be converted to arrays, thus also creating a new array.

    const copies = [
      // @ts-expect-error
      toCopiedArray({}),
      toCopiedArray(null),
      toCopiedArray(undefined),
      toCopiedArray(3),
    ];
    expect(copies).toEqual([[], [], [], [, , ,]]);
    type Test = Expect<Equal<typeof copies, unknown[][]>>;

    {
      const input = [1, true, null, undefined, "foo", Symbol("bar")];
      const output = toCopiedArray(input);
      type Test = Expect<Equal<typeof input, typeof output>>;
    }
    {
      const input = Object.freeze([
        1 as number,
        true,
        null,
        undefined,
        "foo",
        Symbol("bar"),
      ] as const);
      const output = toCopiedArray(input);

      // Writing to the input should throw as it's been frozen
      expect(() => {
        // @ts-expect-error
        input[0] = 2;
      }).toThrow(TypeError);

      // Writing to the output should work
      expect(() => {
        output[0] = 2;
        output[0]++;
        output.push(4);
      }).not.toThrow();

      type Tests = [
        // Input is readonly because of `as const`, but copies are mutable.
        Expect<NotEqual<typeof input, typeof output>>,
        Expect<Equal<typeof input, Readonly<typeof output>>>,
      ];
    }
  }
  {
    const input = new Set([1, 2, 3] as const);
    const output = toCopiedArray(input);

    expect(output).toEqual([...input.values()]);
    expect(output).not.toBeInstanceOf(Set);

    type Test = Expect<Equal<typeof output, (1 | 2 | 3)[]>>;
  }
  {
    const input = "foo";
    const output = toCopiedArray(input);

    expect(output).toEqual(["f", "o", "o"]);

    type Test = Expect<Equal<typeof output, string[]>>;
  }
});
