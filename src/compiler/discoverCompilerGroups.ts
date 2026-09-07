import { glob } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { compareNaturally } from "~/compiler/compareNaturally";
import type {
  CompilerGroup,
  CompilerPaths,
} from "~/compiler/specifications";

export async function discoverCompilerGroups(
  paths: CompilerPaths,
): Promise<CompilerGroup[]> {
  const facadePaths = await Array.fromAsync(
    glob(paths.resolve("src/*/facade.ts")),
  );

  return facadePaths
    .map((facadePath) => {
      const directory = dirname(facadePath);

      return {
        name: directory.split("/").at(-1)!,
        facadePath,
        methodsDirectory: resolve(directory, "methods"),
        typesPath: resolve(directory, "types.ts"),
        methodsOutput: resolve(directory, "methods.ts"),
        facadeOutput: resolve(directory, "index.ts"),
      };
    })
    .sort((left, right) => compareNaturally(left.name, right.name));
}
