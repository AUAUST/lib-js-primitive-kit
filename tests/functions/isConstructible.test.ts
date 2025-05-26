import { isConstructible } from "@auaust/primitive-kit/functions";

import { describe, expect, it } from "vitest";

describe("isConstructible()", () => {
  it("should work", () => {
    const constructible = [class {}, function () {}];

    const notConstructible = [
      () => {},
      async () => {},
      function* () {},
      async function* () {},
      {},
      null,
      undefined,
      Symbol(),
    ];

    for (const fn of constructible) {
      expect(isConstructible(fn)).toBe(true);
    }

    for (const fn of notConstructible) {
      expect(isConstructible(fn)).toBe(false);
    }
  });
});
