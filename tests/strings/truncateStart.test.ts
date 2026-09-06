import { truncateStart } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

test("truncateStart() works", () => {
  expect(truncateStart("foo", 3)).toBe("foo");
  expect(truncateStart("foo", 2)).toBe("oo");
  expect(truncateStart("foo", 3, "...")).toBe("foo");
  expect(truncateStart("aaaaaaaaaaaaaaa", 5, "...")).toBe("...aa");
  expect(truncateStart("aaaaaaaaaaaaaaa", 5, "…")).toBe("…aaaa");

  expect(() => truncateStart("foo", 2, "....")).toThrow(RangeError);
});
