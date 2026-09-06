import { endsWith } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

test("endsWith() works", () => {
  // Basic usage
  expect(endsWith("foo", "o")).toBe(true);
  expect(endsWith("foobar", "bar")).toBe(true);
  expect(endsWith("foo", "bar")).toBe(false);

  // Case sensitivity
  expect(endsWith("foo", "O")).toBe(false);
  expect(endsWith("foo", "O", { caseSensitive: false })).toBe(true);

  // Trimming
  expect(endsWith("foo ", " o ")).toBe(false);
  expect(endsWith("foo ", " o ", { trim: true })).toBe(false);
  expect(endsWith("foo ", "o ", { trim: true })).toBe(true);
  expect(endsWith("foo o ", " o ", { trim: true })).toBe(true);

  // Unaccent
  expect(endsWith("héllo, fiou", "ﬁou")).toBe(false);
  expect(endsWith("héllo, fiou", "ﬁou", { unaccent: true })).toBe(true);

  expect(endsWith("foo", "")).toBe(true);
  expect(endsWith("", "foo")).toBe(false);
});
