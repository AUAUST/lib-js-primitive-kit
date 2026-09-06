import { random } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

test("random() works", () => {
  expect(random()).toMatch(/^[a-zA-Z0-9]{8}$/);
  expect(random(NaN)).toMatch(/^[a-zA-Z0-9]{8}$/);
  expect(random(0)).toBe("");
  expect(random(512)).toMatch(/^[a-zA-Z0-9]{512}$/);

  expect(random()).toHaveLength(8);
  expect(random(512)).toHaveLength(512);
  expect(random({ case: "upper" })).toHaveLength(8);

  expect(random(10, "é")).toBe("éééééééééé");
  expect(random(512, "_.a90")).toMatch(/^[-_\.a90]{512}$/);

  expect(random({ case: "upper", length: 256 })).toMatch(/^[A-Z0-9]{256}$/);
  expect(random({ case: "lower", length: 256 })).toMatch(/^[a-z0-9]{256}$/);
  expect(
    random({
      numbers: false,
      case: "mixed",
      length: 256,
    })
  ).toMatch(/^[a-zA-Z]{256}$/);
  expect(
    random({
      numbers: true,
      case: "mixed",
      length: 256,
    })
  ).toMatch(/^[a-zA-Z0-9]{256}$/);
  expect(
    random({
      numbers: "01234",
      length: 256,
    })
  ).toMatch(/^[a-zA-Z01234]{256}$/);
  expect(
    random({
      numbers: false,
      case: "mixed",
      symbols: "*%&/",
      length: 256,
    })
  ).toMatch(/^[a-zA-Z\*%&/]{256}$/);
  expect(
    random({
      numbers: false,
      case: "mixed",
      symbols: true,
      length: 256,
    })
  ).toMatch(/^[a-zA-Z_-]{256}$/);
  expect(random({ length: 512, chars: "**41+===" })).toMatch(
    /^[\*41\+=]{512}$/
  );

  expect(() => random(-1)).toThrow(RangeError);
  expect(() => random(Infinity)).toThrow(RangeError);
  expect(() => random(-Infinity)).toThrow(RangeError);
  expect(() =>
    random({
      chars: "",
    })
  ).toThrow(RangeError);

  // Passing chars as a number should use the number as the radix for random number stringification.
  expect(random({ chars: 16 })).toMatch(/^[0-9a-f]{8}$/);
  expect(random(256, 16)).toMatch(/^[0-9a-f]{256}$/);
  expect(random(256, 2)).toMatch(/^[01]{256}$/);
  expect(random(256, 8)).toMatch(/^[0-7]{256}$/);
  expect(random(256, 10)).toMatch(/^[0-9]{256}$/);
  expect(random(256, 36)).toMatch(/^[0-9a-z]{256}$/);
});
