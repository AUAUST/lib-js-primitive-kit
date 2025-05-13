import { toLocaleLowerCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toLocaleLowerCase()", () => {
  it("should work", () => {
    expect(toLocaleLowerCase).toBeTypeOf("function");
  });
});
