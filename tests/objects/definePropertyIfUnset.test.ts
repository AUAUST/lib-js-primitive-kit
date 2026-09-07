import { definePropertyIfUnset } from "@auaust/primitive-kit/objects";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("definePropertyIfUnset() works", () => {
  const obj = {
    foo: "bar",
  };

  const derived1 = definePropertyIfUnset(obj, "foo", {
    value: 1,
    enumerable: true,
  });

  expect(derived1.foo).toBe("bar");

  type Test1 = Expect<Equal<(typeof derived1)["foo"], string>>;

  const derived2 = definePropertyIfUnset(obj, "bar", {
    value: 1,
    enumerable: true,
  });

  expect(derived2.foo).toBe("bar");
  expect(derived2.bar).toBe(1);

  type Test2 = Expect<Equal<typeof derived2, typeof obj & { bar: number }>>;

  expect(
    [obj, derived1, derived2].every((current, index, arr) => {
      return index === 0 ? true : current === arr[index - 1];
    }),
  ).toBe(true);
});
