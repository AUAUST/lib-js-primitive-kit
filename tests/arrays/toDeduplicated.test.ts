import { toDeduplicated } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("toDeduplicated() works", () => {
  const input = [1, 2, 3, 3, 2, 1];

  const output = toDeduplicated(input);

  expect(output).toEqual([1, 2, 3]);

  expect(output).not.toBe(input);

  type Test = Expect<Equal<typeof output, number[]>>;
});
