import { collapse } from "@auaust/primitive-kit/arrays";

import { expect } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

test("collapse() works", () => {
  const input = [undefined, null, , 1 as const, , , 2 as const, 3 as const];
  const output = collapse(input);

  expect(input).toEqual([undefined, null, 1, 2, 3]);
  expect(output).toBe(input);

  type Test = Expect<Equal<typeof output, (1 | 2 | 3 | undefined | null)[]>>;

  expect(() => collapse(<any>new Set([]))).toThrow(TypeError);
});
