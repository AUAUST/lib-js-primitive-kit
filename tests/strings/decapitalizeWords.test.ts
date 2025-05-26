import { decapitalizeWords } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("decapitalizeWords()", () => {
  it("should work", () => {
    expect(decapitalizeWords("Hello World")).toBe("hello world");
    expect(decapitalizeWords("This Is A Test")).toBe("this is a test");
    expect(decapitalizeWords("A B-C")).toBe("a b-C");
  });
});
