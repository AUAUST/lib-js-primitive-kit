import { entries } from "@auaust/primitive-kit/objects";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("entries() works", () => {
  expect(entries(null)).toEqual([]);

  expect(entries(undefined)).toEqual([]);

  expect(entries({})).toEqual([]);

  expect(entries([])).toEqual([]);

  expect(entries(["foo"])).toEqual([[0, "foo"]]);

  {
    const result = entries({ foo: "bar" } as const);

    expect(result).toEqual([["foo", "bar"]]);

    type Test = Expect<Equal<typeof result, ["foo", "bar"][]>>;
  }

  {
    const result = entries({
      foo: "bar",
      bar: "baz",
    } as const);

    expect(result).toEqual([
      ["foo", "bar"],
      ["bar", "baz"],
    ]);

    type Test = Expect<
      Equal<typeof result, (["foo", "bar"] | ["bar", "baz"])[]>
    >;
  }
});
