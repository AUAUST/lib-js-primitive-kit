import { concat } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("concat()", () => {
  it("should concatenate strings", () => {
    expect(concat()).toBe("");
    expect(concat("foo")).toBe("foo");
    expect(concat("foo", "bar")).toBe("foobar");
  });

  it("should support a separator provided as an option object", () => {
    expect(concat("foo", "bar", "baz", { separator: " " })).toBe("foo bar baz");
  });

  it("should stringify the separator and all arguments", () => {
    expect(
      concat(
        {
          toString() {
            return "foo";
          },
        },
        1,
        {
          separator: {
            valueOf() {
              return "_";
            },
          },
        }
      )
    ).toBe("foo_1");
  });

  //   expect(
  //     concat("foo", "bar", "baz", {
  //       separator: {
  //         toString() {
  //           return "_";
  //         },
  //       },
  //     })
  //   ).toBe("foo_bar_baz");
  //   expect(
  //     concat(
  //       "foo", // stays the same
  //       0, // becomes "0"
  //       BigInt(90), // becomes "90"
  //       false, // becomes "false"
  //       undefined, // becomes ""
  //       {
  //         toString() {
  //           return "bar";
  //         },
  //       }, // becomes "bar"
  //       {
  //         [Symbol.toPrimitive]() {
  //           return true;
  //         },
  //       }, // becomes "true"
  //       {
  //         separator: {
  //           [Symbol.toPrimitive]() {
  //             return 0;
  //           },
  //         }, // becomes "0"
  //       }
  //     )
  //     /**
  //      * Should become "foo" + "0" + "90" + "false" + "" + "bar" + "true",
  //      * filtered by truthiness (excluding undefined's "" conversion),
  //      * and joined by the stringified separator "0".
  //      */
  //   ).toBe("foo000900false0bar0true");

  // });
});
