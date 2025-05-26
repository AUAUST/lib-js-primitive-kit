import { P } from "@auaust/primitive-kit";

import { describe, expect, it } from "vitest";

describe("P() static class", () => {
  it("should be callable without new", () => {
    expect(P()).toBe(null);
    expect(P(1)).toBe(1);
    expect(P("foo")).toBe("foo");
    expect(P(0)).toBe(0);
    expect(P(false)).toBe(false);
    expect(P(null)).toBe(null);
    expect(P(undefined)).toBe(null);
    expect(P({})).toEqual(undefined);
    expect(P([])).toEqual(undefined);
    expect(P(new String("foo"))).toEqual("foo");
    expect(P(new Number(0))).toEqual(0);
    expect(P(new Boolean(false))).toEqual(false);
  });
});
