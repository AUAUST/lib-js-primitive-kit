import { F, f } from "@auaust/primitive-kit";

import type { Equal, Expect } from "type-testing";
import { describe, expect, test } from "vitest";

describe("The F class", () => {
  test("exposes static methods", () => {
    expect(F).toBeTypeOf("function");
  });

  test("can be instantiated", () => {
    const f = new F(null);

    expect(f).toBeInstanceOf(F);
  });

  test("has a static make() method that returns an instance of F", () => {
    const f = F.make(null);

    expect(f).toBeInstanceOf(F);
  });

  test("has a static from() method that converts a value to a function", () => {
    const f = F.from(null);

    expect(f).toBeTypeOf("function");
  });

  test("can be called as a function to create a function", () => {
    const f = F(null);

    expect(f).toBeTypeOf("function");
  });
});

describe("F instances", () => {
  test("can be called as a function", () => {
    const made = F.make(() => 1 as const);
    const created = f(() => 1 as const);
    const madeResult = made();
    const createdResult = created();

    type Tests = [
      Expect<Equal<typeof madeResult, 1>>,
      Expect<Equal<typeof createdResult, 1>>,
    ];

    expect(made).toBeTypeOf("function");
    expect(created).toBeTypeOf("function");
    expect(madeResult).toBe(1);
    expect(createdResult).toBe(1);
  });

  test("support chaining", () => {
    const mapped = f((num: number) => num - 1)
      .mapArguments((value: string) => [
        Number(value.replace("A", "1").replace("B", "2")),
      ])
      .mapReturn((value) => value * 2);
    const result = mapped("AB");

    type Test = Expect<Equal<typeof result, number>>;

    expect(result).toBe(22);
  });

  test("preserves the wrapped function's call-time this", () => {
    const fn = f(function (this: { value: number }, add: number) {
      return this.value + add;
    });

    expect(fn.call({ value: 2 }, 3)).toBe(5);
  });
});
