import { pick } from "@auaust/primitive-kit/objects";

import { expect } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

test("pick() works", () => {
  {
    const obj = {
      foo: "bar",
      bar: "baz",
      baz: "qux",
      qux: "quux",
    } as const;

    const picked = pick(obj, ["foo", "baz"]);

    expect(picked).toEqual({
      foo: "bar",
      baz: "qux",
    });

    type Test = Expect<
      Equal<
        typeof picked,
        {
          foo: "bar";
          baz: "qux";
        }
      >
    >;
  }

  {
    const obj = {
      foo: "bar",
      bar: "baz",
      baz: "qux",
      qux: "quux",
    } as const;

    const fn = (key: string, value: string) => value.length;

    const picked = pick(obj, ["foo", "baz", "qux"], fn);

    expect(picked).toEqual({
      foo: 3,
      baz: 3,
      qux: 4,
    });

    type Test = Expect<
      Equal<
        typeof picked,
        {
          foo: number;
          baz: number;
          qux: number;
        }
      >
    >;
  }
});
