import { values } from "@auaust/primitive-kit/objects";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("values() works", () => {
  expect(values(null)).toEqual([]);

  expect(values(undefined)).toEqual([]);

  expect(values({})).toEqual([]);

  expect(values([])).toEqual([]);

  expect(values(["foo"])).toEqual(["foo"]);

  {
    const result = values({ foo: "bar" } as const);

    expect(result).toEqual(["bar"]);
    type Test = Expect<Equal<typeof result, "bar"[]>>;
  }

  {
    const result = values({ foo: "bar", bar: "baz" } as const);

    expect(result).toEqual(["bar", "baz"]);
    type Test = Expect<Equal<typeof result, ("bar" | "baz")[]>>;
  }

  type TestObject = {
    foo: "valueOfFoo";
    bar: "valueOfBar";
    baz: "valueOfBaz";
  };
});
