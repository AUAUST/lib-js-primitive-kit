import { firstKey } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("firstKey() works", () => {
  expect(firstKey([1, 2, 3])).toBe(0);
  expect(firstKey([, , , 1, , , 2, 3])).toBe(3);
  expect(firstKey([, , , , , , , ,])).toBe(undefined);
  expect(firstKey([])).toBe(undefined);

  // @ts-expect-error
  expect(() => firstKey({})).toThrow(TypeError);

  {
    const input = [1, 2, 3];
    const output = firstKey(input);
    expect(output).toBe(0);
    type Test = Expect<Equal<typeof output, number>>;
  }

  {
    const input = [, , , 1, , , 2, 3] as unknown[];
    const output = firstKey(input);
    expect(output).toBe(3);
    type Test = Expect<Equal<typeof output, number>>;
  }

  {
    const input = [, , , , , , , ,];
    const output = firstKey(input);
    expect(output).toBe(undefined);
    type Test = Expect<Equal<typeof output, undefined | number>>;
  }

  {
    const input: [] = [] as const;
    const output = firstKey(input);
    expect(output).toBe(undefined);
    type Test = Expect<Equal<typeof output, undefined | number>>;
  }
});
