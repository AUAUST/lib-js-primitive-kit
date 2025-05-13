import { A, O } from "@auaust/primitive-kit";

import type { Equal, Expect, NotEqual } from "type-testing";
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
