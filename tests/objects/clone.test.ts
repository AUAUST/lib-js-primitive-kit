import { clone } from "@auaust/primitive-kit/objects";

import { expect, test } from "vitest";

test("clone() works", () => {
  expect(clone("foo")).toBe("foo");

  expect(clone(0)).toBe(0);

  expect(clone(true)).toBe(true);

  expect(clone(false)).toBe(false);

  expect(clone(null)).toBe(null);

  {
    const obj = {
      foo: {
        bar: {
          baz: {
            qux: "quux",
          },
        },
      },
    };

    expect(clone(obj)).toEqual(obj);

    expect(clone(obj)).not.toBe(obj);
  }

  {
    const array = ["foo", "bar", "baz"];

    // By default, arrays are cloned.
    expect(clone(array)).toEqual(array);

    expect(clone(array)).not.toBe(array);

    // If the second argument is `false`, arrays are copied by reference.
    expect(clone(array, false)).toEqual(array);

    expect(clone(array, false)).toBe(array);
  }

  {
    const complexe = {
      foo: {
        bar: {
          baz: {
            qux: "quux",
          },
          crux: {
            lux: [
              1,
              {
                fux: 1,
              },
            ],
          },
        },
      },
      bar: [
        [
          [1],
          {
            foo: "bar",
            map: [1],
          },
        ],
        1,
        {
          foo: "bar",
          map: [1],
        },
      ],
    };

    expect(clone(complexe)).toEqual(complexe);

    expect(clone(complexe)).not.toBe(complexe);

    expect(clone(complexe, false)).toEqual(complexe);

    expect(clone(complexe, false)).not.toBe(complexe);

    // Cloned object should deeply clone arrays by default, thus `clone(complexe).bar` should be a copy of `complexe.bar`.
    expect(clone(complexe).bar).not.toBe(complexe.bar);
    // If cloneArrays is false, `clone(complexe, false).bar` should be a reference to `complexe.bar`.
    expect(clone(complexe, false).bar).toBe(complexe.bar);
  }

  {
    const array = [1, [2, [3, [4, [5, [2, [7, [8, [9, [10]]]]]]]]]] as const;

    expect(clone(array)).toEqual(array);

    expect(clone(array)).not.toBe(array);

    expect(clone(array, false)).toEqual(array);

    expect(clone(array)[1][1][1][1][1]).not.toBe(array[1][1][1][1][1]);

    expect(clone(array)[1][1][1][1][1]).toEqual(array[1][1][1][1][1]);

    expect(clone(array, false)[1][1][1][1][1]).toBe(array[1][1][1][1][1]);
  }
});
