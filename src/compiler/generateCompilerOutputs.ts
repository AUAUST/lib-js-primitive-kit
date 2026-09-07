import { dirname, resolve } from "node:path";
import { Project } from "ts-morph";
import { compareNaturally } from "~/compiler/compareNaturally";
import { renderBarrel } from "~/compiler/renderBarrel";
import type { ExportDefinition } from "~/compiler/renderExports";
import { renderFacade } from "~/compiler/renderFacade";
import { resolveFacadeDefinition } from "~/compiler/resolveFacadeDefinition";
import { resolveMethodDefinition } from "~/compiler/resolveMethodDefinition";
import { resolveTypeDefinitions } from "~/compiler/resolveTypeDefinitions";
import type { CompilerGroup, CompilerPaths } from "~/compiler/specifications";

export function generateCompilerOutputs(
  paths: CompilerPaths,
  groups: CompilerGroup[],
): Map<string, string> {
  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: paths.resolve("tsconfig.json"),
  });

  const outputs = new Map<string, string>();

  const globalBarrel: ExportDefinition[] = [];

  for (const group of groups) {
    const facade = resolveFacadeDefinition(
      project.addSourceFileAtPath(group.facadePath),
    );

    const methodFiles = project
      .addSourceFilesAtPaths(resolve(group.methodsDirectory, "*.ts"))
      .sort((left, right) =>
        compareNaturally(left.getFilePath(), right.getFilePath()),
      );

    const methods = methodFiles.map(resolveMethodDefinition);

    const typesFile = project.addSourceFileAtPathIfExists(group.typesPath);

    const typeDefinitions = [
      ...(typesFile ? resolveTypeDefinitions(typesFile) : []),
      ...methodFiles.flatMap(resolveTypeDefinitions),
    ];

    const typeExports: ExportDefinition[] = typeDefinitions.map((type) => ({
      name: type.name,
      from: type.filename,
      isType: true,
    }));

    const base = paths.resolve("src", group.name);

    const methodsBarrel: ExportDefinition[] = [...typeExports];

    globalBarrel.push(
      { name: facade.name, from: base },
      ...(facade.factory ? [{ name: facade.factory, from: base }] : []),
      ...facade.aliases.map((alias) => ({
        name: facade.name,
        as: alias,
        from: base,
      })),
      ...typeDefinitions.map((type) => ({
        name: type.name,
        from: base,
        isType: true,
      })),
      { name: `${facade.name}Instance`, from: base, isType: true },
    );

    for (const method of methods) {
      methodsBarrel.push(
        { name: method.name, from: method.filename },
        ...method.helperAliases.map((alias) => ({
          name: method.name,
          as: alias,
          from: method.filename,
        })),
      );
    }

    outputs.set(
      group.methodsOutput,
      renderBarrel(methodsBarrel, dirname(group.methodsOutput)),
    );

    outputs.set(
      group.facadeOutput,
      renderFacade(facade, methods, typeExports, dirname(group.facadeOutput)),
    );
  }

  outputs.set(
    paths.entrypoint,
    renderBarrel(globalBarrel, dirname(paths.entrypoint)),
  );

  return outputs;
}
