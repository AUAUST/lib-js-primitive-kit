import { mapArguments } from "@auaust/primitive-kit/functions";

import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("mapArguments()", () => {
  const base = (string: string, number: number) => ({
    foo: string,
    bar: number,
  });

  it("maps the public arguments to the wrapped function's arguments", () => {
    const mapped = mapArguments(
      base,
      (value: { string: string; number: number }) =>
        [value.string, value.number] as const,
    );

    const result = mapped({ string: "12", number: 3 });

    type Tests = [
      Expect<
        Equal<
          Parameters<typeof mapped>,
          [value: { string: string; number: number }]
        >
      >,
      Expect<Equal<typeof result, { foo: string; bar: number }>>,
    ];

    expect(result).toEqual({ foo: "12", bar: 3 });
  });

  it("rejects mapper output that cannot be passed to the wrapped function", () => {
    mapArguments(
      base,
      // @ts-expect-error A boolean cannot be passed as either base argument.
      (value: boolean) => [value, value],
    );
  });

  it("does not hide untyped mapper arguments behind contextual any", () => {
    mapArguments(
      base,
      // @ts-expect-error Destructured mapper inputs need an explicit type.
      ({ string, number }) => [string, number],
    );
  });
});
