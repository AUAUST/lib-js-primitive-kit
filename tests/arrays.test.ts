import { A, O } from "@auaust/primitive-kit";

import type { Equal, Expect, NotEqual } from "type-testing";
import { describe, expect, test } from "vitest";

describe("A class", () => {
  test("called as a function works", () => {
    {
      const a = A([1, 2, 3]);
      type Test = Expect<Equal<typeof a, number[]>>;
      expect(a).toEqual([1, 2, 3]);
    }

    {
      const a = A({ length: 3 });
      type Test = Expect<Equal<typeof a, unknown[]>>;
      expect(a).toEqual([, , ,]);
    }

    {
      const a = A(null as unknown as NodeListOf<Element>);
      type Test = Expect<Equal<typeof a, Element[]>>;
      expect(a).toEqual([]);
    }
  });
});
