import { splitFirst } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("splitFirst()", () => {
  it("should work", () => {
    expect(splitFirst("foo", "f")).toEqual(["", "oo"]);
    expect(splitFirst("foo:bar:baz", ":")).toEqual(["foo", "bar:baz"]);
    expect(splitFirst("foo:--:baz:--:", ":--:")).toEqual(["foo", "baz:--:"]);
    expect(splitFirst("foo", "a")).toEqual(["foo", ""]);

    // Examples from the documentation so they better not fail
    expect(splitFirst("a.b.c.d.e", ".")).toEqual(["a", "b.c.d.e"]);
    expect(splitFirst("a.b.c.d.e", "-")).toEqual(["a.b.c.d.e", ""]);
  });
});
