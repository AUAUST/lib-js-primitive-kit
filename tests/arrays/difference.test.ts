import { difference } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("difference() works", () => {
  const a = [1, 2, 3, 4, "5"];

  const b = [3, 4, 5, 6, 7];

  const output = difference(a, b);

  expect(output).toEqual([1, 2, "5"]);
  expect(output).not.toBe(a);
  expect(output).not.toBe(b);

  type Test = Expect<Equal<typeof output, (number | string)[]>>;
});
