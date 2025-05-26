import { toUpperCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toUpperCase()", () => {
  it("should work", () => {
    expect(toUpperCase("FOO")).toBe("FOO");
    expect(toUpperCase("foo")).toBe("FOO");
    expect(toUpperCase("Foo")).toBe("FOO");
    expect(toUpperCase("I ate a crème brûlée")).toBe("I ATE A CRÈME BRÛLÉE");
  });
});
