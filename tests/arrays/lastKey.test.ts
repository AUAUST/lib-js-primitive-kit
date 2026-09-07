import { lastKey } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("lastKey() works", () => {
  expect(lastKey([1, 2, 3])).toBe(2);
  expect(lastKey([1, , , 2, 3, , ,])).toBe(4);
  expect(lastKey([, , , , , , , ,])).toBe(undefined);
  expect(lastKey([])).toBe(undefined);

  // @ts-expect-error
  expect(() => lastKey({})).toThrow(TypeError);

  {
    const input = [1, 2, 3];
    const output = lastKey(input);
    expect(output).toBe(2);
    type Test = Expect<Equal<typeof output, number>>;
  }

  {
    const input = [1, , , 2, 3, , ,] as unknown[];
    const output = lastKey(input);
    expect(output).toBe(4);
    type Test = Expect<Equal<typeof output, number>>;
  }

  {
    const input = [, , , , , , , ,];
    const output = lastKey(input);
    expect(output).toBe(undefined);
    type Test = Expect<Equal<typeof output, number | undefined>>;
  }

  {
    const input: [] = [] as const;
    const output = lastKey(input);
    expect(output).toBe(undefined);
    type Test = Expect<Equal<typeof output, undefined | number>>;
  }
});
