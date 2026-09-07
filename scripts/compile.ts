import { watch } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { discoverCompilerGroups } from "~/compiler/discoverCompilerGroups";
import { generateCompilerOutputs } from "~/compiler/generateCompilerOutputs";
import { isCompilerDefinition } from "~/compiler/isCompilerDefinition";
import { resolveCompilerPaths } from "~/compiler/resolveCompilerPaths";
import { writeCompilerOutputs } from "~/compiler/writeCompilerOutputs";

const paths = resolveCompilerPaths(
  resolve(dirname(fileURLToPath(import.meta.url)), ".."),
);

const options = {
  check: process.argv.includes("--check") || process.argv.includes("-c"),
  watch: process.argv.includes("--watch") || process.argv.includes("-w"),
};

async function compile() {
  const groups = await discoverCompilerGroups(paths);

  const outputs = generateCompilerOutputs(paths, groups);

  await writeCompilerOutputs(outputs, options.check);
}

async function runGeneration() {
  try {
    await compile();
    console.log("Compiled method metadata.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);

    if (!options.watch) {
      process.exitCode = 1;
    }
  }
}

await runGeneration();

if (options.watch) {
  console.log("Watching facade, method, and type definitions…");

  for await (const event of watch(paths.src, { recursive: true })) {
    if (isCompilerDefinition(event.filename)) {
      await runGeneration();
    }
  }
}
