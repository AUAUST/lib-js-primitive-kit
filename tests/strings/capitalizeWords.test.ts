import { capitalizeWords } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("capitalizeWords()", () => {
  it("should work", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
    expect(capitalizeWords("this is a test")).toBe("This Is A Test");
    expect(capitalizeWords("A B C")).toBe("A B C");
  });
});
