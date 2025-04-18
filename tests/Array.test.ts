import { A } from "~/arrays";
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

  test("is() and isNot() works", () => {
    const arrays = [[], [1, 2, 3]];

    const notArrays = [
      "foo",
      {},
      null,
      undefined,
      3,
      { 0: 1, 1: 2, length: 1 },
    ];

    for (const a of arrays) {
      expect(A.is(a)).toBe(true);
      expect(A.isNot(a)).toBe(false);
    }

    for (const a of notArrays) {
      expect(A.is(a)).toBe(false);
      expect(A.isNot(a)).toBe(true);
    }

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
    // @ts-expect-error
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
    expect(() => A.firstKey({})).toThrow(TypeError);

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
      type Test = Expect<Equal<typeof output, number>>;
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
    expect(() => A.lastKey({})).toThrow(TypeError);

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
      type Test = Expect<Equal<typeof output, number>>;
    }

    {
      const input = [, , , , , , , ,];
      const output = A.lastKey(input);
      expect(output).toBe(undefined);
      type Test = Expect<Equal<typeof output, number | undefined>>;
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

    expect(() => A.collapse(<any>new Set([]))).toThrow(TypeError);
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
    expect(() => A.deduplicate({})).toThrow(TypeError);
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
    expect(() => A.sort({})).toThrow(TypeError);
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
    expect(() => A.shuffle({})).toThrow(TypeError);
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
    expect(() => A.reverse({})).toThrow(TypeError);
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

      type Test = Expect<Equal<typeof output, any[]>>;
    }

    expect(A.randoms([], 10)).toEqual([]);
    expect(A.randoms([1])).toEqual([1]);
    expect(A.randoms([1], 10)).toEqual([1]);
  });

  test("includes() works", () => {
    expect(A.includes([1, 2, 3], 2)).toBe(true);
    expect(A.includes([1, 2, 3], 4)).toBe(false);
    expect(A.includes([1, 2, 3], <any>"2")).toBe(false);
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

  test("wrap() works", () => {
    {
      const input = [1, 2, 3];
      const output = A.wrap(input);

      expect(output).toEqual([1, 2, 3]);
      expect(output).toBe(input);

      type Test = Expect<Equal<typeof output, number[]>>;
    }

    expect(A.wrap(0)).toEqual([0]);
    expect(A.wrap("foo")).toEqual(["foo"]);
    expect(A.wrap(null)).toEqual([]);
    // @ts-expect-error
    expect(A.wrap()).toEqual([]);
  });

  test("flat() works", () => {
    {
      const input = [1, [2, 3], [4, [5, 6]]];
      const output = A.flat(input);

      expect(output).toEqual([1, 2, 3, 4, [5, 6]]);
      expect(output).not.toBe(input);

      type Test = Expect<Equal<typeof output, (number | number[])[]>>;
    }

    {
      expect(A.flat([1, 2, 3])).toEqual([1, 2, 3]);
      expect(A.flat([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
      expect(A.flat([1, [2, [3, [4]]]], -1)).toEqual([1, 2, 3, 4]);
      expect(A.flat([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    }
  });

  test("pluck() works", () => {
    const input = [
      {
        foo: 1,
        bar: 2,
      },
      {
        foo: 3,
        bar: 4,
        baz: 5,
      },
      {
        bar: "XXX",
      },
      {
        foo: "YYY",
        bar: null,
      },
    ];

    const partial = A.pluck(input, "foo");
    expect(partial).toEqual([1, 3, undefined, "YYY"]);

    const everywhere = A.pluck(input, "bar");
    expect(everywhere).toEqual([2, 4, "XXX", null]);

    expect(A.pluck(input, "baz")).toEqual([undefined, 5, undefined, undefined]);

    type Tests = [
      Expect<Equal<typeof partial, (number | string | undefined)[]>>,
      Expect<Equal<typeof everywhere, (string | number | null)[]>>
    ];
  });

  test("keyBy() works", () => {
    const input = [
      {
        id: 1,
        name: "foo",
      },
      {
        id: "key",
        name: "bar",
      },
      {
        id: Symbol.for("key"),
        name: "baz",
      },
      {
        foo: "bar",
      },
    ];

    const output = A.keyBy(input, "id");

    expect(output).toEqual({
      1: input[0],
      key: input[1],
      [Symbol.for("key")]: input[2],
    });

    expect(A.keyBy([], "id")).toEqual({});
  });

  describe("pull() works", () => {
    test("with a single value", () => {
      {
        const input = [1, 2, 3, 4, 5];
        const output = A.pull(input, 3);

        expect(input).toEqual([1, 2, 4, 5]);
        expect(output).toBe(1); // Amount of values removed

        type Tests = Expect<Equal<typeof output, number>>;
      }

      {
        const input = [1, "a", 3, "hello", 3, "world", 4];
        const output = A.pull(input, 3);

        expect(input).toEqual([1, "a", "hello", "world", 4]);
        expect(output).toBe(2);

        type Tests = Expect<Equal<typeof output, number>>;
      }
    });

    test("with multiple values", () => {
      const input = [1, 2, 3, 4, 5, "string"];
      const output = A.pull(input, [3, 4]);

      expect(input).toEqual([1, 2, 5, "string"]);
      expect(output).toEqual([3, 4]);

      type Tests = Expect<Equal<typeof output, (number | string)[]>>;
    });

    test("with a callback", () => {
      const input = [1, 2, 3, 4, 5];
      const output = A.pull(input, (value) => {
        type Test = Expect<Equal<typeof value, number>>;

        return value > 3;
      });

      expect(input).toEqual([1, 2, 3]);
      expect(output).toEqual([4, 5]);

      type Tests = Expect<Equal<typeof output, number[]>>;
    });
  });
});
