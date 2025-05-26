import { toPrimitive } from "@auaust/primitive-kit/primitives";

import { describe, expect, it } from "vitest";

describe("toPrimitive()", () => {
  it("should work", () => {
    expect(toPrimitive("foo")).toBe("foo");
    expect(toPrimitive(0)).toBe(0);
    expect(toPrimitive(false)).toBe(false);
    expect(toPrimitive(null)).toBe(null);
    expect(toPrimitive(undefined)).toBe(null);
    expect(toPrimitive(BigInt(0))).toBe("0n");
    expect(toPrimitive(BigInt(109283))).toBe("109283n");

    expect(toPrimitive({ [Symbol.toPrimitive]: () => "foo" })).toBe("foo");
    expect(toPrimitive({ valueOf: () => 12 })).toBe(12);
    expect(toPrimitive({ toString: () => "Hello" })).toBe("Hello");

    expect(toPrimitive({})).toBe(undefined);
    expect(toPrimitive(Object.create(null))).toBe(undefined);
    expect(toPrimitive(() => {})).toEqual(undefined);

    expect(toPrimitive([])).toEqual(undefined);
    expect(toPrimitive([1, 2, 3])).toEqual(undefined);
    expect(toPrimitive([1, new Date(), {}, []])).toEqual(undefined);
    expect(toPrimitive(console.log)).toEqual(undefined);
    expect(toPrimitive(Symbol())).toEqual(undefined);

    expect(toPrimitive(new String("foo"))).toBe("foo");
    expect(toPrimitive(new Number(0))).toBe(0);
    expect(toPrimitive(new Boolean(false))).toBe(false);

    const now = new Date();

    expect(toPrimitive(now, "number")).toBe(now.getTime());
    expect(toPrimitive(now, "string")).toBe(now.toString());
    expect(() => toPrimitive(now, "boolean")).toThrow(TypeError);
  });
});
