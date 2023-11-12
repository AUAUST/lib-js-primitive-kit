import { O } from "~/Object";

import { describe, expect, test } from "@jest/globals";

describe("O class", () => {
  test("conversion to string works", () => {
    expect(O.from(null)).toEqual({});
    expect(O.from(undefined)).toEqual({});

    expect(O.from([])).toEqual({});
    expect(O.from(["foo", 2, true])).toEqual({ "0": "foo", "1": 2, "2": true });

    expect(O.from("foo")).toEqual(new String("foo"));
    expect(O.from(0)).toEqual(new Number(0));

    let obj: any = { foo: "bar" };
    expect(O.from(obj)).toBe(obj);

    obj = new Date();
    expect(O.from(obj)).toBe(obj);
  });

  test("non-strict typecheck works", () => {
    expect(O.is({})).toBe(true);
    expect(O.is([])).toBe(false);
    expect(O.is([], true)).toBe(true);

    expect(O.is(null)).toBe(false);
    expect(O.is(undefined)).toBe(false);

    expect(O.is(new Date())).toBe(true);
    expect(O.is(() => {})).toBe(false);
  });

  test("strict typecheck works", () => {
    expect(O.isStrict({})).toBe(true);
    expect(O.isStrict([])).toBe(false);

    expect(O.isStrict(null)).toBe(false);
    expect(O.isStrict(undefined)).toBe(false);

    expect(O.isStrict(new Date())).toBe(false);
    expect(O.isStrict(() => {})).toBe(false);
  });

  test("keys() works", () => {
    expect(O.keys({})).toEqual([]);
    expect(O.keys({ foo: "bar" })).toEqual(["foo"]);
    expect(O.keys({ foo: "bar", bar: "baz" })).toEqual(["foo", "bar"]);

    expect(O.keys([])).toEqual([]);
    expect(O.keys(["foo"])).toEqual(["0"]);
  });

  test("values() works", () => {
    expect(O.values({})).toEqual([]);
    expect(O.values({ foo: "bar" })).toEqual(["bar"]);
    expect(O.values({ foo: "bar", bar: "baz" })).toEqual(["bar", "baz"]);

    expect(O.values([])).toEqual([]);
    expect(O.values(["foo"])).toEqual(["foo"]);
  });

  test("entries() works", () => {
    expect(O.entries({})).toEqual([]);
    expect(O.entries({ foo: "bar" })).toEqual([["foo", "bar"]]);
    expect(O.entries({ foo: "bar", bar: "baz" })).toEqual([
      ["foo", "bar"],
      ["bar", "baz"],
    ]);

    expect(O.entries([])).toEqual([]);
    expect(O.entries(["foo"])).toEqual([["0", "foo"]]);
  });

  test("equals() works", () => {
    expect(O.equals({}, {})).toBe(true);
    expect(O.equals({ foo: "bar" }, { foo: "bar" })).toBe(true);
    expect(O.equals({ foo: "bar" }, { foo: "barre" })).toBe(false);
    expect(O.equals({ foo: "bar" }, { foo: "bar", bar: "baz" })).toBe(false);

    expect(O.equals([], [])).toBe(true);
    expect(O.equals(["foo"], ["foo"])).toBe(true);
    expect(O.equals(["foo"], ["bar"])).toBe(false);
    expect(O.equals(["foo"], ["foo", "bar"])).toBe(false);

    expect(O.equals(null, null)).toBe(true);
    expect(O.equals(null, undefined)).toBe(false);

    expect(O.equals(new Date(), new Date())).toBe(true);
    expect(
      O.equals(
        new Date(2023, 11, 12, 18, 5, 0),
        new Date(2023, 11, 12, 18, 5, 1)
      )
    ).toBe(false);

    expect(
      O.equals(
        () => {},
        () => {}
      )
    ).toBe(false);

    expect(O.equals(Symbol("foo"), Symbol("foo"))).toBe(false);

    expect(O.equals(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(false);

    expect(O.equals(NaN, NaN)).toBe(true);
    expect(O.equals(NaN, 0)).toBe(false);
    expect(O.equals(-0, 0)).toBe(false);
    expect(O.equals(0, 0)).toBe(true);
    expect(O.equals(Infinity, Infinity)).toBe(true);
    expect(O.equals(Infinity, -Infinity)).toBe(false);
  });
});
