import { beforeFirst } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("beforeFirst()", () => {
  it("should work", () => {
    expect(beforeFirst("foo", "f")).toBe("");
    expect(beforeFirst("foo", "o")).toBe("f");
    expect(beforeFirst("foo", "oo")).toBe("f");
    expect(beforeFirst("foo", "a")).toBe("");
    expect(beforeFirst("bar foo bar foo", "foo")).toBe("bar ");
  });
});
