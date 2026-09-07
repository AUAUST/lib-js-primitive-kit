import { defineProperty } from "@auaust/primitive-kit/objects";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("defineProperty() works", () => {
  const obj = {};

  const derived1 = defineProperty(obj, "foo", {
    value: "bar",
    enumerable: true,
  });

  expect(derived1).toEqual({ foo: "bar" });
  type Test1 = Expect<Equal<typeof derived1, { foo: string }>>;

  const derived2 = defineProperty(derived1, "bar", {
    enumerable: true,
    get() {
      return "baz";
    },
  });

  expect(derived2.foo).toBe("bar");
  expect(derived2.bar).toBe("baz");
  type Test2 = Expect<
    Equal<typeof derived2, { foo: string } & { bar: string }>
  >;

  // Re-assignment is done to apply the types, but derived should refer to the same object.
  expect(
    [obj, derived1, derived2].every((current, index, arr) => {
      // This checks that each object is the same as the previous one, so that they are all the same.
      return index === 0 ? true : current === arr[index - 1];
    }),
  ).toBe(true);
});
