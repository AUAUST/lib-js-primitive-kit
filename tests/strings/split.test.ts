import { split } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("split()", () => {
  it("should work", () => {
    expect(split("a.b.c.d.e", ".")).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("should return the whole string if the separator is not found", () => {
    expect(split("foo", "a")).toEqual(["foo"]);
    expect(split("foo:bar:baz", "x")).toEqual(["foo:bar:baz"]);
  });

  it("should split each character if no separator is provided", () => {
    expect(split("foo")).toEqual(["f", "o", "o"]);
    expect(split("a.b.c.d.e")).toEqual([
      "a",
      ".",
      "b",
      ".",
      "c",
      ".",
      "d",
      ".",
      "e",
    ]);
  });

  it("should return the whole string if the limit is 1", () => {
    expect(split("a.b.c.d.e", ".", 1)).toEqual(["a.b.c.d.e"]);
  });

  it("should limit the number of parts if a limit is provided, leaving the rest as the last part", () => {
    expect(split("a.b.c.d.e", ".", 2)).toEqual(["a", "b.c.d.e"]);
    expect(split("a.b.c.d.e", ".", 3)).toEqual(["a", "b", "c.d.e"]);
    expect(split("a.b.c.d.e", ".", 4)).toEqual(["a", "b", "c", "d.e"]);
  });

  it("should ignore limits bigger than the number of parts", () => {
    expect(split("a.b.c.d.e", ".", 9999)).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("should handle a limit of 0 or less as no limit", () => {
    expect(split("a.b.c.d.e", ".", 0)).toEqual(["a", "b", "c", "d", "e"]);
    expect(split("a.b.c.d.e", ".", -1)).toEqual(["a", "b", "c", "d", "e"]);
  });
});
