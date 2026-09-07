import { merge } from "@auaust/primitive-kit/objects";
import type { Equal, Expect } from "type-testing";

import { describe, expect, test } from "vitest";

describe("merge()", () => {
  test("works with basic objects", () => {
    const obj1 = { foo: "bar" };

    const obj2 = { bar: "baz" };

    const merged = merge(obj1, obj2);

    expect(merged).toEqual({
      foo: "bar",
      bar: "baz",
    });

    type Test = Expect<Equal<typeof merged, { foo: string; bar: string }>>;
  });

  test("gives precedence to later objects", () => {
    const obj1 = { foo: "bar", bar: 1 };

    const obj2 = { bar: "qux" };

    const merged = merge(obj1, obj2);

    expect(merged).toEqual({
      foo: "bar",
      bar: "qux",
    });

    type Test = Expect<Equal<typeof merged, { foo: string; bar: string }>>;
  });

  test("merges optional properties", () => {
    const merged = merge(
      { foo: "bar", bar: 1 },
      { bar: undefined, baz: "qux" },
      {} as { bar?: number },
      { foo: "".toString() },
    );

    expect(merged).toEqual({
      foo: "",
      bar: undefined,
      baz: "qux",
    });

    type Test = Expect<
      Equal<typeof merged, { foo: string; bar: number | undefined; baz: "qux" }>
    >;
  });
});
