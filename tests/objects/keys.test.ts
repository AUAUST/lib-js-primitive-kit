import { keys } from "@auaust/primitive-kit/objects";
import { Equal, Expect } from "type-testing";

import { describe, expect, it } from "vitest";

describe("keys()", () => {
  it("should work", () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);

    expect(keys(["foo"])).toEqual([0]);

    {
      const k = keys([]);

      expect(k).toEqual([]);

      type Test = Expect<Equal<typeof k, number[]>>;
    }

    {
      const k = keys({});

      expect(k).toEqual([]);

      type Test = Expect<Equal<typeof k, string[]>>;
    }

    {
      const k = keys({ foo: "bar" });

      expect(k).toEqual(["foo"]);

      type Test = Expect<Equal<typeof k, "foo"[]>>;
    }

    {
      const k = keys({ foo: "bar", bar: "baz" });

      expect(k).toEqual(["foo", "bar"]);

      type Test = Expect<Equal<typeof k, ("foo" | "bar")[]>>;
    }
  });

  it("should return the correct keys for an object", () => {
    const obj = { a: 1, b: 2, c: 3 };

    expect(keys(obj)).toEqual(["a", "b", "c"]);
  });

  it("should return the correct keys for an array", () => {
    const arr = [1, 2, 3];

    expect(keys(arr)).toEqual([0, 1, 2]);
  });

  it("should return an empty array for null or undefined", () => {
    expect(keys(null as null | [] | {})).toEqual([]);
    expect(keys(undefined)).toEqual([]);
  });
});
