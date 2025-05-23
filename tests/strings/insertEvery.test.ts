// @ts-nocheck
// import { insertEvery } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe(
  "insertEvery()",
  {
    todo: true,
  },
  () => {
    it("should insert a substring every character by default", () => {
      expect(insertEvery("hello", " ")).toBe("h e l l o");
    });

    it("should insert a substring every n characters", () => {
      expect(insertEvery("hello", " ", 2)).toBe("he ll o");
      expect(insertEvery("helloworld", " ", 5)).toBe("hello world");
      expect(insertEvery("helloworld", " ", 1)).toBe("h e l l o w o r l d");
      expect(insertEvery("ooooooooo", "-x-", 2)).toBe("oo-x-oo-x-oo-x-oo-x-o");
    });

    it("should insert from the end if index is negative", () => {
      expect(insertEvery("hello", " ", -2)).toBe("h el lo");
      expect(insertEvery("1000000000", "_", -3)).toBe("1_000_000_000");
    });

    it("should not insert if index is 0", () => {
      expect(insertEvery("hello", " ", 0)).toBe("hello");
      expect(insertEvery("helloworld", " ", 0)).toBe("helloworld");
    });

    it("should start inserting at the provided offset", () => {
      expect(insertEvery("xxhelloworldhelloworld", " ", 5, 2)).toBe(
        "xx hello world hello world"
      );
      expect(insertEvery("000000000", "_", 1, -3)).toBe("0000000_0_0");
      expect(insertEvery("000000000", "_", -1, -5)).toBe("0_0_0_0_0_0000");
    });
  }
);
