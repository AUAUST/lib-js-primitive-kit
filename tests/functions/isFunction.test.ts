import { isFunction, isNotFunction } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isFunction()", () => {
  it("should work", () => {
    const functions = [
      () => {},
      function () {},
      async () => {},
      function* () {},
      class {},
    ];

    const notFunctions = [
      "",
      new String(""),
      0,
      new Number(0),
      true,
      new Boolean(false),
      {},
      [],
      null,
      undefined,
      Symbol(),
    ];

    for (const fn of functions) {
      expect(isFunction(fn)).toBe(true);
      expect(isNotFunction(fn)).toBe(false);
    }

    for (const fn of notFunctions) {
      expect(isFunction(fn)).toBe(false);
      expect(isNotFunction(fn)).toBe(true);
    }
  });
});
