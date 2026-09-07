import { mapReturn } from "@auaust/primitive-kit/functions";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("mapReturn()", () => {
  const base = (string: string, number: number) => ({
    foo: string,
    bar: number,
  });

  it("maps the wrapped function's return value", () => {
    const mapped = mapReturn(base, (value) => `${value.foo}:${value.bar}`);

    const result = mapped("12", 3);

    type Tests = [
      Expect<
        Equal<Parameters<typeof mapped>, [string: string, number: number]>
      >,
      Expect<Equal<typeof result, `${string}:${number}`>>,
    ];

    expect(result).toBe("12:3");
  });

  it("contextually types the mapper value", () => {
    mapReturn(base, (value) => {
      type Test = Expect<Equal<typeof value, { foo: string; bar: number }>>;

      return value.foo;
    });
  });
});
