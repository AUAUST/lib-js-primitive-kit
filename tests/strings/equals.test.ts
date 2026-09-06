import { equals } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

test("equals() works with various string features", () => {
  expect(equals("foo", "foo")).toBe(true);
  expect(equals("foo", "bar")).toBe(false);
  expect(equals("foo", "FOO")).toBe(true);
  expect(equals("foo", "FOO", { caseSensitive: true })).toBe(false);
  expect(equals(" foo ", "foo")).toBe(false);
  expect(equals(" foo ", "foo", { trim: true })).toBe(true);
  expect(equals("héllo, fiou", "hello, ﬁou")).toBe(false);
  expect(equals("héllo, fiou", "hello, ﬁou", { unaccent: true })).toBe(true);
  expect(equals("", "")).toBe(true);
  expect(equals(null, null)).toBe(true); // converted to ""
  expect(equals("foo", null)).toBe(false);
});
