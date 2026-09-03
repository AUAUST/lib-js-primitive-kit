import { relative } from "node:path";

export type ExportDefinition = {
  name: string;
  from: string;
  as?: string;
  isType?: boolean;
};

export function renderExports(
  exports: ExportDefinition[],
  base: string,
): string {
  const map: Record<
    string,
    {
      type: { name: string; as?: string }[];
      code: { name: string; as?: string }[];
    }
  > = {};

  for (const exp of exports) {
    const { from, isType, name, as } = exp;

    if (!map[from]) {
      map[from] = { type: [], code: [] };
    }

    if (isType) {
      map[from].type.push({ name, as });
    } else {
      map[from].code.push({ name, as });
    }
  }

  const typeLines: string[] = [];
  const codeLines: string[] = [];

  for (const path in map) {
    const from = `./${relative(base, path).replace(/\\/g, "/")}`;

    const { type, code } = map[path];

    if (type.length > 0) {
      typeLines.push(
        `export type { ${type
          .map(({ name, as }) => (as ? `${name} as ${as}` : name))
          .join(", ")} } from ${JSON.stringify(from)};`,
      );
    }

    if (code.length > 0) {
      codeLines.push(
        `export { ${code
          .map(({ name, as }) => (as ? `${name} as ${as}` : name))
          .join(", ")} } from ${JSON.stringify(from)};`,
      );
    }
  }

  return (
    (typeLines.length ? typeLines.join("\n") + "\n\n" : "") +
    (codeLines.length ? codeLines.join("\n") + "\n" : "")
  );
}

export function renderBarrel(
  exports: ExportDefinition[],
  base: string,
): string {
  return (
    `// This file is generated. Do not edit it directly.\n\n` +
    renderExports(exports, base)
  ).trimEnd() + "\n";
}
