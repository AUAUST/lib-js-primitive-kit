import { A } from "~/arrays";
import { ExpectedArrayError } from "~/arrays/helpers";
import { O } from "~/objects";

import { Equal, Expect, IsNever, NotEqual } from "type-testing";
import { describe, expect, test } from "vitest";

describe("A class", () => {
  test("called as a function works", () => {
    {
      const a = A([1, 2, 3]);
      type Test = Expect<Equal<typeof a, number[]>>;
      expect(a).toEqual([1, 2, 3]);
    }
    {
      const a = A({ length: 3 });
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([, , ,]);
    }
    {
      const a = A(null as unknown as NodeListOf<Element>);
      type Test = Expect<Equal<typeof a, Element[]>>;
      expect(a).toEqual([]);
    }
  });

  test("from() works", () => {
    // Passing an array should return it as is.
    const arr = [1, 2, 3];
    expect(A.from(arr)).toBe(arr);

    // Nullish values should return an empty array.
    {
      const a = A.from();
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([]);
    }
    {
      const a = A.from(null);
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([]);
    }
    {
      const a = A.from(undefined);
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([]);
    }
    {
      // As a shorthand, passing a number should return an array of that length.
      const a = A.from(3);
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([, , ,]);
    }

    // Everything else should be passed to Array.from().

    {
      const a = A.from({ length: 3 });
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([, , ,]);
    }
    {
      const a = A.from("foo");
      type Test = Expect<Equal<typeof a, string[]>>;
      expect(a).toEqual(["f", "o", "o"]);
    }
    {
      const a = A.from(new Set([1, 2, 3]));
      type Test = Expect<Equal<typeof a, number[]>>;
      expect(a).toEqual([1, 2, 3]);
    }
  });

  test("is() works", () => {
    expect(A.is([])).toBe(true);
    expect(A.is([1, 2, 3])).toBe(true);
    expect(A.is("foo")).toBe(false);
    expect(A.is({})).toBe(false);
    expect(A.is(null)).toBe(false);
    expect(A.is(undefined)).toBe(false);
    expect(A.is(3)).toBe(false);

    const arr = null as unknown;

    // Typeguard test
    type Test = Expect<NotEqual<typeof arr, any[]>>;
    if (A.is(arr)) {
      type Test = Expect<Equal<typeof arr, any[]>>;
    }

    const arr2 = [""];

    if (!A.is(arr2)) {
      type Test = Expect<IsNever<typeof arr2>>;
    }
  });

  test("isStrict() works", () => {
    expect(A.isStrict([])).toBe(false);
    expect(A.isStrict([1, 2, 3])).toBe(true);
    expect(A.isStrict("foo")).toBe(false);
  });

  test("isIterable() works", () => {
    expect(A.isIterable([])).toBe(true);
    expect(A.isIterable([1, 2, 3])).toBe(true);
    expect(A.isIterable("")).toBe(true);
    expect(A.isIterable("foo")).toBe(true);
    expect(A.isIterable({})).toBe(false);
    expect(A.isIterable(null)).toBe(false);
    expect(A.isIterable(undefined)).toBe(false);
    expect(A.isIterable(3)).toBe(false);

    const arr = [] as unknown;

    // @ts-expect-error
    for (const _ of arr) {
      // `arr` being unknown, TypeScript should complain about this.
      // We still use an actual array so the test doesn't fail at runtime.
    }

    if (A.isIterable(arr)) {
      for (const _ of arr) {
        // `arr` is type-guarded as an iterable, so this should work.
      }
    }
  });

  test("equals() works", () => {
    // @ts-expect-error - Non-array always return false
    expect(A.equals("foo", "foo")).toBe(false);

    expect(A.equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(A.equals([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(A.equals([1], [1, 2, 3])).toBe(false);

    expect(A.equals([1, 2, [3, 4]], [1, 2, [3, 4]])).toBe(false);
    expect(A.equals([1, 2, [3, 4]], [1, 2, [3, 4]], true)).toBe(true);

    const nested = [1, 2, 3, 4, 5];
    expect(A.equals([nested, nested], [nested, nested])).toBe(true);

    const arr = [1, 2, 3, 4, 5];
    expect(A.equals(arr, arr)).toBe(true);

    {
      const arr1 = [1, "foo", { hello: "world" }] as const;
      const arr2 = [] as unknown;

      if (A.equals(arr1, arr2)) {
        type Tests = [
          Expect<Equal<(typeof arr2)[0], 1>>,
          // Because the comparison is only based on values (vs. property descriptors),
          // the return type is not readonly (vs. arr1, due to `as const`) to make it less strict to work with.
          // Reason why it's not `{ readonly hello: "world" }`, while at runtime it might (or not) be frozen.
          Expect<Equal<(typeof arr2)[2], { hello: "world" }>>
        ];
      }
    }
  });

  test("copy() works", () => {
    {
      const input = [1, 2, 3];
      const output = A.copy(input);
      expect(input).toEqual(output);
      expect(input).not.toBe(output);

      // Various non-array inputs should be converted to arrays, thus also creating a new array.

      const copies = [
        // @ts-expect-error
        A.copy({}),
        A.copy(null),
        A.copy(undefined),
        A.copy(3),
      ];
      expect(copies).toEqual([[], [], [], [, , ,]]);
      type Test = Expect<Equal<typeof copies, unknown[][]>>;

      {
        const input = [1, true, null, undefined, "foo", Symbol("bar")];
        const output = A.copy(input);
        type Test = Expect<Equal<typeof input, typeof output>>;
      }
      {
        const input = O.freeze([
          1 as number,
          true,
          null,
          undefined,
          "foo",
          Symbol("bar"),
        ] as const);
        const output = A.copy(input);

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
          Expect<Equal<typeof input, Readonly<typeof output>>>
        ];
      }
    }
    {
      const input = new Set([1, 2, 3] as const);
      const output = A.copy(input);

      expect(output).toEqual([...input.values()]);
      expect(output).not.toBeInstanceOf(Set);

      type Test = Expect<Equal<typeof output, (1 | 2 | 3)[]>>;
    }
    {
      const input = "foo";
      const output = A.copy(input);

      expect(output).toEqual(["f", "o", "o"]);

      type Test = Expect<Equal<typeof output, string[]>>;
    }
  });

  test("realLength() works", () => {
    {
      const input = [1, 2, 3, 4];
      const output = A.realLength(input);
      expect(output).toBe(4);
      type Test = Expect<Equal<typeof output, number>>;
    }
    {
      const input = [, , , 1, , , 2, 3];
      const output = A.realLength(input);
      expect(output).toBe(3);
      type Test = Expect<Equal<typeof output, number>>;
    }
  });

  test("first() works", () => {
    {
      const input = [1, 2, 3];
      const output = A.first(input);
      expect(output).toBe(1);
      type Test = Expect<Equal<typeof output, number>>;
    }
    {
      const input = [, , , 1, , , 2, 3];
      const output = A.first(input);
      expect(output).toBe(1);
      type Test = Expect<Equal<typeof output, number | undefined>>;
    }
    {
      const input = [, , , , , , , ,] as const;
      const output = A.first(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, undefined>>;
    }
    {
      const input: [] = [] as const;
      const output = A.first(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, unknown>>;
    }
  });

  test("firstKey() works", () => {
    expect(A.firstKey([1, 2, 3])).toBe(0);
    expect(A.firstKey([, , , 1, , , 2, 3])).toBe(3);
    expect(A.firstKey([, , , , , , , ,])).toBe(undefined);
    expect(A.firstKey([])).toBe(undefined);

    // @ts-expect-error
    expect(() => A.firstKey({})).toThrow(ExpectedArrayError);

    {
      const input = [1, 2, 3];
      const output = A.firstKey(input);
      expect(output).toBe(0);
      type Test = Expect<Equal<typeof output, number>>;
    }
    {
      const input = [, , , 1, , , 2, 3] as unknown[];
      const output = A.firstKey(input);
      expect(output).toBe(3);
      type Test = Expect<Equal<typeof output, undefined | number>>;
    }
    {
      const input = [, , , , , , , ,];
      const output = A.firstKey(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, undefined | number>>;
    }
    {
      const input: [] = [] as const;
      const output = A.firstKey(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, undefined | number>>;
    }
  });

  test("last() works", () => {
    {
      const input = [1, 2, 3];
      const output = A.last(input);
      expect(output).toBe(3);
      type Test = Expect<Equal<typeof output, number>>;
    }
    {
      const input = [1, , , 2, 3, , ,];
      const output = A.last(input);
      expect(output).toBe(3);
      type Test = Expect<Equal<typeof output, number | undefined>>;
    }
    {
      const input = [, , , , , , , ,] as const;
      const output = A.last(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, undefined>>;
    }
    {
      const input: [] = [] as const;
      const output = A.last(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, unknown>>;
    }
  });

  test("lastKey() works", () => {
    expect(A.lastKey([1, 2, 3])).toBe(2);
    expect(A.lastKey([1, , , 2, 3, , ,])).toBe(4);
    expect(A.lastKey([, , , , , , , ,])).toBe(undefined);
    expect(A.lastKey([])).toBe(undefined);

    // @ts-expect-error
    expect(() => A.lastKey({})).toThrow(ExpectedArrayError);

    {
      const input = [1, 2, 3];
      const output = A.lastKey(input);
      expect(output).toBe(2);
      type Test = Expect<Equal<typeof output, number>>;
    }
    {
      const input = [1, , , 2, 3, , ,] as unknown[];
      const output = A.lastKey(input);
      expect(output).toBe(4);
      type Test = Expect<Equal<typeof output, undefined | number>>;
    }
    {
      const input = [, , , , , , , ,];
      const output = A.lastKey(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, undefined | number>>;
    }
    {
      const input: [] = [] as const;
      const output = A.lastKey(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, undefined | number>>;
    }
  });

  test("toCollapsed() works", () => {
    const input = [undefined, null, , 1, , , 2, 3] as const;
    const output = A.toCollapsed(input);

    expect(output).toEqual([undefined, null, 1, 2, 3]);
    expect(output).not.toBe(input);

    type Test = Expect<Equal<typeof output, (1 | 2 | 3 | undefined | null)[]>>;
  });

  test("collapse() works", () => {
    const input = [undefined, null, , 1 as const, , , 2 as const, 3 as const];
    const output = A.collapse(input);

    expect(input).toEqual([undefined, null, 1, 2, 3]);
    expect(output).toBe(input);

    type Test = Expect<Equal<typeof output, (1 | 2 | 3 | undefined | null)[]>>;

    expect(() => A.collapse(new Set([]) as unknown as any[])).toThrow(
      ExpectedArrayError
    );
  });

  test("toDeduplicated() works", () => {
    const input = [1, 2, 3, 3, 2, 1];
    const output = A.toDeduplicated(input);

    expect(output).toEqual([1, 2, 3]);
    expect(output).not.toBe(input);

    type Test = Expect<Equal<typeof output, number[]>>;
  });

  test("deduplicate() works", () => {
    const input = [1, 2, 3, 3, 2, 1];
    const output = A.deduplicate(input);

    expect(input).toEqual([1, 2, 3]);
    expect(output).toBe(input);

    type Test = Expect<Equal<typeof output, number[]>>;

    // @ts-expect-error
    expect(() => A.deduplicate({})).toThrow(ExpectedArrayError);
  });

  test("hasDuplicates() works", () => {
    expect(A.hasDuplicates([1, 2, 3])).toBe(false);
    expect(A.hasDuplicates([1, 2, 3, 3])).toBe(true);
  });

  test("toSorted() works", () => {
    {
      const input = [3, 1, 2];
      const output = A.toSorted(input);

      expect(output).toEqual([1, 2, 3]);
      expect(output).not.toBe(input);

      type Test = Expect<Equal<typeof output, number[]>>;
    }
    {
      const input = [3, 1, 2];
      const output = A.toSorted(input, (a, b) => b - a);

      expect(output).toEqual([3, 2, 1]);
      expect(output).not.toBe(input);

      type Test = Expect<Equal<typeof output, number[]>>;
    }
  });

  test("sort() works", () => {
    const input = [3, 1, 2];
    const output = A.sort(input);

    expect(input).toEqual([1, 2, 3]);
    expect(output).toBe(input);

    type Test = Expect<Equal<typeof output, number[]>>;

    // @ts-expect-error
    expect(() => A.sort({})).toThrow(ExpectedArrayError);
  });

  test("toShuffled() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const ref = [...input];
    const output = A.toShuffled(input);

    expect(input).toEqual(ref);
    expect(output).not.toBe(input);
    expect(output).toEqual(expect.arrayContaining(ref));
    expect(output).toHaveLength(ref.length);

    type Test = Expect<
      Equal<typeof output, (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[]>
    >;
  });

  test("shuffle() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ref = [...input];
    const output = A.shuffle(input);

    expect(input).toEqual(expect.arrayContaining(ref));
    expect(input).not.toEqual(ref);
    expect(output).toBe(input);

    // @ts-expect-error
    expect(() => A.shuffle({})).toThrow(ExpectedArrayError);
  });

  test("toReversed() works", () => {
    {
      const input = [1, 2, 3];
      const output = A.toReversed(input);

      expect(output).toEqual([3, 2, 1]);
      expect(output).not.toBe(input);

      type Test = Expect<Equal<typeof output, number[]>>;
    }
    {
      const input = "foo";
      const output = A.toReversed(input);
      expect(output).toEqual(["o", "o", "f"]);
    }
    {
      const input = new Set([1, 2, 3]);
      const output = A.toReversed(input);
      expect(output).toEqual([3, 2, 1]);
    }
  });

  test("reverse() works", () => {
    const input = [1, 2, 3];
    const output = A.reverse(input);

    expect(input).toEqual([3, 2, 1]);
    expect(output).toBe(input);

    // @ts-expect-error
    expect(() => A.reverse({})).toThrow(ExpectedArrayError);
  });

  test("random() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const output = A.random(input);

    expect(input).toContain(output);

    type Test = Expect<Equal<typeof output, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>>;
  });

  test("randoms() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const ref = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    {
      const output = A.randoms(input);

      expect(output).toHaveLength(1);
      expect(ref).toContain(output[0]);

      type Test = Expect<
        Equal<typeof output, (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[]>
      >;
    }
    {
      const output = A.randoms(input, 0);
      expect(output).toHaveLength(0);
    }
    {
      const output = A.randoms(input, 2);
      expect(output).toHaveLength(2);
      expect(ref).toEqual(expect.arrayContaining(output));
    }
    {
      const output = A.randoms(input, 9999);
      expect(output).toHaveLength(input.length);
      expect(ref).toEqual(expect.arrayContaining(output));
    }

    expect(input).toEqual(ref);

    {
      const input: any[] = [];
      const output = A.randoms(input);

      expect(output).toHaveLength(0);
      expect(output).not.toBe(input);

      type Test = Expect<Equal<typeof output, unknown[]>>;
    }

    expect(A.randoms([], 10)).toEqual([]);
    expect(A.randoms([1])).toEqual([1]);
    expect(A.randoms([1], 10)).toEqual([1]);
  });

  test("includes() works", () => {
    expect(A.includes([1, 2, 3], 2)).toBe(true);
    expect(A.includes([1, 2, 3], 4)).toBe(false);
    expect(A.includes([1, 2, 3], "2" as any)).toBe(false);
    expect(A.includes(["1", "2", "3"], "2")).toBe(true);
  });

  test("difference() works", () => {
    const a = [1, 2, 3, 4, "5"];
    const b = [3, 4, 5, 6, 7];

    const output = A.difference(a, b);

    expect(output).toEqual([1, 2, "5"]);
    expect(output).not.toBe(a);
    expect(output).not.toBe(b);

    type Test = Expect<Equal<typeof output, (number | string)[]>>;
  });

  test("intersection() works", () => {
    const a = [1, 2, 3, 4, "5"];
    const b = [3, 4, 5, 6, 7];

    const output = A.intersection(a, b);

    expect(output).toEqual([3, 4]);
    expect(output).not.toBe(a);
    expect(output).not.toBe(b);

    type Test = Expect<Equal<typeof output, (number | string)[]>>;
  });
});
