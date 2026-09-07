import { ImportCollector } from "~/compiler/importCollector";
import { collectMethodLines } from "~/compiler/collectMethodLines";
import { type ExportDefinition, renderExports } from "~/compiler/renderExports";
import { renderFacadeExport } from "~/compiler/renderFacadeExport";
import { renderFacadeFactory } from "~/compiler/renderFacadeFactory";
import { renderFacadeInstanceType } from "~/compiler/renderFacadeInstanceType";
import { renderFacadeInterface } from "~/compiler/renderFacadeInterface";
import { renderMethodRecord } from "~/compiler/renderMethodRecord";
import type {
  FacadeSpecification,
  MethodSpecification,
} from "~/compiler/specifications";

export function renderFacade(
  facade: FacadeSpecification,
  methods: MethodSpecification[],
  types: ExportDefinition[],
  base: string,
): string {
  const imports = new ImportCollector(base);

  for (const dependency of facade.class.imports) {
    imports.add(dependency.name, dependency.filename ?? "", {
      from: dependency.filename
        ? imports.path(dependency.filename)
        : dependency.moduleSpecifier,
      isType: dependency.isType,
      kind: dependency.kind,
      localName: dependency.localName,
    });
  }

  const methodLines = collectMethodLines(facade, methods, imports);

  if (facade.callable) {
    imports.add(facade.callable.name, facade.callable.filename);
  }
  if (methodLines.instance.length || methodLines.chainable.length) {
    imports.add("assignMethods", "", { from: "../shared/assignMethods" });
  }

  const instanceMethods = methods.filter(
    (method) => method.instanceCallable !== false,
  );
  const instanceDeclarations = Array.from(
    new Set(
      instanceMethods.flatMap(
        (method) => method.instanceSignature?.declarations ?? [],
      ),
    ),
  ).join("\n\n");
  const records = [
    methodLines.static.length &&
      renderMethodRecord("staticMethods", methodLines.static),
    methodLines.instance.length &&
      renderMethodRecord("instanceMethods", methodLines.instance),
    methodLines.chainable.length &&
      renderMethodRecord("chainableMethods", methodLines.chainable),
  ]
    .filter(Boolean)
    .join("\n\n");
  const installation = [
    methodLines.instance.length &&
      `assignMethods(${facade.name}, instanceMethods, false);`,
    methodLines.chainable.length &&
      `assignMethods(${facade.name}, chainableMethods, true);`,
  ]
    .filter(Boolean)
    .join("\n");
  const composition = `const ${facade.name}WithMethods = Object.assign(${facade.name}, ${[
    methodLines.static.length && "staticMethods",
    methodLines.instance.length && "instanceMethods",
    methodLines.chainable.length && "chainableMethods",
  ]
    .filter(Boolean)
    .join(", ")});`;
  const sections = [
    "// This file is generated. Do not edit it directly.\n\n",
    imports.render(),
    instanceDeclarations,
    facade.class.code,
    renderFacadeInterface(facade, instanceMethods),
    records,
    installation,
    composition,
    renderFacadeInstanceType(facade),
    renderFacadeFactory(facade),
  ]
    .map((value) => value.trim())
    .filter(Boolean)
    .join("\n\n");
  const exports = renderFacadeExport(facade);
  const typeExports = types.length ? `\n${renderExports(types, base)}` : "";

  return `${sections}\n\n${exports}${typeExports}`.trimEnd() + "\n";
}
