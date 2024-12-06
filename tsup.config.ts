import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    arrays: "src/arrays/methods.ts",
    booleans: "src/booleans/methods.ts",
    functions: "src/functions/methods.ts",
    numbers: "src/numbers/methods.ts",
    objects: "src/objects/methods.ts",
    primitives: "src/primitives/methods.ts",
    strings: "src/strings/methods.ts",
  },
  format: ["esm", "cjs"],
  outDir: "dist",
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
});
