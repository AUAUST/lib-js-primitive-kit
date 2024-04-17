import { P } from "~/primitives";

import { describe, expect, test } from "vitest";

describe("P class", () => {
  test("called as a function works", () => {
    for (const value of [
      "foo",
      0,
      false,
      null,
      undefined,
      {},
      [],
      new String("foo"),
      new Number(0),
      new Boolean(false),
    ]) {
      expect(P(value)).toBe(P.from(value));
    }
  });

  test("conversion to primitive works", () => {
    expect(P.from("foo")).toBe("foo");
    expect(P.from(0)).toBe(0);
    expect(P.from(false)).toBe(false);
    expect(P.from(null)).toBe(null);
    expect(P.from(undefined)).toBe(null);
    expect(P.from(BigInt(0))).toBe("0n");
    expect(P.from(BigInt(109283))).toBe("109283n");

    expect(P.from({ [Symbol.toPrimitive]: () => "foo" })).toBe("foo");
    expect(P.from({ valueOf: () => 12 })).toBe(12);
    expect(P.from({ toString: () => "Hello" })).toBe("Hello");

    expect(P.from({})).toBe(undefined);
    expect(P.from(Object.create(null))).toBe(undefined);
    expect(P.from(() => {})).toEqual(undefined);

    expect(P.from([])).toEqual(undefined);
    expect(P.from([1, 2, 3])).toEqual(undefined);
    expect(P.from([1, new Date(), {}, []])).toEqual(undefined);
    expect(P.from(console.log)).toEqual(undefined);
    expect(P.from(Symbol())).toEqual(undefined);

    expect(P.from(new String("foo"))).toBe("foo");
    expect(P.from(new Number(0))).toBe(0);
    expect(P.from(new Boolean(false))).toBe(false);

    const now = new Date();

    expect(P.from(now, "number")).toBe(now.getTime());
    expect(P.from(now, "string")).toBe(now.toString());
    expect(() => P.from(now, "boolean")).toThrow(TypeError);
  });

  test("primitive typecheck works", () => {
    // Primitive and primitive objects should both pass the check.
    expect(P.isPrimitive("string")).toBe(true);
    expect(P.isPrimitive(0)).toBe(true);
    expect(P.isPrimitive(false)).toBe(true);

    expect(P.isPrimitive(new String("string"))).toBe(false);
    expect(P.isPrimitive(new Number(0))).toBe(false);
    expect(P.isPrimitive(new Boolean(false))).toBe(false);

    // Other types should fail the check.
    expect(P.isPrimitive({})).toBe(false);
    expect(P.isPrimitive([])).toBe(false);
    expect(P.isPrimitive(null)).toBe(false);
    expect(P.isPrimitive(undefined)).toBe(false);
    expect(P.isPrimitive(() => {})).toBe(false);
  });

  test("non-primitive object check works", () => {
    expect(P.isObject({})).toBe(true);
    expect(P.isObject([])).toBe(true);
    expect(P.isObject(new String("foo"))).toBe(true);
    expect(P.isObject(new Number(0))).toBe(true);
    expect(P.isObject(new Boolean(false))).toBe(true);
    expect(P.isObject(() => {})).toBe(true);

    expect(P.isObject(null)).toBe(false);
    expect(P.isObject(undefined)).toBe(false);
    expect(P.isObject(0)).toBe(false);
    expect(P.isObject(false)).toBe(false);
    expect(P.isObject("")).toBe(false);
  });

  test("isNullish() works", () => {
    expect(P.isNullish(null)).toBe(true);
    expect(P.isNullish(undefined)).toBe(true);

    expect(P.isNullish(0)).toBe(false);
    expect(P.isNullish(false)).toBe(false);
    expect(P.isNullish("")).toBe(false);
    expect(P.isNullish({})).toBe(false);
  });

  test("isSet() works", () => {
    expect(P.isSet(null)).toBe(false);
    expect(P.isSet(undefined)).toBe(false);

    // @ts-expect-error
    expect(P.isSet(typeof shooBadoo)).toBe(false);

    expect(P.isSet(NaN)).toBe(true);
    expect(P.isSet(0)).toBe(true);
    expect(P.isSet(false)).toBe(true);
    expect(P.isSet("")).toBe(true);
    expect(P.isSet({})).toBe(true);
  });
});
