import { afterFirst } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

test("afterFirst() works", () => {
  expect(afterFirst("foo", "f")).toBe("oo");
  expect(afterFirst("foo", "o")).toBe("o");
  expect(afterFirst("foo", "oo")).toBe("");
  expect(afterFirst("foo", "a")).toBe("");
  expect(afterFirst("foo bar foo", "foo")).toBe(" bar foo");
});
