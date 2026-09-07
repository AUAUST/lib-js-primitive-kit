import { readdir, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const path = ((root: string) => ({
  root,
  resolve(...paths: string[]) {
    return paths.length ? resolve(root, ...paths) : root;
  },
}))(resolve(dirname(fileURLToPath(import.meta.url)), ".."));

type Group<T extends new (...args: any) => any = new (...args: any) => any> = {
  constructor: T;
  boilerplate: (method: string, isPrototype: boolean) => string[];
  ignore: (keyof T | keyof InstanceType<T>)[];
};

const groups = {
  arrays: {
    constructor: Array,
    boilerplate: (method: string, isPrototype: boolean) => [
      `import type { Arrayable } from "~/arrays/types";`,
      `import { toArray } from "./toArray";`,
      ``,
      `export function ${method}<T extends Arrayable>(array: T) {`,
      `  throw new Error("Method not implemented.");`,
      isPrototype
        ? `  return toArray(array).${method}();`
        : `  const a = toArray(array);`,
      `}`,
    ],
    ignore: ["copyWithin", "from", "of", "with"],
  } satisfies Group<ArrayConstructor>,
  functions: {
    constructor: Function,
    boilerplate: (method: string, isPrototype: boolean) => [
      ``,
      ``,
      `export function ${method}() {`,
      `  throw new Error("Method not implemented.");`,
      `}`,
    ],
    ignore: ["prototype"],
  } satisfies Group<FunctionConstructor>,
  numbers: {
    constructor: Number,
    boilerplate: (method: string, isPrototype: boolean) => [
      `import type { Numberifiable } from "~/numbers/types";`,
      `import { toNumber } from "./toNumber";`,
      ``,
      `export function ${method}(number: Numberifiable) {`,
      `  throw new Error("Method not implemented.");`,
      isPrototype
        ? `  return toNumber(number).${method}();`
        : `  const n = toNumber(number);`,
      `}`,
    ],
    ignore: [],
  } satisfies Group<NumberConstructor>,
  objects: {
    constructor: Object,
    boilerplate: (method: string, isPrototype: boolean) => [
      `import type { GenericRecord } from "~/objects/types";`,
      ``,
      `export function ${method}<T extends GenericRecord>(object: T) {`,
      `  throw new Error("Method not implemented.");`,
      `}`,
    ],
    ignore: ["is"],
  } satisfies Group<ObjectConstructor>,
  strings: {
    constructor: String,
    boilerplate: (method: string, isPrototype: boolean) => [
      `import type { Stringifiable } from "~/strings/types";`,
      `import { toString } from "./toString";`,
      ``,
      `export function ${method}(string: Stringifiable) {`,
      `  throw new Error("Method not implemented.");`,
      isPrototype
        ? `  return toString(string).${method}();`
        : `  const s = toString(string);`,
      `}`,
    ],
    ignore: ["raw", "trimLeft", "trimRight"],
  } satisfies Group<StringConstructor>,
};

const excludedMethods = new Set([
  "constructor",
  "prototype",
  "valueOf",
  "toString",
  "anchor",
  "big",
  "blink",
  "bold",
  "fixed",
  "fontcolor",
  "fontsize",
  "italics",
  "link",
  "small",
  "strike",
  "sub",
  "sup",
]);

const counters: Record<string, number> = {};

for (const [group, { constructor, boilerplate, ignore }] of Object.entries(
  groups,
)) {
  const ignoredMethods = new Set<string>(ignore);

  const existingMethods = new Set(
    (await readdir(path.resolve("src", group, "methods"))).map((file) =>
      file.replace(/\.[^/.]+$/, ""),
    ),
  );

  const prototypeMethods = Object.entries(
    Object.getOwnPropertyDescriptors(constructor.prototype),
  )
    .filter(
      ([name, descriptor]) =>
        !excludedMethods.has(name) &&
        !name.startsWith("_") &&
        typeof descriptor.value === "function",
    )
    .map(([name]) => name);

  const staticMethods = Object.entries(
    Object.getOwnPropertyDescriptors(constructor),
  )
    .filter(([name, descriptor]) => typeof descriptor.value === "function")
    .map(([name]) => name);

  const missingPrototypeMethods = prototypeMethods.filter(
    (method) => !existingMethods.has(method) && !ignoredMethods.has(method),
  );

  const missingStaticMethods = staticMethods.filter(
    (method) => !existingMethods.has(method) && !ignoredMethods.has(method),
  );

  function generateBoilerplate(method: string, isPrototype: boolean) {
    const [imports, body] = boilerplate(method, isPrototype)
      .filter((line) => line !== undefined)
      .join("\n")
      .split("\n\n")
      .map((part) => part.trim());

    return {
      imports:
        imports +
        (imports ? "\n" : "") +
        `import { defineMethod } from "~/compiler";`,
      body,
    };
  }

  for (const { name, isPrototype } of [
    ...missingPrototypeMethods.map((name) => ({
      name,
      isPrototype: true,
    })),
    ...missingStaticMethods.map((name) => ({
      name,
      isPrototype: false,
    })),
  ]) {
    const { imports, body } = generateBoilerplate(name, isPrototype);

    const definition =
      `export default defineMethod({` +
      (isPrototype ? `\n  instanceCallable: "chainable",\n` : "") +
      `})`;

    const content = imports + "\n\n" + definition + "\n\n" + body + "\n";

    const label = `${constructor.name}.${name}()`;

    const file = path.resolve("src", group, "methods", `${name}.ts`);

    console.log(
      `Writing file for ${label} at ${relative(process.cwd(), file)}`,
    );

    await writeFile(file, content);

    counters[group] = (counters[group] || 0) + 1;
  }
}

console.log(
  `Wrote ${Object.values(counters).reduce((a, b) => a + b, 0)} files (${Object.keys(
    counters,
  )
    .map((group) => `${group}: ${counters[group]}`)
    .join(", ")})`,
);
