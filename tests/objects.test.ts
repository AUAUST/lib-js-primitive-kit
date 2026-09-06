import { O, type GenericRecord, type ToObject } from "@auaust/primitive-kit";

import type { Equal, Expect, IsUnknown } from "type-testing";
import { describe, expect, test } from "vitest";

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
    type Test = [
      Expect<Equal<ToObject<null>, GenericRecord>>,
      Expect<Equal<ToObject<undefined>, GenericRecord>>,
      Expect<Equal<ToObject<[]>, GenericRecord<`${number}`>>>,
      Expect<Equal<ToObject<{}>, {}>>,
      Expect<Equal<ToObject<{ foo: "bar" }>, { foo: "bar" }>>,
      Expect<
        Equal<ToObject<{ foo: "bar"; bar: "baz" }>, { foo: "bar"; bar: "baz" }>
      >,
      Expect<Equal<ToObject<number>, Number>>,
      Expect<Equal<ToObject<string>, String>>,
      Expect<Equal<ToObject<boolean>, Boolean>>
    ];

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

  test("strict typecheck works", () => {
    expect(O.isStrict({})).toBe(true);
    expect(O.isStrict([])).toBe(false);

    expect(O.isStrict(null)).toBe(false);
    expect(O.isStrict(undefined)).toBe(false);

    expect(O.isStrict(new Date())).toBe(false);
    expect(O.isStrict(() => {})).toBe(false);
  });
});
