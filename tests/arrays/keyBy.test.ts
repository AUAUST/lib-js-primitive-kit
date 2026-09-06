import { keyBy } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("keyBy()", () => {
  it("should work", () => {
    const input = [
      {
        id: 1,
        name: "foo",
      },
      {
        id: "key",
        name: "bar",
      },
      {
        id: Symbol.for("key"),
        name: "baz",
      },
      {
        foo: "bar",
      },
    ];

    const output = keyBy(input, "id");

    expect(output).toEqual({
      1: input[0],
      key: input[1],
      [Symbol.for("key")]: input[2],
    });

    expect(keyBy([], "id")).toEqual({});
  });
});
