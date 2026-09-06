import { decrement } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { S } from "@auaust/primitive-kit";
import { test } from "vitest";

test("decrement() works", () => {
  expect(decrement("foo")).toBe("foo");
  expect(decrement("foo", 0)).toBe("foo");
  expect(decrement("foo1")).toBe("foo");
  expect(decrement("foo1", { keepZero: false })).toBe("foo");
  expect(decrement("foo1", { keepZero: true })).toBe("foo0");
  expect(decrement("foo2")).toBe("foo1");
  expect(decrement("foo-10", 5)).toBe("foo-5");
  expect(
    decrement("meep-0", {
      decrement: 2,
      keepZero: false,
      separator: "-",
    })
  ).toBe("meep");
  expect(
    decrement("foo-1001", {
      decrement: 2,
      pad: 5,
      filler: "0",
    })
  ).toBe("foo-00999");
  expect(decrement("foo-0", { keepZero: true })).toBe("foo-0");
  expect(decrement("foo2", { decrement: 3 })).toBe("foo");
  expect(decrement("map2", { decrement: 3, keepZero: true })).toBe("map0");
  expect(decrement("foo2", { separator: "" })).toBe("foo1");
  expect(decrement("foo2", { separator: "-" })).toBe("foo-1");
  expect(decrement("foo2", { separator: "-", pad: false })).toBe("foo-1");
  expect(
    decrement("foo2", {
      separator: "-",
      decrement: 3,
      keepZero: true,
      pad: 3,
      filler: "0",
    })
  ).toBe("foo-000");

  expect(decrement("foo2", -2)).toBe(S.increment("foo2", 2));
});
