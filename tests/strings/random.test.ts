import { random } from "@auaust/primitive-kit/strings";

import { assert, describe, expect, test } from "vitest";

describe("random()", () => {
  test("returns a string of 8 characters by default", () => {
    expect(random()).toHaveLength(8);
  });

  test("returns a string of the specified length", () => {
    expect(random(16)).toHaveLength(16);
  });

  test("returns an empty string when length is 0", () => {
    expect(random(0)).toBe("");
  });

  test("throws a RangeError when length is negative", () => {
    expect(() => random(-1)).toThrow(RangeError);
  });

  test("returns a string of the specified charset", () => {
    expect(random(10, "abc")).toMatch(/^[abc]{10}$/);

    expect(random(10, "a")).toBe("aaaaaaaaaa");
  });

  test("returns a string of the specified radix", () => {
    expect(random({ chars: 16 })).toMatch(/^[0-9a-f]{8}$/);

    expect(random(128, 16)).toMatch(/^[0-9a-f]{128}$/);

    expect(random(128, 2)).toMatch(/^[01]{128}$/);

    expect(random(128, 8)).toMatch(/^[0-7]{128}$/);

    expect(random(128, 10)).toMatch(/^[0-9]{128}$/);

    expect(random(128, 36)).toMatch(/^[0-9a-z]{128}$/);

    const str = random(1024, 64);

    assert(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/"
        .split("")
        .every((char) => str.includes(char)),
    );
  });

  test("has default pools", () => {
    expect(
      random({
        case: "mixed",
        numbers: true,
      }),
    ).toMatch(/^[a-zA-Z0-9]{8}$/);

    expect(
      random({
        case: "upper",
        numbers: true,
      }),
    ).toMatch(/^[A-Z0-9]{8}$/);

    expect(
      random({
        case: "lower",
        numbers: true,
      }),
    ).toMatch(/^[a-z0-9]{8}$/);
  });
});
