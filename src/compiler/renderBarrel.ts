import { relative } from "node:path";

export type ExportDefinition = {
  name: string;
  from: string;
  as?: string;
  isType?: boolean;
};

const naturalCollator = new Intl.Collator("en", {
  numeric: true,
  sensitivity: "base",
});

export function compareNaturally(left: string, right: string): number {
  return (
    naturalCollator.compare(left, right) ||
    left.localeCompare(right, "en", { numeric: true })
  );
}

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

  const entries = Object.entries(map)
    .map(([path, exports]) => ({
      from: `./${relative(base, path).replace(/\\/g, "/")}`,
      ...exports,
    }))
    .sort((left, right) => compareNaturally(left.from, right.from));

  const renderNames = (names: { name: string; as?: string }[]) =>
    names
      .toSorted(
        (left, right) =>
          compareNaturally(left.name, right.name) ||
          Number(Boolean(left.as)) - Number(Boolean(right.as)) ||
          compareNaturally(left.as ?? "", right.as ?? ""),
      )
      .map(({ name, as }) => (as ? `${name} as ${as}` : name))
      .join(", ");

  const typeLines: string[] = [];
  const codeLines: string[] = [];

  for (const { from, type, code } of entries) {

    if (type.length > 0) {
      typeLines.push(
        `export type { ${renderNames(type)} } from ${JSON.stringify(from)};`,
      );
    }

    if (code.length > 0) {
      codeLines.push(
        `export { ${renderNames(code)} } from ${JSON.stringify(from)};`,
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
