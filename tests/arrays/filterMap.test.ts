import { a } from "@auaust/primitive-kit";
import { filterMap } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it, vi } from "vitest";

describe("filterMap()", () => {
  it("filters and maps with one callback", () => {
    const result = filterMap([1, 2, 3, 4], (value) =>
      value % 2 === 0 ? value * 2 : undefined,
    );

    type Test = Expect<Equal<typeof result, number[]>>;

    expect(result).toEqual([4, 8]);
  });

  it("supports separate filter and mapper callbacks", () => {
    const values = [1, 2, 3, 4];

    const filter = vi.fn((value: number) => value % 2 === 0);

    const map = vi.fn((value: number) => value * 2);

    expect(filterMap(values, filter, map)).toEqual([4, 8]);

    expect(filter).toHaveBeenLastCalledWith(4, 3, values);

    expect(map).toHaveBeenLastCalledWith(4, 3, values);
  });

  it("accepts a property in place of a filter-mapper", () => {
    const values = [
      { name: "one" },
      { name: undefined },
      { other: true },
    ] as const;

    const result = filterMap(values, "name");

    type Test = Expect<Equal<typeof result, "one"[]>>;

    expect(result).toEqual(["one"]);
  });

  it("accepts properties in place of either separate callback", () => {
    const values = [
      { active: true, name: "one" },
      { active: false, name: "two" },
      { active: true, name: "three" },
    ];

    expect(filterMap(values, "active", "name")).toEqual(["one", "three"]);

    expect(filterMap(values, ({ active }) => active, "name")).toEqual([
      "one",
      "three",
    ]);

    expect(filterMap(values, "active", ({ name }) => name.length)).toEqual([
      3, 5,
    ]);
  });

  it("narrows values with a type-guard filter", () => {
    const values: (number | string)[] = [1, "two", 3];

    const result = filterMap(
      values,
      (value): value is string => typeof value === "string",
      (value) => value.toUpperCase(),
    );

    type Test = Expect<Equal<typeof result, string[]>>;

    expect(result).toEqual(["TWO"]);
  });

  it("does not visit empty array entries", () => {
    const callback = vi.fn((value: number) => value);

    const values = [, 1, , 2] as number[];

    expect(filterMap(values, callback)).toEqual([1, 2]);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("does not treat additional values as forwarded arguments", () => {
    // @ts-expect-error - The third argument must be a mapper.
    filterMap([1, 2], "toString", 16);
  });

  it("is chainable from array facades", () => {
    const result = a([1, 2, 3, 4]).filterMap((value) =>
      value % 2 === 0 ? String(value) : undefined,
    );

    type Test = Expect<Equal<typeof result.value, string[]>>;

    expect(result.value).toEqual(["2", "4"]);
  });
});
