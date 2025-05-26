import { beforeLast } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("beforeLast()", () => {
  it("should work", () => {
    expect(beforeLast("foo", "f")).toBe("");
    expect(beforeLast("foo", "o")).toBe("fo");
    expect(beforeLast("foo", "oo")).toBe("f");
    expect(beforeLast("foo", "a")).toBe("");
    expect(beforeLast("bar foo bar foo", "bar")).toBe("bar foo ");
  });
});
