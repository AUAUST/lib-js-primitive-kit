import { toLocaleLowerCase } from "@auaust/primitive-kit/strings";

import { expect } from "vitest";
import { test } from "vitest";

const locales = ["en-US", "en-GB", "fr-FR", "fr-CA", "TR"];
const localizable = [
  "I",
  "İ",
  "ı",
  "İ",
  "i",
  "I",
  "ß",
  "SS",
  "ss",
  "istanbul",
  "İstanbul",
  "Gesäß",
  "GESÄSS",
];

test("toLocaleLowerCase() works", () => {
  for (const locale of locales) {
    for (const str of localizable) {
      expect(toLocaleLowerCase(str, locale)).toBe(
        str.toLocaleLowerCase(locale)
      );
    }
  }
});
