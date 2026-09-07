import { readFile } from "node:fs/promises";
import { defineConfig, type Options } from "tsup";
import ts from "typescript";

const stripMethodDefinitions: NonNullable<Options["esbuildPlugins"]>[number] = {
  name: "strip-method-definitions",
  setup(build) {
    build.onLoad(
      { filter: /[/\\]src[/\\][^/\\]+[/\\]methods[/\\][^/\\]+\.ts$/ },
      async ({ path }) => {
        let contents = await readFile(path, "utf8");
        const sourceFile = ts.createSourceFile(
          path,
          contents,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TS,
        );

        const definitions = sourceFile.statements.filter(
          (statement) =>
            ts.isExportAssignment(statement) &&
            ts.isCallExpression(statement.expression) &&
            ts.isIdentifier(statement.expression.expression) &&
            statement.expression.expression.text === "defineMethod",
        );

        for (const definition of definitions.reverse()) {
          contents =
            contents.slice(0, definition.getFullStart()) +
            contents.slice(definition.getEnd());
        }

        return { contents, loader: "ts" };
      },
    );
  },
};

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
  clean: false,
  dts: true,
  esbuildPlugins: [stripMethodDefinitions],
  format: ["esm", "cjs"],
  minify: true,
  outDir: "dist",
  sourcemap: true,
  splitting: true,
});
