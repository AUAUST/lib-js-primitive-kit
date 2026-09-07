import { hasKey } from "@auaust/primitive-kit/objects";

import { expect, test } from "vitest";

test("in() works", () => {
  {
    // `"foo" in primitive` would throw a TypeError, but here it just returns false.
    expect(hasKey("bar", "foo")).toBe(false);
    // @ts-expect-error
    expect(hasKey(0, "foo")).toBe(false);
    // @ts-expect-error
    expect(hasKey(true, "foo")).toBe(false);
    // @ts-expect-error
    expect(hasKey(false, "foo")).toBe(false);
  }

  {
    const obj = { foo: "bar" };

    expect(hasKey(obj, "foo")).toBe(true);

    expect(hasKey(obj, "bar")).toBe(false);
  }

  {
    const symbol = Symbol("foo");

    const obj = { [symbol]: "bar" };

    expect(hasKey(obj, symbol)).toBe(true);
  }

  {
    const arr = [0, 1, , 3];

    expect(hasKey(arr, 0)).toBe(true);

    expect(hasKey(arr, 1)).toBe(true);

    expect(hasKey(arr, 2)).toBe(false);
  }

  {
    // This part only tests the TypeScript typings.
    const obj = {};

    const symbol = Symbol("foo");

    if (hasKey(obj, "foo")) {
      obj.foo;

      // @ts-expect-error
      obj.bar;
    }

    if (hasKey(obj, symbol)) {
      obj[symbol];

      // @ts-expect-error
      obj.foo;
      // @ts-expect-error
      obj[Symbol("foo")];
    }

    if (hasKey(obj, 1)) {
      obj[1];

      // @ts-expect-error
      obj[2];
    }
  }
});
