import { sort } from "@auaust/primitive-kit/arrays";

import { expect } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

test("sort() works", () => {
  const input = [3, 1, 2];
  const output = sort(input);

  expect(input).toEqual([1, 2, 3]);
  expect(output).toBe(input);

  type Test = Expect<Equal<typeof output, number[]>>;

  // @ts-expect-error
  expect(() => sort({})).toThrow(TypeError);
});
