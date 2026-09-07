import { flat } from "@auaust/primitive-kit/objects";

import type { Equal, Expect } from "type-testing";
import { expect, test } from "vitest";

test("flat() works", () => {
  {
    const obj = {
      foo: {
        bar: {
          baz: {
            qux: "quux",
          },
        },
      },
    };

    const result = flat(obj);

    expect(result).toEqual({
      "foo.bar.baz.qux": "quux",
    });

    obj.foo.bar.baz = <any>{
      qux: "quux",
      zop: "zup",
      lop: {
        rop: "rup",
        lop: {
          rop: "rup",
        },
      },
    };

    expect(flat(obj)).toEqual({
      "foo.bar.baz.qux": "quux",
      "foo.bar.baz.zop": "zup",
      "foo.bar.baz.lop.rop": "rup",
      "foo.bar.baz.lop.lop.rop": "rup",
    });

    expect(flat(obj, "")).toEqual({
      foobarbazqux: "quux",
      foobarbazzop: "zup",
      foobarbazloprop: "rup",
      foobarbazloploprop: "rup",
    });
  }

  {
    const obj = {
      a: {
        b: {
          c: {
            d: 1,
            e: 2,
            f: 3,
          },
        },
      },
    };

    const result = flat(obj, "/");

    expect(result).toEqual({
      "a/b/c/d": 1,
      "a/b/c/e": 2,
      "a/b/c/f": 3,
    });

    type Test = Expect<
      Equal<
        typeof result,
        {
          "a/b/c/d": number;
          "a/b/c/e": number;
          "a/b/c/f": number;
        }
      >
    >;
  }

  {
    const obj = {
      a: {
        b: {
          c: {
            d: 1,
            e: 1,
            f: 1,
          },
        },
        g: 1,
      },
    };

    const symbols = [
      Symbol("foo"),
      Symbol("bar"),
      Symbol("baz"),
      Symbol("qux"),
    ] as const;

    expect(
      flat(obj, () => {
        return "";
      }),
    ).toEqual({ "": 1 });

    expect(
      flat(obj, (keys) => {
        return keys.join("");
      }),
    ).toEqual({
      abcd: 1,
      abce: 1,
      abcf: 1,
      ag: 1,
    });

    let i = 0;
    expect(
      flat(obj, () => {
        return symbols[i++]!;
      }),
    ).toEqual({
      [symbols[0]]: 1,
      [symbols[1]]: 1,
      [symbols[2]]: 1,
      [symbols[3]]: 1,
    });
  }

  {
    const obj = { foo: true };

    // A custom separator function can't return a non-valid key.
    // @ts-expect-error
    expect(() => flat(obj, () => null)).toThrow(TypeError);
    // @ts-expect-error
    expect(() => flat(obj, () => true)).toThrow(TypeError);
    // @ts-expect-error
    expect(() => flat(obj, () => new Date())).toThrow(TypeError);
  }

  {
    const obj = {
      foo: true,
      bar: false,
    };

    // An object that wouldn't be flattened should still return a valid object, but not the same one.
    expect(flat(obj)).not.toBe(obj);
    expect(flat(obj)).toEqual(obj);
  }

  {
    const obj = {
      foo: {
        bar: 1,
        baz: 2,
      },
    };

    // If the key function returns undefined, the key is skipped.
    const result = flat(obj, (keys) => {
      if (keys[keys.length - 1] === "bar") {
        return undefined;
      }

      return keys.join(".");
    });

    expect(result).toEqual({
      "foo.baz": 2,
    });

    type Test = Expect<Equal<typeof result, Record<string, number>>>;
  }
});
