import { realLength } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("realLength() works", () => {
  {
    const input = [1, 2, 3, 4];

    const output = realLength(input);
    expect(output).toBe(4);
    type Test = Expect<Equal<typeof output, number>>;
  }
  {
    const input = [, , , 1, , , 2, 3];

    const output = realLength(input);
    expect(output).toBe(3);
    type Test = Expect<Equal<typeof output, number>>;
  }
});
