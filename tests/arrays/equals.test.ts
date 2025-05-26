import { equals } from "@auaust/primitive-kit/arrays";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("equals()", () => {
  it("should first compare by reference", () => {
    const array = [1, 2, 3];

    expect(equals(array, array)).toBe(true);

    const object = {};

    // @ts-expect-error
    expect(equals(object, object)).toBe(true);
    // @ts-expect-error
    expect(equals("foo", "foo")).toBe(true);
  });

  it("should not compare different references that are not arrays", () => {
    // @ts-expect-error
    expect(equals({}, {})).toBe(false);
  });

  it("should compare by length and value", () => {
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(equals([1, 2, 3, 4], [1, 2, 3])).toBe(false);
    expect(equals([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });

  it("should compare recursively if specified", () => {
    expect(equals([1, 2, [3, 4]], [1, 2, [3, 4]])).toBe(false);
    expect(equals([1, 2, [3, 4]], [1, 2, [3, 4]], true)).toBe(true);
  });

  it("should not compare non-iterables", () => {
    expect(equals([{}], [{}])).toBe(false);
    expect(equals([{}], [{}], true)).toBe(false);
  });

  {
    const array1 = [1, "foo", { hello: "world" }] as const;
    const array2 = [] as unknown;

    if (equals(array1, array2)) {
      type Tests = [
        Expect<Equal<(typeof array2)[0], 1>>,
        Expect<Equal<(typeof array2)[2], { hello: "world" }>>
      ];
    }
  }
});
