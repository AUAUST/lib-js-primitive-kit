import { deepGet } from "@auaust/primitive-kit/objects";

import { expect } from "vitest";
import { Equal, Expect, IsUnknown } from "type-testing";
import { test } from "vitest";

test("deepGet() works", () => {
  expect(deepGet({ foo: "bar" }, "foo")).toBe("bar");
  expect(deepGet({ foo: { bar: "baz" } }, "foo", "bar")).toBe("baz");
  expect(
    deepGet(
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

    expect(deepGet(obj)).toBe(obj);
    expect(deepGet(obj, "foo", "bar", 0, "baz", "qux")).toBe("quux");
    expect(deepGet(obj, "foo", "bar", 0, "baz", "qux", 0)).toBe("q");
    expect(deepGet(obj, "foo", "zop")).toBe(undefined);

    expect(deepGet(obj, "noexist")).toBe(undefined);
    // @ts-expect-error
    expect(deepGet(undefined, "noexist")).toBe(undefined);
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

    const A = deepGet(obj, "foo.bar", "baz", "qux");
    expect(A).toBe("A");
    type TestA = Expect<Equal<typeof A, "A">>;

    const B1 = deepGet(obj, "foo.bar.baz");
    expect(B1).toBe(obj.foo.bar.baz);
    type TestB1 = Expect<
      Equal<
        typeof B1,
        {
          readonly qux: "B";
        }
      >
    >;

    const B2 = deepGet(obj, "foo.bar.baz.qux");
    expect(B2).toBe("B");
    type TestB2 = Expect<Equal<typeof B2, "B">>;

    const D = deepGet(obj, "foo.bar", "baz.qux", 0, 0, "foo.bar");
    expect(D).toBe("D");
    type TestD = Expect<Equal<typeof D, "D">>;

    const NoExist1 = deepGet(obj, "some.wrong.path");
    expect(NoExist1).toBe(undefined);
    type TestNoExist1 = Expect<IsUnknown<typeof NoExist1>>;

    const NoExist2 = deepGet(
      obj,
      "noexist",
      "with",
      "nested access",
      "to",
      "undefined values"
    );
    expect(NoExist2).toBe(undefined);

    const NoExist3 = deepGet(
      obj,
      // makes TS happy while not using @ts-expect-error
      // which also mimics what a user would do
      "some.wrong.path" as keyof typeof obj
    );
    expect(NoExist3).toBe(undefined);
  }
});
