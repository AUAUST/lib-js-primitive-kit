import { splitLast } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("splitLast()", () => {
  it("should work", () => {
    expect(splitLast("foo", "f")).toEqual(["", "oo"]);
    expect(splitLast("foo:bar:baz", ":")).toEqual(["foo:bar", "baz"]);
    expect(splitLast(":--:foo:--:baz", ":--:")).toEqual([":--:foo", "baz"]);
    expect(splitLast("foo", "a")).toEqual(["foo", ""]);

    // Examples from the documentation so they better not fail
    expect(splitLast("a.b.c.d.e", ".")).toEqual(["a.b.c.d", "e"]);
    expect(splitLast("a.b.c.d.e", "-")).toEqual(["a.b.c.d.e", ""]);
  });
});
