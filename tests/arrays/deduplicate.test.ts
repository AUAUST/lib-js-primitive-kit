import { deduplicate } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("deduplicate() works", () => {
  const input = [1, 2, 3, 3, 2, 1];

  const output = deduplicate(input);

  expect(input).toEqual([1, 2, 3]);

  expect(output).toBe(input);

  type Test = Expect<Equal<typeof output, number[]>>;

  // @ts-expect-error
  expect(() => deduplicate({})).toThrow(TypeError);
});
