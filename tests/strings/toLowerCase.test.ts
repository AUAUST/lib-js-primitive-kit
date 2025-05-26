import { toLowerCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toLowerCase()", () => {
  it("should work", () => {
    expect(toLowerCase("FOO")).toBe("foo");
    expect(toLowerCase("foo")).toBe("foo");
    expect(toLowerCase("Foo")).toBe("foo");
    expect(toLowerCase(0)).toBe("0");
    expect(toLowerCase("I ate a crème brûlée")).toBe("i ate a crème brûlée");
  });
});
