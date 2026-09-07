import { s, S } from "@auaust/primitive-kit";
import { toUpperCase } from "@auaust/primitive-kit/strings";
import { expect, test } from "vitest";

test("entrypoints share the same references", () => {
  expect(toUpperCase).toBe(S.upper);

  expect(s("")).toBeInstanceOf(S);
});
