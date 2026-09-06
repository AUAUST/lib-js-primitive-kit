import { A, S } from "@auaust/primitive-kit";
import type { Equal, Expect } from "type-testing";
import { describe, expect, it } from "vitest";

describe("facade instances", () => {
  it("preserves the constructed value type", () => {
    const string = new S("foo");
    const array = new A(["foo", 1]);

    type StringValue = Expect<Equal<typeof string.value, "foo">>;
    type ArrayValue = Expect<Equal<typeof array.value, ["foo", 1]>>;

    expect(string.value).toBe("foo");
    expect(array.value).toEqual(["foo", 1]);
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
