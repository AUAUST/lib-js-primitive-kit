import { hasKey } from "@auaust/primitive-kit/objects";

import { expect, it } from "vitest";
import { test } from "vitest";

test("in() works", () => {
  {
    // `"foo" in primitive` would throw a TypeError, but here it just returns false.
    // @ts-expect-error
    expect(hasKey("foo", "bar")).toBe(false);
    // @ts-expect-error
    expect(hasKey("foo", 0)).toBe(false);
    // @ts-expect-error
    expect(hasKey("foo", true)).toBe(false);
    // @ts-expect-error
    expect(hasKey("foo", false)).toBe(false);
  }

  {
    const obj = { foo: "bar" };
    expect(hasKey("foo", obj)).toBe(true);
    expect(hasKey("bar", obj)).toBe(false);
  }

  {
    const symbol = Symbol("foo");
    const obj = { [symbol]: "bar" };
    expect(hasKey(symbol, obj)).toBe(true);
  }

  {
    const arr = [0, 1, , 3];
    expect(hasKey(0, arr)).toBe(true);
    expect(hasKey(1, arr)).toBe(true);
    expect(hasKey(2, arr)).toBe(false);
  }

  {
    // This part only tests the TypeScript typings.
    const obj = {};
    const symbol = Symbol("foo");

    if (hasKey("foo", obj)) {
      obj.foo;

      // @ts-expect-error
      obj.bar;
    }

    if (hasKey(symbol, obj)) {
      obj[symbol];

      // @ts-expect-error
      obj.foo;
      // @ts-expect-error
      obj[Symbol("foo")];
    }

    if (hasKey(1, obj)) {
      obj[1];

      // @ts-expect-error
      obj[2];
    }
  }
});
