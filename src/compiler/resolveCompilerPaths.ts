import { resolve } from "node:path";
import type { CompilerPaths } from "~/compiler/specifications";

export function resolveCompilerPaths(root: string): CompilerPaths {
  return {
    root,
    src: resolve(root, "src"),
    entrypoint: resolve(root, "src/index.ts"),
    resolve(...paths: string[]) {
      return paths.length ? resolve(root, ...paths) : root;
    },
  };
}
