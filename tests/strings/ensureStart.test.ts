import { ensureStart } from "@auaust/primitive-kit/strings";

import { expect, test } from "vitest";

test("ensureStart() works", () => {
  expect(ensureStart("foo", "f")).toBe("foo");

  expect(ensureStart("oo", "f")).toBe("foo");

  expect(ensureStart("Hi!", "IMPORTANT MESSAGE: ")).toBe(
    "IMPORTANT MESSAGE: Hi!",
  );
});
