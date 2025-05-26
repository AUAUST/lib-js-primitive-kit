import { toTitleCase } from "@auaust/primitive-kit/strings";

import { describe, expect, it } from "vitest";

describe("toTitleCase()", () => {
  it("should work", () => {
    expect(toTitleCase("this is a string")).toBe("This Is A String");
    expect(toTitleCase("thisIsAString")).toBe("ThisIsAString");

    expect(toTitleCase("The brand FOOBAR is the best!")).toBe(
      "The Brand FOOBAR Is The Best!"
    );

    expect(toTitleCase("jean-claude van damme")).toBe("Jean-Claude Van Damme");

    expect(toTitleCase("I ate a crème brûlée")).toBe("I Ate A Crème Brûlée");
  });
});
