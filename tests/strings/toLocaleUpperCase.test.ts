import { toLocaleUpperCase } from "@auaust/primitive-kit/strings";

import { expect, test } from "vitest";

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

test("toLocaleUpperCase() works", () => {
  for (const locale of locales) {
    for (const str of localizable) {
      expect(toLocaleUpperCase(str, locale)).toBe(
        str.toLocaleUpperCase(locale),
      );
    }
  }
});
