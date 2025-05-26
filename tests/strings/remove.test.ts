import { remove } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("remove()", () => {
  it("should work", () => {
    expect(remove("foo", "f")).toBe("oo");
    expect(remove("foo", "o")).toBe("f");
    expect(remove("foo", "oo")).toBe("f");
    expect(remove("foo", "a")).toBe("foo");
    expect(remove("foo bar foo", "foo")).toBe(" bar ");

    expect(remove("abc123def456", /\d+/)).toBe("abcdef456");
    expect(remove("abc123def456", /\d+/g)).toBe("abcdef");
  });
});
