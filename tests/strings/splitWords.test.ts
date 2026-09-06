import { splitWords } from "@auaust/primitive-kit/strings";

import { describe, expect } from "vitest";
import { S } from "@auaust/primitive-kit";
import { test } from "vitest";

describe("splitWords() works", () => {
  test("with basic sentence case", () => {
    expect(splitWords("This is a string.")).toEqual([
      "This",
      "is",
      "a",
      "string",
    ]);
  });

  test("with camel case", () => {
    expect(splitWords("ThisIsAString.")).toEqual(["This", "Is", "A", "String"]);
  });

  test("with a boolean as options", () => {
    expect(splitWords("CAPS")).toEqual(["C", "A", "P", "S"]);
    expect(splitWords("CAPS", false)).toEqual(["C", "A", "P", "S"]);
    expect(splitWords("CAPS", true)).toEqual(["CAPS"]);
  });

  test("with diacritics", () => {
    expect(splitWords("Ça c'est très élégant", { unaccent: false })).toEqual([
      "Ça",
      "c",
      "est",
      "très",
      "élégant",
    ]);
    expect(
      splitWords("ÇaÇaÉtéCommeCœurLætitiaSouﬁfreÀLaPlaceŒuf", {
        unaccent: false,
      })
    ).toEqual([
      "Ça",
      "Ça",
      "Été",
      "Comme",
      "Cœur",
      "Lætitia",
      "Souﬁfre",
      "À",
      "La",
      "Place",
      "Œuf",
    ]);
    expect(splitWords("ÇaÇaÉtéCommeCœurLætitiaSouﬁfreÀLaPlaceŒuf", {})).toEqual(
      [
        "Ca",
        "Ca",
        "Ete",
        "Comme",
        "Coeur",
        "Laetitia",
        "Soufifre",
        "A",
        "La",
        "Place",
        "Oeuf",
      ]
    );

    expect(
      splitWords("ÇaÇaÉtéCommeHiverÀLaPlaceŒuf", {
        unaccent: true,
      })
    ).toEqual([
      "Ca",
      "Ca",
      "Ete",
      "Comme",
      "Hiver",
      "A",
      "La",
      "Place",
      "Oeuf",
    ]);
  });

  test("with options", () => {
    expect(
      splitWords("ThisIsAString.", {
        ignoreCaps: true,
      })
    ).toEqual(["ThisIsAString"]);

    expect(
      splitWords("ThisIsAString.", {
        ignoreCaps: false,
      })
    ).toEqual(["This", "Is", "A", "String"]);

    expect(
      splitWords("Ça c'est très élégant", {
        unaccent: false,
      })
    ).toEqual(["Ça", "c", "est", "très", "élégant"]);

    expect(
      splitWords("Ça c'est très élégant", {
        unaccent: true,
      })
    ).toEqual(["Ca", "c", "est", "tres", "elegant"]);
  });
});
