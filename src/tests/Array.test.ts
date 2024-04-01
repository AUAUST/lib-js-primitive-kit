import { A } from "~/Array";

import { describe, expect, test } from "vitest";

describe("A class", () => {
  test("called as a function works", () => {
    expect(A([1, 2, 3])).toEqual([1, 2, 3]);
    expect(A({ length: 3 })).toEqual([undefined, undefined, undefined]);
  });

  test("from() works", () => {
    // Passing an array should return it as is.
    const arr = [1, 2, 3];
    expect(A.from(arr)).toBe(arr);

    // Nullish values should return an empty array.
    expect(A.from()).toEqual([]);
    expect(A.from(null)).toEqual([]);
    expect(A.from(undefined)).toEqual([]);

    // As a shortcut, passing a number should return an array of that length.
    expect(A.from(3)).toEqual([, , ,]);

    // Everything else should be passed to Array.from().
    expect(A.from({ length: 3 })).toEqual([, , ,]);
    expect(A.from("foo")).toEqual(["f", "o", "o"]);
    expect(A.from(new Set([1, 2, 3]))).toEqual([1, 2, 3]);
  });

  test("is() works", () => {
    expect(A.is([])).toBe(true);
    expect(A.is([1, 2, 3])).toBe(true);
    expect(A.is("foo")).toBe(false);
    expect(A.is({})).toBe(false);
    expect(A.is(null)).toBe(false);
    expect(A.is(undefined)).toBe(false);
    expect(A.is(3)).toBe(false);
  });

  test("isStrict() works", () => {
    expect(A.isStrict([])).toBe(false);
    expect(A.isStrict([1, 2, 3])).toBe(true);
    expect(A.isStrict("foo")).toBe(false);
  });

  test("isIterable() works", () => {
    expect(A.isIterable([])).toBe(true);
    expect(A.isIterable([1, 2, 3])).toBe(true);
    expect(A.isIterable("foo")).toBe(true);
    expect(A.isIterable({})).toBe(false);
    expect(A.isIterable(null)).toBe(false);
    expect(A.isIterable(undefined)).toBe(false);
    expect(A.isIterable(3)).toBe(false);
  });

  test("equals() works", () => {
    expect(A.equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(A.equals([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(A.equals([1], [1, 2, 3])).toBe(false);

    expect(A.equals([1, 2, [3, 4]], [1, 2, [3, 4]])).toBe(false);
    expect(A.equals([1, 2, [3, 4]], [1, 2, [3, 4]], true)).toBe(true);

    const nested = [1, 2, 3, 4, 5];
    expect(A.equals([nested, nested], [nested, nested])).toBe(true);

    const arr = [1, 2, 3, 4, 5];
    expect(A.equals(arr, arr)).toBe(true);
  });

  test("realLength() works", () => {
    expect(A.realLength([1, 2, 3, 4])).toBe(4);
    expect(A.realLength([, , , 1, , , 2, 3])).toBe(3);
  });

  test("first() works", () => {
    expect(A.first([1, 2, 3])).toBe(1);
    expect(A.first([, , , 1, , , 2, 3])).toBe(1);
    expect(A.first([, , , , , , , ,])).toBe(undefined);
    expect(A.first([])).toBe(undefined);
  });

  test("firstKey() works", () => {
    expect(A.firstKey([1, 2, 3])).toBe(0);
    expect(A.firstKey([, , , 1, , , 2, 3])).toBe(3);
    expect(A.firstKey([, , , , , , , ,])).toBe(undefined);
    expect(A.firstKey([])).toBe(undefined);
  });

  test("toCollapsed() works", () => {
    const input = [, , , 1, , , 2, 3];
    const output = A.toCollapsed(input);
    expect(output).toEqual([1, 2, 3]);
    expect(output).not.toBe(input);
  });

  test("collapse() works", () => {
    const input = [, , , 1, , , 2, 3];
    const output = A.collapse(input);
    expect(input).toEqual([1, 2, 3]);
    expect(output).toBe(input);

    // @ts-expect-error
    expect(() => A.collapse({})).toThrow(TypeError);
  });

  test("toDeduplicated() works", () => {
    const input = [1, 2, 3, 3, 2, 1];
    const output = A.toDeduplicated(input);
    expect(output).toEqual([1, 2, 3]);
    expect(output).not.toBe(input);
  });

  test("deduplicate() works", () => {
    const input = [1, 2, 3, 3, 2, 1];
    const output = A.deduplicate(input);
    expect(input).toEqual([1, 2, 3]);
    expect(output).toBe(input);

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
    }

    {
      const input = [3, 1, 2];
      const output = A.toSorted(input, (a, b) => b - a);
      expect(output).toEqual([3, 2, 1]);
      expect(output).not.toBe(input);
    }
  });

  test("sort() works", () => {
    const input = [3, 1, 2];
    const output = A.sort(input);
    expect(input).toEqual([1, 2, 3]);
    expect(output).toBe(input);

    // @ts-expect-error
    expect(() => A.sort({})).toThrow(TypeError);
  });

  test("toShuffled() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ref = [...input];
    const output = A.toShuffled(input);
    expect(input).toEqual(ref);
    expect(output).not.toBe(input);
    expect(output).toEqual(expect.arrayContaining(ref));
    expect(output).toHaveLength(ref.length);
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

  test("random() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const output = A.random(input);
    expect(input).toContain(output);
  });

  test("randoms() works", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ref = [...input];

    {
      const output = A.randoms(input);
      expect(output).toHaveLength(1);
      expect(ref).toContain(output[0]);
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

    expect(A.randoms([])).toEqual([]);
    expect(A.randoms([], 10)).toEqual([]);
    expect(A.randoms([1])).toEqual([1]);
    expect(A.randoms([1], 10)).toEqual([1]);
  });
});
