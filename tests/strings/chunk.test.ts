// @ts-nocheck
// // import { chunk } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe(
  "chunk()",
  {
    todo: true,
  },
  () => {
    it("should split a string into chunks of the specified size", () => {
      expect(chunk("hello", 2)).toEqual(["he", "ll", "o"]);
      expect(chunk("helloworld", 3)).toEqual(["hel", "low", "orl", "d"]);
      expect(chunk("helloworld", 1)).toEqual([
        "h",
        "e",
        "l",
        "l",
        "o",
        "w",
        "o",
        "r",
        "l",
        "d",
      ]);
      expect(chunk("helloworld", 10)).toEqual(["helloworld"]);
    });

    it("should return an empty array for an empty string", () => {
      expect(chunk("", 2)).toEqual([]);
    });

    it("should return an array of one chunk for a missing or 0 size", () => {
      expect(chunk("hello", 0)).toEqual(["hello"]);
      expect(chunk("hello", undefined!)).toEqual(["hello"]);
    });

    it("should chunk from the end if size is negative", () => {
      expect(chunk("hello", -2)).toEqual(["h", "el", "lo"]);
      expect(chunk("1000000000", -3)).toEqual(["1", "000", "000", "000"]);
    });

    it("should offset the start of the chunking by the provided offset", () => {
      expect(chunk("xxhelloworld", 5, 2)).toEqual(["hello", "world"]);
      expect(chunk("xxhelloworld", 3, 2)).toEqual(["hel", "low", "rld"]);
      expect(chunk("helloworld", 1, -5)).toEqual(["w", "o", "r", "l", "d"]);
      expect(chunk("helloworld", -1, -5)).toEqual(["h", "e", "l", "l", "o"]);
    });
  }
);
