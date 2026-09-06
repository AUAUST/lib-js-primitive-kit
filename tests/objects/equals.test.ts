import { equals } from "@auaust/primitive-kit/objects";

import { expect } from "vitest";
import { test } from "vitest";

test("equals() works", () => {
  expect(equals({}, {})).toBe(true);
  expect(equals({ foo: "bar" }, { foo: "bar" })).toBe(true);
  expect(equals({ foo: "bar" }, { foo: "barre" })).toBe(false);
  expect(equals({ foo: "bar" }, { foo: "bar", bar: "baz" })).toBe(false);
  expect(equals({ foo: "bar", bar: "baz" }, { foo: "bar" })).toBe(false);

  expect(equals([], [])).toBe(true);
  expect(equals(["foo"], ["foo"])).toBe(true);
  expect(equals(["foo"], ["bar"])).toBe(false);
  expect(equals(["foo"], ["foo", "bar"])).toBe(false);

  expect(equals(null, null)).toBe(true);
  expect(equals(null, {})).toBe(false);
  expect(equals(null, undefined)).toBe(false);

  // Two same dates must return true because they both serialize to the same string
  expect(
    equals(new Date(2025, 4, 3, 14, 4, 39), new Date(2025, 4, 3, 14, 4, 39))
  ).toBe(true);

  // Two different dates must return false because they serialize to different strings
  expect(
    equals(new Date(2023, 11, 12, 18, 5, 0), new Date(2023, 11, 12, 18, 5, 1))
  ).toBe(false);

  // Functions can't be compared except by reference, thus they are always false.
  expect(
    equals(
      () => {},
      () => {}
    )
  ).toBe(false);

  expect(equals(new Number(), new String())).toBe(false);

  expect(equals(Symbol("foo"), Symbol("foo"))).toBe(false);

  expect(equals(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(false);

  expect(equals(NaN, NaN)).toBe(true);
  expect(equals(NaN, 0)).toBe(false);
  expect(equals(-0, 0)).toBe(false);
  expect(equals(0, 0)).toBe(true);
  expect(equals(Infinity, Infinity)).toBe(true);
  expect(equals(Infinity, -Infinity)).toBe(false);
});
