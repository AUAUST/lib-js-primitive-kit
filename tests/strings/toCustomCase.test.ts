import { toCustomCase } from "@auaust/primitive-kit/strings";

import { S } from "@auaust/primitive-kit";
import { expect, test } from "vitest";

test("toCustomCase() works", () => {
  expect(toCustomCase("foo bar", "_")).toBe("foo_bar");

  expect(toCustomCase("Foo-bar", " ")).toBe("Foo bar");

  expect(
    toCustomCase("foo bar baz", {
      separator: "",
      firstWordCase: "lower",
      wordCase: "capital",
    }),
  ).toBe("fooBarBaz");

  // Unchanged case if the case is specified to something that doesn't exist.
  expect(
    toCustomCase("foo bar baz", {
      // @ts-expect-error
      wordCase: "noexist",
    }),
  ).toBe("foobarbaz");

  expect(
    toCustomCase("fOo-Bar-Baz", {
      separator: "~",
      firstWordCase: "keep",
      wordCase: "upper",
      ignoreCaps: true,
    }),
  ).toBe("fOo~BAR~BAZ");

  expect(
    toCustomCase("FOO BAR BAZ", {
      ignoreCaps: true,
      separator: " ",
    }),
  ).toBe("FOO BAR BAZ");

  expect(
    toCustomCase("FOO BAR BAZ", {
      ignoreCaps: false,
    }),
  ).toBe("FOOBARBAZ");

  expect(
    toCustomCase("I ate a crème brûlée", {
      separator: "_",
      wordCase: "upper",
      unaccent: true,
    }),
  ).toBe("I_ATE_A_CREME_BRULEE");

  expect(
    toCustomCase("04d3f2a0-8b9b-4b9a-jh32-98df7a8d7f6a", {
      separator: " ",
      ignoreCaps: true,
      wordCase: "upper",
    }),
  ).toBe("04D3F2A0 8B9B 4B9A JH32 98DF7A8D7F6A");

  expect(toCustomCase).toBe(S.custom);
});
