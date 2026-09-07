import { ImportCollector } from "~/compiler/importCollector";
import { renderJSDocs } from "~/compiler/renderJSDocs";
import type {
  FacadeSpecification,
  MethodSpecification,
} from "~/compiler/specifications";

export function collectMethodLines(
  facade: FacadeSpecification,
  methods: MethodSpecification[],
  imports: ImportCollector,
) {
  const result = {
    chainable: [] as string[],
    instance: [] as string[],
    static: [] as string[],
  };

  for (const method of methods) {
    imports.add(method.name, method.filename);

    for (const dependency of method.instanceSignature?.imports ?? []) {
      imports.add(dependency.name, dependency.filename ?? "", {
        from: dependency.filename
          ? imports.path(dependency.filename)
          : dependency.moduleSpecifier,
        isType: true,
        kind: dependency.kind,
        localName: dependency.localName,
      });
    }

    const documentation = renderJSDocs(method.documentation, 1);
    const lines = [
      ...(documentation ? [documentation] : []),
      `${method.name},`,
      ...method.methodAliases.flatMap((alias) => [
        `/** @alias ${facade.name}.${method.name} */`,
        `${alias}: ${method.name},`,
      ]),
    ];

    if (method.instanceCallable === "chainable") {
      result.chainable.push(...lines);
    } else if (method.instanceCallable) {
      result.instance.push(...lines);
    } else {
      result.static.push(...lines);
    }
  }

  return result;
}
