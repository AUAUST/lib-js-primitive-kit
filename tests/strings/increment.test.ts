import { increment } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { S } from "@auaust/primitive-kit";
import { test } from "vitest";

test("increment() works", () => {
  expect(increment("foo")).toBe("foo1");
  expect(increment("foo1")).toBe("foo2");
  expect(increment("foo-9")).toBe("foo-10");
  expect(increment("foo", 2)).toBe("foo2");
  expect(increment("foo", 10)).toBe("foo10");
  expect(increment("foo", 0)).toBe("foo");
  expect(
    increment("foo", {
      increment: 2,
      separator: "-",
      pad: 3,
      filler: "0",
    })
  ).toBe("foo-002");

  // @ts-expect-error
  expect(increment("foo", "bar")).toBe("foo1");

  expect(increment("foo", -2)).toBe(S.decrement("foo", 2));
});
