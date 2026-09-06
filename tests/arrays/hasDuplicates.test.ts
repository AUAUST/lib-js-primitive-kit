import { hasDuplicates } from "@auaust/primitive-kit/arrays";

import { expect } from "vitest";
import { test } from "vitest";

test("hasDuplicates() works", () => {
  expect(hasDuplicates([1, 2, 3])).toBe(false);
  expect(hasDuplicates([1, 2, 3, 3])).toBe(true);
});
