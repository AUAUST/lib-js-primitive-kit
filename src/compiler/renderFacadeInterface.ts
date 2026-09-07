import { renderInstanceMethod } from "~/compiler/renderInstanceMethod";
import { renderJSDocs } from "~/compiler/renderJSDocs";
import type {
  FacadeSpecification,
  MethodSpecification,
} from "~/compiler/specifications";

export function renderFacadeInterface(
  facade: FacadeSpecification,
  methods: MethodSpecification[],
): string {
  const methodBlocks = methods.flatMap((method) => {
    const documentation = renderJSDocs(method.documentation, 1);

    return [
      [
        documentation && `  ${documentation}`,
        renderInstanceMethod(facade, method, method.name),
      ]
        .filter(Boolean)
        .join("\n"),
      ...method.methodAliases.map(
        (alias) =>
          `  /** @alias ${facade.name}.${method.name} */\n` +
          renderInstanceMethod(facade, method, alias),
      ),
    ];
  });

  const valueType = facade.class.valueTypeParameter ?? "never";

  const members = [
    ...(facade.class.callable
      ? [
          `  (this: ThisParameterType<${valueType}>, ...args: Parameters<${valueType}>): ReturnType<${valueType}>;`,
        ]
      : []),
    ...methodBlocks,
  ];

  if (!members.length) {
    return "";
  }

  const typeParameters = facade.class.typeParameters;

  return `interface ${facade.name}${typeParameters.length ? `<${typeParameters.join(", ")}>` : ""} {\n${members.join("\n\n")}\n}`;
}
