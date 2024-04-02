import { builtinModules } from "module";
import { basename, resolve } from "path";
import { cwd } from "process";

import terser from "@rollup/plugin-terser";
import ts from "rollup-plugin-ts";

import pkg from "./package.json" assert { type: "json" };

const currDir = cwd();
const outDir = resolve(currDir, "dist");

const entries = {
  index: "src/index.ts",
  arrays: "src/arrays/methods.ts",
  booleans: "src/booleans/methods.ts",
  functions: "src/functions/methods.ts",
  numbers: "src/numbers/methods.ts",
  objects: "src/objects/methods.ts",
  primitives: "src/primitives/methods.ts",
  strings: "src/strings/methods.ts",
};

export default {
  input: entries,
  output: [
    {
      dir: resolve(outDir, "cjs"),
      format: "cjs",
    },
    {
      dir: resolve(outDir, "esm"),
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [
    ...builtinModules,
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    ts({
      hook: {
        outputPath: (path, kind) =>
          kind === "declaration"
            ? resolve(outDir, "types", basename(path))
            : path,
      },
    }),
    terser(),
  ],
};
