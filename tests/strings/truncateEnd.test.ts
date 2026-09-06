import { truncateEnd } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

test("truncateEnd() works", () => {
  expect(truncateEnd("foo", 3)).toBe("foo");
  expect(truncateEnd("foo", 2)).toBe("fo");
  expect(truncateEnd("foo", 3, "...")).toBe("foo");
  expect(truncateEnd("aaaaaaaaaaaaaaa", 5, "...")).toBe("aa...");
  expect(truncateEnd("aaaaaaaaaaaaaaa", 5, "…")).toBe("aaaa…");

  expect(() => truncateEnd("foo", 2, "....")).toThrow(RangeError);
});
