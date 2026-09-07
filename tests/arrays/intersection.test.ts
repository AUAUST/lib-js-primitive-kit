import { intersection } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("intersection() works", () => {
  const a = [1, 2, 3, 4, "5"];

  const b = [3, 4, 5, 6, 7];

  const output = intersection(a, b);

  expect(output).toEqual([3, 4]);

  expect(output).not.toBe(a);

  expect(output).not.toBe(b);

  type Test = Expect<Equal<typeof output, (number | string)[]>>;
});
