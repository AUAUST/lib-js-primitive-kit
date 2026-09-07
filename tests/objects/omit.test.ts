import { omit } from "@auaust/primitive-kit/objects";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("omit() works", () => {
  {
    const obj = {
      foo: "bar",
      bar: "baz",
      baz: "qux",
      qux: "quux",
    } as const;

    const omitted = omit(obj, ["foo", "baz"]);

    expect(omitted).toEqual({
      bar: "baz",
      qux: "quux",
    });

    type Test = Expect<
      Equal<
        typeof omitted,
        {
          bar: "baz";
          qux: "quux";
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

    const omitted = omit(obj, ["foo", "baz", "qux"], fn);

    expect(omitted).toEqual({
      bar: 3,
    });

    expect(
      omit(
        {
          foo: "bar",
          bar: 1,
        },
        () => true,
      ),
    ).toEqual({});

    type Test = Expect<
      Equal<
        typeof omitted,
        {
          bar: number;
        }
      >
    >;
  }

  {
    const obj = {
      foo: "bar",
      hello_world: "baz",
      baz: "qux",
    } as const;

    const omitted = omit(
      obj,
      (key) => key.includes("_"),
      (key, value) => value.length,
    );

    expect(omitted).toEqual({
      foo: 3,
      baz: 3,
    });
  }
});
