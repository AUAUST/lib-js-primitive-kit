import { relative } from "node:path";
import { compareNaturally } from "~/compiler/compareNaturally";

type ImportNames = {
  defaults: Set<string>;
  named: Set<string>;
  namespaces: Set<string>;
};

type ImportOptions = {
  from?: string;
  isType?: boolean;
  kind?: "default" | "named" | "namespace";
  localName?: string;
};

export class ImportCollector {
  readonly #base: string;
  readonly #code = new Map<string, ImportNames>();
  readonly #types = new Map<string, ImportNames>();

  constructor(base: string) {
    this.#base = base;
  }

  path(filename: string): string {
    return `./${relative(this.#base, filename).replace(/\\/g, "/")}`;
  }

  add(name: string, filename: string, options: ImportOptions = {}): void {
    const from = options.from ?? this.path(filename);

    const kind = options.kind ?? "named";

    const localName = options.localName ?? name;

    const renderedName = name === localName ? name : `${name} as ${localName}`;

    const key =
      kind === "default"
        ? "defaults"
        : kind === "namespace"
          ? "namespaces"
          : "named";

    const value = kind === "named" ? renderedName : localName;

    if (options.isType && this.#code.get(from)?.[key].has(value)) return;
    if (!options.isType) this.#types.get(from)?.[key].delete(value);

    const imports = options.isType ? this.#types : this.#code;

    const names = imports.get(from) ?? {
      defaults: new Set<string>(),
      named: new Set<string>(),
      namespaces: new Set<string>(),
    };

    names[key].add(value);
    imports.set(from, names);
  }

  render(): string {
    const typeLines = this.#renderMap(this.#types, true);

    const codeLines = this.#renderMap(this.#code, false);

    return [
      ...(typeLines.length ? [typeLines.join("\n")] : []),
      ...(codeLines.length ? [codeLines.join("\n")] : []),
    ].join("\n\n");
  }

  #renderMap(imports: Map<string, ImportNames>, isType: boolean): string[] {
    return Array.from(imports, ([from, names]) => ({ from, names }))
      .sort((left, right) => compareNaturally(left.from, right.from))
      .flatMap(({ from, names }) => {
        const defaults = Array.from(names.defaults).sort(compareNaturally);

        const named = Array.from(names.named).sort(compareNaturally);

        const namespaces = Array.from(names.namespaces).sort(compareNaturally);

        const clauses = [
          ...defaults,
          ...namespaces.map((name) => `* as ${name}`),
          ...(named.length ? [`{ ${named.join(", ")} }`] : []),
        ];

        return clauses.map(
          (clause) =>
            `import${isType ? " type" : ""} ${clause} from ${JSON.stringify(from)};`,
        );
      });
  }
}
