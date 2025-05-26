import { prepend } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("prepend()", () => {
  it("should work", () => {
    expect(prepend("foo", "bar")).toBe("barfoo");
    expect(prepend("foo", "bar", "baz")).toBe("barbazfoo");

    expect(
      prepend("foo", "bar", "baz", {
        separator: " ",
      })
    ).toBe("bar baz foo");

    expect(
      prepend("foo", "bar", "baz", {
        separator: {
          toString() {
            return "_";
          },
        },
      })
    ).toBe("bar_baz_foo");
  });
});
