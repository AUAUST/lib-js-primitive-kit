import { B } from "~/Boolean";

import { describe, expect, test } from "@jest/globals";

describe("B class", () => {
  test("called as a function works", () => {
    [
      "",
      new String(""),
      0,
      new Number(0),
      {},
      [],
      null,
      undefined,
      "false",
      "true",
    ].forEach((x) => {
      expect(B(x)).toBe(B.from(x));
    });
  });

  test("conversion to boolean works", () => {
    // Unlike the original conversion, B.from() converts object variants of primitives
    // according to their primitive value instead of returning `true` every time.
    [new String(""), new Number(0), new Boolean(false)].forEach((x) => {
      expect(B.from(x)).toBe(false);
    });

    // All the other values are converted using Boolean().
    ["", 0, false, "false", "0", " \r\n", null, undefined, NaN].forEach((x) => {
      expect(B.from(x)).toBe(false);
    });

    [
      new String("foo"),
      new Number(1),
      new Boolean(true),
      "foo",
      1,
      {},
      [],
    ].forEach((x) => {
      expect(B.from(x)).toBe(true);
    });
  });

  test("normal typecheck works", () => {
    expect(B.is(true)).toBe(true);
    expect(B.is(false)).toBe(true);

    // Other types should fail the check.
    ["", new String(""), 0, new Number(0), {}, [], null, undefined].forEach(
      (x) => {
        expect(B.is(x)).toBe(false);
      }
    );
  });

  test("loose typecheck works", () => {
    expect(B.isLoose(true)).toBe(true);
    expect(B.isLoose(false)).toBe(true);
    expect(B.isLoose("True")).toBe(true);
    expect(B.isLoose("False")).toBe(true);
    expect(B.isLoose(1)).toBe(true);
    expect(B.isLoose(0)).toBe(true);
    expect(B.isLoose(new Boolean(true))).toBe(true);

    // Other types should fail the check.
    ["", new String("Foo"), 31, 1.1, {}, [], null, undefined].forEach((x) => {
      expect(B.isLoose(x)).toBe(false);
    });
  });

  test("equals() works", () => {
    expect(B.equals(true, true)).toBe(true);
    expect(B.equals(true, false)).toBe(false);

    expect(B.equals("true", true)).toBe(true);
    expect(B.equals("true", false)).toBe(false);
    expect(B.equals("false", new Boolean(false))).toBe(true);

    expect(B.equals("", new String("false"))).toBe(true);
  });

  test("logical AND works", () => {
    expect(B.and(true, true)).toBe(true);
    expect(B.and(true, false)).toBe(false);
    expect(B.and(false, true)).toBe(false);
    expect(B.and(false, false)).toBe(false);

    // "false" being a string would usually be converted to `true` by the original conversion.
    // By enabling B's custom conversion (third argument as true), it is converted to `false` instead thus the expected result is `false`.
    expect(B.and("false", true, true)).toBe(false);
  });

  test("logical OR works", () => {
    expect(B.or(true, true)).toBe(true);
    expect(B.or(true, false)).toBe(true);
    expect(B.or(false, true)).toBe(true);
    expect(B.or(false, false)).toBe(false);

    expect(B.or("false", false, true)).toBe(false);
  });

  test("logical NOT works", () => {
    expect(B.not(true)).toBe(false);
    expect(B.not(false)).toBe(true);

    expect(B.not("false", true)).toBe(true);
  });

  test("logical XOR works", () => {
    expect(B.xor(true, true)).toBe(false);
    expect(B.xor(true, false)).toBe(true);
    expect(B.xor(false, true)).toBe(true);
    expect(B.xor(false, false)).toBe(false);

    expect(B.xor("false", false, true)).toBe(false);
  });

  test("logical XNOR works", () => {
    expect(B.xnor(true, true)).toBe(true);
    expect(B.xnor(true, false)).toBe(false);
    expect(B.xnor(false, true)).toBe(false);
    expect(B.xnor(false, false)).toBe(true);

    expect(B.xnor("false", false, true)).toBe(true);
  });

  test("logical NAND works", () => {
    expect(B.nand(true, true)).toBe(false);
    expect(B.nand(true, false)).toBe(true);
    expect(B.nand(false, true)).toBe(true);
    expect(B.nand(false, false)).toBe(true);

    expect(B.nand("false", true, true)).toBe(true);
  });

  test("logical NOR works", () => {
    expect(B.nor(true, true)).toBe(false);
    expect(B.nor(true, false)).toBe(false);
    expect(B.nor(false, true)).toBe(false);
    expect(B.nor(false, false)).toBe(true);

    expect(B.nor("false", true, true)).toBe(false);
  });

  test("logical XNOR works", () => {
    expect(B.xnor(true, true)).toBe(true);
    expect(B.xnor(true, false)).toBe(false);
    expect(B.xnor(false, true)).toBe(false);
    expect(B.xnor(false, false)).toBe(true);

    expect(B.xnor("false", false, true)).toBe(true);
  });

  test("all() works", () => {
    expect(B.all([true])).toBe(true);
    expect(B.all([true, true])).toBe(true);
    expect(B.all([true, true, false])).toBe(false);
    expect(B.all([true, true, "false"])).toBe(true);
    expect(B.all([true, true, "false"], true)).toBe(false);
  });

  test("any() works", () => {
    expect(B.any([false])).toBe(false);
    expect(B.any([false, false])).toBe(false);
    expect(B.any([false, false, true])).toBe(true);
    expect(B.any([false, false, "false"])).toBe(true);
    expect(B.any([false, false, "false"], true)).toBe(false);
  });

  test("none() works", () => {
    expect(B.none([false])).toBe(true);
    expect(B.none([false, false])).toBe(true);
    expect(B.none([false, false, true])).toBe(false);
    expect(B.none([false, false, "false"])).toBe(false);
    expect(B.none([false, false, "false"], true)).toBe(true);
  });

  test("anyFalse() works", () => {
    expect(B.anyFalse([true])).toBe(false);
    expect(B.anyFalse([true, true])).toBe(false);
    expect(B.anyFalse([true, true, false])).toBe(true);
    expect(B.anyFalse([true, true, "false"])).toBe(false);
    expect(B.anyFalse([true, true, "false"], true)).toBe(true);
  });
});
