import { toCollapsed } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("toCollapsed() works", () => {
  const input = [undefined, null, , 1, , , 2, 3] as const;

  const output = toCollapsed(input);

  expect(output).toEqual([undefined, null, 1, 2, 3]);

  expect(output).not.toBe(input);

  type Test = Expect<Equal<typeof output, (1 | 2 | 3 | undefined | null)[]>>;
});
