import { hasKeys } from "@auaust/primitive-kit/objects";

import type { Equal, Expect, IsUnknown } from "type-testing";
import { expect, test } from "vitest";

test("hasKeys() works", () => {
  // Function call with a single argument should check if the object has any own keys.
  expect(hasKeys({})).toBe(false);
  expect(hasKeys({ foo: "bar" })).toBe(true);
  expect(hasKeys([])).toBe(false);
  expect(hasKeys(["foo"])).toBe(true);

  // By default, symbols are not checked.
  expect(hasKeys({ [Symbol("foo")]: "bar" })).toBe(false);

  // Only Object instances are checked for own keys.
  // @ts-expect-error
  expect(hasKeys(null)).toBe(false);
  // @ts-expect-error
  expect(hasKeys(undefined)).toBe(false);
  expect(hasKeys("foo")).toBe(false);
  // @ts-expect-error
  expect(hasKeys(0)).toBe(false);
  // @ts-expect-error
  expect(hasKeys(new Date())).toBe(false);

  // If the second argument is an array, it should check if the object has all of the keys.
  expect(hasKeys({ foo: "bar" }, ["foo"])).toBe(true);
  expect(hasKeys({ foo: "bar" }, ["foo", "bar"])).toBe(false);
  expect(hasKeys({ foo: "bar" }, [])).toBe(true);
  expect(hasKeys({ foo: "bar" }, ["bar"])).toBe(false);

  // If the second argument is an object, it should be an options object.
  expect(hasKeys({ foo: "bar" }, { symbols: true })).toBe(true);
  expect(hasKeys({ foo: "bar" }, { symbols: false })).toBe(true);
  expect(hasKeys({ [Symbol("foo")]: "bar" }, { symbols: true })).toBe(true);

  // Keys can also be passed as a property of the options object.
  expect(hasKeys({ foo: "bar" }, { keys: ["foo"] })).toBe(true);
  expect(hasKeys({ foo: "bar" }, { keys: ["foo", "bar"] })).toBe(false);

  // An empty options object should be equivalent to passing no options.
  expect(hasKeys({ foo: "bar" }, {})).toBe(true);
  expect(hasKeys({}, {})).toBe(false);

  {
    // onlyEnumerable option should be handled.
    const obj = {};
    expect(hasKeys(obj, { onlyEnumerable: false })).toBe(false);
    Object.defineProperty(obj, "foo", { value: "bar", enumerable: false });
    expect(hasKeys(obj)).toBe(false);
    expect(hasKeys(obj, { onlyEnumerable: false })).toBe(true);
  }

  // Symbols aren't enumerable, so checking for symbols doesn't care about the onlyEnumerable option.
  {
    const obj = {};

    Object.defineProperty(obj, Symbol("quux"), {
      value: 4,
      enumerable: false,
    });

    expect(hasKeys(obj)).toBe(false);
    expect(hasKeys(obj, { symbols: true })).toBe(true);
  }

  {
    const obj = {};

    if (hasKeys(obj, ["quux"])) {
      type Tests = [
        Expect<IsUnknown<(typeof obj)["quux"]>>,
        Expect<Equal<typeof obj, { quux: unknown }>>,
      ];
    }

    if (hasKeys(obj, { keys: ["quux", "foo"] } as const)) {
      type Tests = [
        Expect<IsUnknown<(typeof obj)["quux"]>>,
        Expect<Equal<typeof obj, { quux: unknown; foo: unknown }>>,
      ];
    }

    if (
      hasKeys(obj, {
        keys: ["quux", "foo"],
        symbols: true,
      } as const)
    ) {
      type Tests = [
        Expect<IsUnknown<(typeof obj)["quux"]>>,
        Expect<
          Equal<
            typeof obj,
            { quux: unknown; foo: unknown } & { [k: symbol]: unknown }
          >
        >,
      ];
    }

    if (hasKeys(obj)) {
      type Test = Expect<Equal<typeof obj, { [k: string]: unknown }>>;
    }

    const arr = ["foo"] as const;

    if (hasKeys(arr, [0, 1, 2])) {
      type Tests = [
        Expect<Equal<typeof arr, readonly ["foo"]>>,
        Expect<Equal<(typeof arr)[0], "foo">>,
      ];
    }
  }
});
