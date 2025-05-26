import { beforeEnd } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("beforeEnd()", () => {
  it("should work", () => {
    expect(beforeEnd("foo", "f")).toBe("");
    expect(beforeEnd("foo", "o")).toBe("fo");
    expect(beforeEnd("foo", "oo")).toBe("f");
    expect(beforeEnd("foo", "a")).toBe("");
    expect(beforeEnd("bar foo bar foo", "bar")).toBe("");
    expect(beforeEnd("bar foo bar foo", "foo")).toBe("bar foo bar ");
  });
});
