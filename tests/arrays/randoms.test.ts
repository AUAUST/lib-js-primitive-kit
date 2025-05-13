import { randoms } from "@auaust/primitive-kit/arrays";

import { describe, expect, it } from "vitest";

describe("randoms()", () => {
  it("should return a copy of the array", () => {
    const input = [1, 2, 3, 4, 5];
    const output = randoms(input);

    expect(output).not.toBe(input); // new array
    expect(output).not.toEqual(input); // different order
  });

  it("should return the amount of elements specified", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(randoms(input, 3)).toHaveLength(3);
    expect(randoms(input, 5)).toHaveLength(5);
  });

  it("should not return more than the input length", () => {
    expect(randoms([1, 2, 3], 4)).toHaveLength(3);
    expect(randoms([1, 2, 3], 0)).toHaveLength(0);
    expect(randoms([], 10)).toHaveLength(0);
  });

  it("should return elements from the input array", () => {
    const input = [1, 2, 3];
    const output = randoms(input);

    expect(input).toEqual(expect.arrayContaining(output));
  });

  it("should return elements in random order", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const output = randoms(input);

    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(output).not.toEqual(input);
    expect(input).toEqual(expect.arrayContaining(output));
  });
});
