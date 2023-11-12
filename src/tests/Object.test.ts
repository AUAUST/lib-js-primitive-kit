import { O } from "~/Object";

import { describe, expect, test } from "@jest/globals";

describe("O class", () => {
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

    expect(O.equals(Symbol("foo"), Symbol("foo"))).toBe(false);

    expect(O.equals(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(false);

    expect(O.equals(NaN, NaN)).toBe(true);
    expect(O.equals(NaN, 0)).toBe(false);
    expect(O.equals(-0, 0)).toBe(false);
    expect(O.equals(0, 0)).toBe(true);
    expect(O.equals(Infinity, Infinity)).toBe(true);
    expect(O.equals(Infinity, -Infinity)).toBe(false);
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

    expect(O.deepGet(obj, "foo", "bar", 0, "baz", "qux")).toBe("quux");
    expect(O.deepGet(obj, "foo", "bar", 0, "baz", "qux", 0)).toBe("q");
    expect(O.deepGet(obj, "foo", "zop")).toBe(undefined);
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
        O.flat(obj, (keys) => {
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
  });
});