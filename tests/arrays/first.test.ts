import { first } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("first() works", () => {
  {
    const input = [1, 2, 3];

    const output = first(input);
    expect(output).toBe(1);
    type Test = Expect<Equal<typeof output, number>>;
  }
  {
    const input = [, , , 1, , , 2, 3];

    const output = first(input);
    expect(output).toBe(1);
    type Test = Expect<Equal<typeof output, number | undefined>>;
  }
  {
    const input = [, , , , , , , ,] as const;

    const output = first(input);
    expect(output).toBe(undefined);
    type Test = Expect<Equal<typeof output, undefined>>;
  }
  {
    const input: [] = [] as const;

    const output = first(input);
    expect(output).toBe(undefined);
    type Test = Expect<Equal<typeof output, unknown>>;
  }
});
