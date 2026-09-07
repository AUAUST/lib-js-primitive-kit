import { isNotObject, isObject } from "@auaust/primitive-kit/objects";

import { expect, test } from "vitest";

test("is() and isNot() works", () => {
  const objects = [
    {},
    new Date(),
    new String(""),
    new Number(0),
    new Boolean(false),
  ];

  const arrays = [[], ["foo"]];

  const notObjects = [null, undefined, () => {}, class {}, Symbol(), 0];

  // Objects must return true by default
  for (const obj of objects) {
    expect(isObject(obj)).toBe(true);

    expect(isNotObject(obj)).toBe(false);
  }

  // Arrays and objects must return true if allowArray is true
  for (const obj of [...objects, ...arrays]) {
    expect(isObject(obj, true)).toBe(true);

    expect(isNotObject(obj, true)).toBe(false);
  }

  // Arrays and non objects must return false by default
  for (const obj of [...notObjects, ...arrays]) {
    expect(isObject(obj)).toBe(false);

    expect(isNotObject(obj)).toBe(true);
  }
});
