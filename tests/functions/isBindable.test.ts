import { isBindable, isBound } from "@auaust/primitive-kit/functions";

import { describe, expect, test } from "vitest";

describe("isBindable() and isBound()", () => {
  test.each([
    function () {}.bind({}),
    async function () {}.bind({}),
    function* () {}.bind({}),
    async function* () {}.bind({}),
    () => {},

    // Edge cases: these functions do not have a prototype,
    // thus are detected as bound even though they are not.
    async function () {},
    { foo() {} }.foo,
  ])("should detect functions as bound", (fn) => {
    expect(isBound(fn)).toBe(true);
    expect(isBindable(fn)).toBe(false);
  });

  test.each([function () {}, function* () {}, async function* () {}])(
    "should detect functions as bindable",
    (fn) => {
      expect(isBound(fn)).toBe(false);
      expect(isBindable(fn)).toBe(true);
    }
  );
});
