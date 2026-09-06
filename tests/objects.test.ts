import { O } from "@auaust/primitive-kit";

import { describe, expect, test } from "vitest";

describe("The O class", () => {
  test("exposes static methods", () => {
    expect(O.from).toBeTypeOf("function");
    expect(O.isStrict).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const o = new O({ foo: "bar" });

    expect(o).toBeInstanceOf(O);
  });

  test("has a static make() method that returns an instance of O", () => {
    const o = O.make({ foo: "bar" });

    expect(o).toBeInstanceOf(O);
  });

  test("has a static from() method that converts a value to a record", () => {
    const o = O.from([1, 2, 3]);

    expect(o).toEqual({ "0": 1, "1": 2, "2": 3 });
  });

  test("can be called as a function to create a record", () => {
    const o = O([1, 2, 3]);

    expect(o).toEqual({ "0": 1, "1": 2, "2": 3 });
  });
});
