import { mapReplace } from "@auaust/primitive-kit/strings";

import { describe, expect, test } from "vitest";

describe("mapReplace() works", () => {
  test("with an array input of strings", () => {
    expect(mapReplace("foo", [["foo", "bar"]])).toBe("bar");

    expect(mapReplace("foofoo", [["foo", "bar"]], true)).toBe("barbar");

    expect(mapReplace("foofoo", [["fooo", "bar"]])).toBe("foofoo");

    expect(
      mapReplace("hello", [
        ["h", "j"],
        ["jello", "world"],
      ]),
    ).toBe("world");
  });

  test("with an array input of RegExp", () => {
    expect(mapReplace("foo", [[/foo/, "bar"]])).toBe("bar");

    expect(mapReplace("foo", [[/\w+/, "_"]])).toBe("_");

    expect(mapReplace("foo", [[/\w/g, "_"]])).toBe("___");
  });

  test("with a 2-dimensional array input of strings and RegExp", () => {
    expect(
      mapReplace(
        "foofoo barbar bazbaz",
        [
          [/foo/g, "mip"], // global so replaces both "foo"
          ["bar", "map"], // `true` passed so global replacements
          [/baz/, "mop"], // not global so replaces only the first "baz" (regex not impacted by `replaceAll` option)
        ],
        true,
      ),
    ).toBe("mipmip mapmap mopbaz");

    expect(
      mapReplace("This  is a   fun test with fun things", [
        // should deduplicate and transform all whitespace to a single dash
        [/\s+/g, "-"],
        // should bring much fun
        ["fun", "really fun"],
        // should prepend "« " to the start of the string
        [/^/, "« "],
        // should append " »" to the end of the string
        [/$/, " »"],
        // should trim all words to maximum 3 characters
        [/(\w{3})\w+/g, "$1"],
      ]),
    ).toBe("« Thi-is-a-rea fun-tes-wit-fun-thi »");
  });

  test("with a simple object", () => {
    // replace the first occurrence
    expect(mapReplace("foofoofoo", { foo: "bar" })).toBe("barfoofoo");
    // replace all occurrences
    expect(mapReplace("foofoofoo", { foo: "bar" }, true)).toBe("barbarbar");
  });
});
