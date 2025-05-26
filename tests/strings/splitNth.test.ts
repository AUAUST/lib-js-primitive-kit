import { splitNth } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("splitNth()", () => {
  it("should be 0-base indexed", () => {
    expect(splitNth("foo:bar:baz", ":", 0)).toEqual(["foo", "bar:baz"]);
    expect(splitNth("foo:bar:baz", ":", 1)).toEqual(["foo:bar", "baz"]);
  });

  it("should lookup from the end for negative idnex", () => {
    expect(splitNth("foo:bar:baz", ":", -1)).toEqual(["foo:bar", "baz"]);
    expect(splitNth("foo:bar:baz", ":", -2)).toEqual(["foo", "bar:baz"]);
  });

  it("should return the whole string if the separator is not found", () => {
    expect(splitNth("foo", "a", 0)).toEqual(["foo", ""]);
    expect(splitNth("foo", "a", -1)).toEqual(["foo", ""]);
  });

  it("should return the whole string if the index is out of bounds", () => {
    expect(splitNth("foo:bar:baz", ":", 2)).toEqual(["foo:bar:baz", ""]);
    expect(splitNth("foo:bar:baz", ":", 3)).toEqual(["foo:bar:baz", ""]);
    expect(splitNth("foo:bar:baz", ":", -3)).toEqual(["foo:bar:baz", ""]);
  });

  it("should support support separators with length > 1", () => {
    expect(splitNth("foo:--:baz:--:bar", ":--:", 1)).toEqual([
      "foo:--:baz",
      "bar",
    ]);

    expect(splitNth("foo:--:baz:--:bar", ":--:", -1)).toEqual([
      "foo:--:baz",
      "bar",
    ]);
  });
});
