import { ensureEnd } from "@auaust/primitive-kit/strings";

import { expect, test } from "vitest";

test("ensureEnd() works", () => {
  expect(ensureEnd("foo", "o")).toBe("foo");

  expect(ensureEnd("f", "oo")).toBe("foo");

  expect(ensureEnd("Hi!", " - THIS WAS AN IMPORTANT MESSAGE")).toBe(
    "Hi! - THIS WAS AN IMPORTANT MESSAGE",
  );
});
