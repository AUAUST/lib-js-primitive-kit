import { isSorted } from "@auaust/primitive-kit/arrays";

import { expect, test } from "vitest";

test("isSorted() works", () => {
  expect(isSorted([1, 2, 3])).toBe(true);

  expect(isSorted([3, 2, 1])).toBe(false);

  expect(isSorted([1, 1, 2])).toBe(true);

  expect(isSorted([1])).toBe(true);

  expect(isSorted([])).toBe(true);
});
