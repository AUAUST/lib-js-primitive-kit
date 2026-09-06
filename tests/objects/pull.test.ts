import { pull } from "@auaust/primitive-kit/objects";

import { expect } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

test("pull() works", () => {
  {
    const obj = {
      foo: "bar",
      bar: "baz",
      baz: "qux",
      qux: "quux",
    } as const;

    const pulled = pull(obj, ["foo", "baz", "notexist"]);

    expect(pulled).toEqual({
      foo: "bar",
      baz: "qux",
    });

    type Test = Expect<Equal<typeof pulled, Pick<typeof obj, "foo" | "baz">>>;

    expect(obj).toEqual({
      bar: "baz",
      qux: "quux",
    });
  }

  {
    const obj = {
      foo: "bar",
      bar: 1,
    };

    const foo = pull(obj, "foo");

    expect(foo).toEqual("bar");

    type Test = Expect<Equal<typeof foo, string>>;

    expect(obj).toEqual({
      bar: 1,
    });
  }
});
