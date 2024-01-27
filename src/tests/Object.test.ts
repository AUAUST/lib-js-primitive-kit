import { O } from "~/Object";

import { describe, expect, test } from "@jest/globals";

describe("O class", () => {
  test("called as a function works", () => {
    [
      "",
      new String(""),
      0,
      new Number(0),
      {},
      [],
      null,
      undefined,
      "false",
      "true",
    ].forEach((x) => {
      expect(O(x)).toEqual(O.from(x));
    });
  });

  test("conversion to string works", () => {
    expect(O.from(null)).toEqual({});
    expect(O.from(undefined)).toEqual({});

    expect(O.from([])).toEqual({});
    expect(O.from(["foo", 2, true])).toEqual({ "0": "foo", "1": 2, "2": true });

    expect(O.from("foo")).toEqual(new String("foo"));
    expect(O.from(0)).toEqual(new Number(0));

    let obj: any = { foo: "bar" };
    expect(O.from(obj)).toBe(obj);

    obj = new Date();
    expect(O.from(obj)).toBe(obj);
  });

  test("non-strict typecheck works", () => {
    expect(O.is({})).toBe(true);
    expect(O.is([])).toBe(false);
    expect(O.is([], true)).toBe(true);

    expect(O.is(null)).toBe(false);
    expect(O.is(undefined)).toBe(false);

    expect(O.is(new Date())).toBe(true);
    expect(O.is(() => {})).toBe(false);
  });

  test("strict typecheck works", () => {
    expect(O.isStrict({})).toBe(true);
    expect(O.isStrict([])).toBe(false);

    expect(O.isStrict(null)).toBe(false);
    expect(O.isStrict(undefined)).toBe(false);

    expect(O.isStrict(new Date())).toBe(false);
    expect(O.isStrict(() => {})).toBe(false);
  });

  test("keys() works", () => {
    expect(O.keys(null)).toEqual([]);
    expect(O.keys(undefined)).toEqual([]);

    expect(O.keys({})).toEqual([]);
    expect(O.keys({ foo: "bar" })).toEqual(["foo"]);
    expect(O.keys({ foo: "bar", bar: "baz" })).toEqual(["foo", "bar"]);

    expect(O.keys([])).toEqual([]);
    expect(O.keys(["foo"])).toEqual(["0"]);
  });

  test("values() works", () => {
    expect(O.values({})).toEqual([]);
    expect(O.values({ foo: "bar" })).toEqual(["bar"]);
    expect(O.values({ foo: "bar", bar: "baz" })).toEqual(["bar", "baz"]);

    expect(O.values([])).toEqual([]);
    expect(O.values(["foo"])).toEqual(["foo"]);
  });

  test("entries() works", () => {
    expect(O.entries({})).toEqual([]);
    expect(O.entries({ foo: "bar" })).toEqual([["foo", "bar"]]);
    expect(O.entries({ foo: "bar", bar: "baz" })).toEqual([
      ["foo", "bar"],
      ["bar", "baz"],
    ]);

    expect(O.entries([])).toEqual([]);
    expect(O.entries(["foo"])).toEqual([["0", "foo"]]);
  });

  test("equals() works", () => {
    expect(O.equals({}, {})).toBe(true);
    expect(O.equals({ foo: "bar" }, { foo: "bar" })).toBe(true);
    expect(O.equals({ foo: "bar" }, { foo: "barre" })).toBe(false);
    expect(O.equals({ foo: "bar" }, { foo: "bar", bar: "baz" })).toBe(false);

    expect(O.equals([], [])).toBe(true);
    expect(O.equals(["foo"], ["foo"])).toBe(true);
    expect(O.equals(["foo"], ["bar"])).toBe(false);
    expect(O.equals(["foo"], ["foo", "bar"])).toBe(false);

    expect(O.equals(null, null)).toBe(true);
    expect(O.equals(null, {})).toBe(false);
    expect(O.equals(null, undefined)).toBe(false);

    expect(O.equals(new Date(), new Date())).toBe(true);
    expect(
      O.equals(
        new Date(2023, 11, 12, 18, 5, 0),
        new Date(2023, 11, 12, 18, 5, 1)
      )
    ).toBe(false);

    expect(
      O.equals(
        () => {},
        () => {}
      )
    ).toBe(false);

    // @ts-expect-error
    expect(O.equals(new Number(), new String())).toBe(false);

    expect(O.equals(Symbol("foo"), Symbol("foo"))).toBe(false);

    expect(O.equals(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(false);

    expect(O.equals(NaN, NaN)).toBe(true);
    expect(O.equals(NaN, 0)).toBe(false);
    expect(O.equals(-0, 0)).toBe(false);
    expect(O.equals(0, 0)).toBe(true);
    expect(O.equals(Infinity, Infinity)).toBe(true);
    expect(O.equals(Infinity, -Infinity)).toBe(false);
  });

  test("in() works", () => {
    {
      const obj = { foo: "bar" };
      expect(O.in("foo", obj)).toBe(true);
      expect(O.in("bar", obj)).toBe(false);
    }

    {
      const symbol = Symbol("foo");
      const obj = { [symbol]: "bar" };
      expect(O.in(symbol, obj)).toBe(true);
    }

    {
      const keys = ["foo", "bar", Symbol("baz"), 1] as const;
      const obj = {};

      for (const key of keys) {
        O.defineProperty(obj, key, {
          value: key,
          enumerable: true,
        });
      }

      for (const key of keys) {
        expect(O.in(key, obj)).toBe(true);
      }

      expect(O.in(keys, obj)).toBe(true);
    }

    {
      // This part only tests the TypeScript typings.
      const obj = {};
      const symbol = Symbol("foo");

      if (O.in("foo", obj)) {
        obj.foo;

        // @ts-expect-error
        obj.bar;
      }

      if (O.in(symbol, obj)) {
        obj[symbol];

        // @ts-expect-error
        obj.foo;
        // @ts-expect-error
        obj[Symbol("foo")];
      }

      if (O.in(1, obj)) {
        obj[1];

        // @ts-expect-error
        obj[2];
      }

      if (O.in(["foo", "bar", symbol, 1] as const, obj)) {
        obj.foo;
        obj.bar;
        obj[symbol];
        obj[1];

        // @ts-expect-error
        obj.map;
        // @ts-expect-error
        obj[2];
        // @ts-expect-error
        obj[Symbol("foo")];
      }
    }
  });

  test("deepGet() works", () => {
    expect(O.deepGet({ foo: "bar" }, "foo")).toBe("bar");
    expect(O.deepGet({ foo: { bar: "baz" } }, "foo", "bar")).toBe("baz");
    expect(
      O.deepGet(
        { foo: { bar: { baz: { qux: "quux" } } } },
        "foo",
        "bar",
        "baz",
        "qux"
      )
    ).toBe("quux");

    {
      const obj = {
        foo: {
          bar: [
            {
              baz: {
                qux: "quux",
              },
            },
          ],
        },
      };

      expect(O.deepGet(obj)).toBe(obj);
      expect(O.deepGet(obj, "foo", "bar", 0, "baz", "qux")).toBe("quux");
      expect(O.deepGet(obj, "foo", "bar", 0, "baz", "qux", 0)).toBe("q");
      expect(O.deepGet(obj, "foo", "zop")).toBe(undefined);

      expect(O.deepGet(obj, "noexist")).toBe(undefined);
      expect(O.deepGet(undefined, "noexist")).toBe(undefined);
    }

    {
      // Test handling of dot notation
      const obj = {
        "foo.bar": {
          baz: {
            qux: "A",
          },
          "baz.qux": [
            [
              {
                "foo.bar": "D",
              },
            ],
          ],
        },
        foo: {
          bar: {
            baz: {
              qux: "B",
            },
          },
        },
        "foo.bar.baz": "C",
        bar: "E",
      } as const;

      const A = O.deepGet(obj, "foo.bar", "baz", "qux");
      expect(A).toBe("A");

      const B1 = O.deepGet(obj, "foo.bar.baz");
      expect(B1).toBe(obj.foo.bar.baz);

      const B2 = O.deepGet(obj, "foo.bar.baz.qux");
      expect(B2).toBe("B");

      const C = O.deepGet(obj, "foo.bar.baz", false);
      expect(C).toBe("C");

      const D = O.deepGet(obj, "foo.bar", "baz.qux", 0, 0, "foo.bar");
      expect(D).toBe("D");

      const NoExist1 = O.deepGet(obj, "some.wrong.path");
      expect(NoExist1).toBe(undefined);

      const NoExist2 = O.deepGet(
        obj,
        "noexist",
        "with",
        "nested access",
        "to",
        "undefined values"
      );
      expect(NoExist2).toBe(undefined);

      const NoExist3 = O.deepGet(
        obj,
        // makes TS happy while not using @ts-expect-error
        // which also mimics what a user would do
        "some.wrong.path" as keyof typeof obj,
        false
      );
      expect(NoExist3).toBe(undefined);
    }
  });

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

      expect(O.flat(obj)).toEqual({
        "foo.bar.baz.qux": "quux",
      });

      (obj.foo.bar.baz as any) = {
        qux: "quux",
        zop: "zup",
        lop: {
          rop: "rup",
          lop: {
            rop: "rup",
          },
        },
      };

      expect(O.flat(obj)).toEqual({
        "foo.bar.baz.qux": "quux",
        "foo.bar.baz.zop": "zup",
        "foo.bar.baz.lop.rop": "rup",
        "foo.bar.baz.lop.lop.rop": "rup",
      });

      expect(O.flat(obj, "")).toEqual({
        foobarbazqux: "quux",
        foobarbazzop: "zup",
        foobarbazloprop: "rup",
        foobarbazloploprop: "rup",
      });
    }

    {
      const obj: {} = {
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

      expect(O.flat(obj, "/")).toEqual({
        "a/b/c/d": 1,
        "a/b/c/e": 2,
        "a/b/c/f": 3,
      });
    }
    {
      const obj: {} = {
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
        O.flat(obj, () => {
          return "";
        })
      ).toEqual({ "": 1 });

      expect(
        O.flat(obj, (keys) => {
          return keys.join("");
        })
      ).toEqual({
        abcd: 1,
        abce: 1,
        abcf: 1,
        ag: 1,
      });

      let i = 0;
      expect(
        O.flat(obj, () => {
          return symbols[i++]!;
        })
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
      expect(() => O.flat(obj, () => undefined)).toThrow(TypeError);
      // @ts-expect-error
      expect(() => O.flat(obj, () => null)).toThrow(TypeError);
      // @ts-expect-error
      expect(() => O.flat(obj, () => true)).toThrow(TypeError);
      // @ts-expect-error
      expect(() => O.flat(obj, () => new Date())).toThrow(TypeError);
    }

    {
      const obj = {
        foo: true,
        bar: false,
      };

      // An object that wouldn't be flattened should still return a valid object, but not the same one.
      expect(O.flat(obj)).not.toBe(obj);
      expect(O.flat(obj)).toEqual(obj);
    }
  });

  test("clone() works", () => {
    expect(O.clone("foo")).toBe("foo");
    expect(O.clone(0)).toBe(0);
    expect(O.clone(true)).toBe(true);
    expect(O.clone(false)).toBe(false);
    expect(O.clone(null)).toBe(null);

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

      expect(O.clone(obj)).toEqual(obj);
      expect(O.clone(obj)).not.toBe(obj);
    }

    {
      const array = ["foo", "bar", "baz"];

      // By default, arrays are cloned.
      expect(O.clone(array)).toEqual(array);
      expect(O.clone(array)).not.toBe(array);

      // If the second argument is `false`, arrays are copied by reference.
      expect(O.clone(array, false)).toEqual(array);
      expect(O.clone(array, false)).toBe(array);
    }

    {
      const complexe = {
        foo: {
          bar: {
            baz: {
              qux: "quux",
            },
            crux: {
              lux: [
                1,
                {
                  fux: 1,
                },
              ],
            },
          },
        },
        bar: [
          [
            [1],
            {
              foo: "bar",
              map: [1],
            },
          ],
          1,
          {
            foo: "bar",
            map: [1],
          },
        ],
      };

      expect(O.clone(complexe)).toEqual(complexe);
      expect(O.clone(complexe)).not.toBe(complexe);

      expect(O.clone(complexe, false)).toEqual(complexe);
      expect(O.clone(complexe, false)).not.toBe(complexe);

      // Cloned object should deeply clone arrays by default, thus `O.clone(complexe).bar` should be a copy of `complexe.bar`.
      expect(O.clone(complexe).bar).not.toBe(complexe.bar);
      // If cloneArrays is false, `O.clone(complexe, false).bar` should be a reference to `complexe.bar`.
      expect(O.clone(complexe, false).bar).toBe(complexe.bar);
    }

    {
      const array = [1, [2, [3, [4, [5, [2, [7, [8, [9, [10]]]]]]]]]] as const;

      expect(O.clone(array)).toEqual(array);
      expect(O.clone(array)).not.toBe(array);

      expect(O.clone(array, false)).toEqual(array);

      expect(O.clone(array)[1][1][1][1][1]).not.toBe(array[1][1][1][1][1]);
      expect(O.clone(array)[1][1][1][1][1]).toEqual(array[1][1][1][1][1]);

      expect(O.clone(array, false)[1][1][1][1][1]).toBe(array[1][1][1][1][1]);
    }
  });

  test("hasKeys() works", () => {
    // Function call with a single argument should check if the object has any own keys.
    expect(O.hasKeys({})).toBe(false);
    expect(O.hasKeys({ foo: "bar" })).toBe(true);
    expect(O.hasKeys([])).toBe(false);
    expect(O.hasKeys(["foo"])).toBe(true);

    // By default, symbols are not checked.
    expect(O.hasKeys({ [Symbol("foo")]: "bar" })).toBe(false);

    // Only Object instances are checked for own keys.
    // @ts-expect-error
    expect(O.hasKeys(null)).toBe(false);
    // @ts-expect-error
    expect(O.hasKeys(undefined)).toBe(false);
    // @ts-expect-error
    expect(O.hasKeys("foo")).toBe(false);
    // @ts-expect-error
    expect(O.hasKeys(0)).toBe(false);
    expect(O.hasKeys(new Date())).toBe(false);

    // If the second argument is an array, it should check if the object has all of the keys.
    expect(O.hasKeys({ foo: "bar" }, ["foo"])).toBe(true);
    expect(O.hasKeys({ foo: "bar" }, ["foo", "bar"])).toBe(false);
    expect(O.hasKeys({ foo: "bar" }, [])).toBe(true);
    expect(O.hasKeys({ foo: "bar" }, ["bar"])).toBe(false);

    // If the second argument is an object, it should be an options object.
    expect(O.hasKeys({ foo: "bar" }, { symbols: true })).toBe(true);
    expect(O.hasKeys({ foo: "bar" }, { symbols: false })).toBe(true);
    expect(O.hasKeys({ [Symbol("foo")]: "bar" }, { symbols: true })).toBe(true);

    // Keys can also be passed as a property of the options object.
    expect(O.hasKeys({ foo: "bar" }, { keys: ["foo"] })).toBe(true);
    expect(O.hasKeys({ foo: "bar" }, { keys: ["foo", "bar"] })).toBe(false);

    // An empty options object should be equivalent to passing no options.
    expect(O.hasKeys({ foo: "bar" }, {})).toBe(true);
    expect(O.hasKeys({}, {})).toBe(false);

    {
      // onlyEnumerable option should be handled.
      const obj = {};
      Object.defineProperty(obj, "foo", { value: "bar", enumerable: false });
      expect(O.hasKeys(obj)).toBe(false);
      expect(O.hasKeys(obj, { onlyEnumerable: false })).toBe(true);
    }

    // Symbols aren't enumerable, so checking for symbols doesn't care about the onlyEnumerable option.
    {
      const obj = {};

      Object.defineProperty(obj, Symbol("quux"), {
        value: 4,
        enumerable: false,
      });

      expect(O.hasKeys(obj)).toBe(false);
      expect(O.hasKeys(obj, { symbols: true })).toBe(true);
    }
  });
});
