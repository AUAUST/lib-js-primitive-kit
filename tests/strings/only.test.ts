import { only } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("only()", () => {
  it("should return only the specified characters from the string", () => {
    expect(only("hello world", "lo")).toBe("llool");
    expect(only("HELLO WORLD", "lo")).toBe("");
  });

  it("should return only the characters that match the RegExp", () => {
    expect(only("hello world", /[aeiou]/)).toBe("eoo");
    expect(only("HELLO WORLD", /[aeiou]/)).toBe("");
    expect(only("HELLO WORLD", /[aeiou]/i)).toBe("EOO");
  });
});
