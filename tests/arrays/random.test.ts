import { random } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("random()", () => {
  it("should work", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const output = random(input);

    expect(input).toContain(output);

    type Test = Expect<Equal<typeof output, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>>;
  });
});
