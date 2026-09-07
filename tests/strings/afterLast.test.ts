import { afterLast } from "@auaust/primitive-kit/strings";

import { expect, test } from "vitest";

test("afterLast() works", () => {
  expect(afterLast("foo", "f")).toBe("oo");

  expect(afterLast("foo", "o")).toBe("");

  expect(afterLast("foo", "oo")).toBe("");

  expect(afterLast("foo", "a")).toBe("");

  expect(afterLast("foo bar foo", "foo")).toBe("");
});
