import { groupBy } from "@auaust/primitive-kit/objects";

import { expect } from "vitest";
import { Equal, Expect } from "type-testing";
import { test } from "vitest";

test("groupBy() works", () => {
  {
    const objs = [
      { type: "A", value: 1 as number },
      { type: "B", value: 2 as number },
      { type: "A", value: 3 as number },
      { type: "B", value: 4 as number },
      { type: "C", value: 5 as number },
      { type: "D", value: 6 as number },
    ] as const;

    const groupedByProp = groupBy(objs, "type");

    expect(groupedByProp).toEqual({
      A: [
        { type: "A", value: 1 },
        { type: "A", value: 3 },
      ],
      B: [
        { type: "B", value: 2 },
        { type: "B", value: 4 },
      ],
      C: [{ type: "C", value: 5 }],
      D: [{ type: "D", value: 6 }],
    });

    const groupedByFn = groupBy(objs, (obj) =>
      obj.value % 2 === 0 ? "even" : "odd"
    );

    expect(groupedByFn).toEqual({
      even: [
        {
          type: "B",
          value: 2,
        },
        {
          type: "B",
          value: 4,
        },
        {
          type: "D",
          value: 6,
        },
      ],
      odd: [
        {
          type: "A",
          value: 1,
        },
        {
          type: "A",
          value: 3,
        },
        {
          type: "C",
          value: 5,
        },
      ],
    });

    type Test = Expect<
      Equal<
        typeof groupedByFn,
        Record<
          "even" | "odd",
          (
            | {
                readonly type: "A";
                readonly value: number;
              }
            | {
                readonly type: "B";
                readonly value: number;
              }
            | {
                readonly type: "C";
                readonly value: number;
              }
            | {
                readonly type: "D";
                readonly value: number;
              }
          )[]
        >
      >
    >;
  }

  {
    const objs = [
      {
        type: "cat",
        name: "Whiskers",
        hasHair: true,
        likesMilk: true,
      },
      {
        type: "dog",
        name: "Rex",
        hasHair: true,
        likesCats: false,
      },
      {
        type: "cat",
        name: "Fluffy",
        hasHair: true,
        likesMilk: false,
      },
      {
        type: "dog",
        name: "Buddy",
        hasHair: true,
        likesCats: true,
      },
      {
        type: "fish",
        name: "Goldie",
        hasHair: false,
        breathesWater: true,
      },
      {
        type: "bird",
        name: "Polly",
        hasHair: false,
        flies: true,
      },
    ] as const;

    const animalsByType = groupBy(objs, "type");

    expect(animalsByType.fish).toEqual([
      {
        type: "fish",
        name: "Goldie",
        hasHair: false,
        breathesWater: true,
      },
    ]);

    type TestCat = Expect<
      Equal<
        typeof animalsByType.cat,
        (
          | Readonly<{
              type: "cat";
              name: "Whiskers";
              hasHair: true;
              likesMilk: true;
            }>
          | Readonly<{
              type: "cat";
              name: "Fluffy";
              hasHair: true;
              likesMilk: false;
            }>
        )[]
      >
    >;

    type TestFish = Expect<
      Equal<
        typeof animalsByType.fish,
        Readonly<{
          type: "fish";
          name: "Goldie";
          hasHair: false;
          breathesWater: true;
        }>[]
      >
    >;
  }
});
