import { A, B, F, N, O, P, S } from "@auaust/primitive-kit";
import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("facade instances", () => {
  it("preserves the constructed value type", () => {
    const array = new A(["foo", 1]);
    const iterable = new A(new Set([1, 2] as const));
    const boolean = new B(0);
    const fn = new F("result");
    const number = new N(null);
    const object = new O("foo");
    const primitive = new P(new String("foo"));
    const string = new S("foo");
    const numericString = new S(123);
    const empty = new S(null);
    const custom = new S({ toString: () => "custom" as const });
    const unknownValue: unknown = { anything: true };
    const unknown = new S(unknownValue);

    type ArrayValue = Expect<Equal<typeof array.value, ["foo", 1]>>;
    type IterableValue = Expect<Equal<typeof iterable.value, (1 | 2)[]>>;
    type BooleanValue = Expect<Equal<typeof boolean.value, false>>;
    type FunctionValue = Expect<Equal<typeof fn.value, () => "result">>;
    type NumberValue = Expect<Equal<typeof number.value, 0>>;
    type ObjectValue = Expect<Equal<typeof object.value, String>>;
    type PrimitiveValue = Expect<Equal<typeof primitive.value, string>>;
    type StringValue = Expect<Equal<typeof string.value, "foo">>;
    type NumericStringValue = Expect<
      Equal<typeof numericString.value, "123">
    >;
    type EmptyValue = Expect<Equal<typeof empty.value, "">>;
    type CustomValue = Expect<Equal<typeof custom.value, "custom">>;
    type UnknownValue = Expect<Equal<typeof unknown.value, string>>;

    expect(array.value).toEqual(["foo", 1]);
    expect(iterable.value).toEqual([1, 2]);
    expect(boolean.value).toBe(false);
    expect(fn.value()).toBe("result");
    expect(number.value).toBe(0);
    expect(object.value).toEqual(new String("foo"));
    expect(primitive.value).toBe("foo");
    expect(string.value).toBe("foo");
    expect(numericString.value).toBe("123");
    expect(empty.value).toBe("");
    expect(custom.value).toBe("custom");
    expect(unknown.value).toBe("[object Object]");
  });

  it("chains instance-callable helpers with their precise result", () => {
    const result = new S("foo").upper();

    type Result = Expect<Equal<typeof result.value, "FOO">>;

    expect(result).toBeInstanceOf(S);
    expect(result.value).toBe("FOO");
    expect(String(result)).toBe("FOO");
  });

  it("keeps the facade's callable behavior", () => {
    expect(S(123)).toBe("123");
    expect(A(new Set([1, 2]))).toEqual([1, 2]);
  });
});
