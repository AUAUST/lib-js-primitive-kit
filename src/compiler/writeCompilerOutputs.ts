import { readFile, writeFile } from "node:fs/promises";

export async function writeCompilerOutputs(
  outputs: Map<string, string>,
  check: boolean,
): Promise<void> {
  const outOfDate: string[] = [];

  for (const [filename, content] of outputs) {
    const current = await readFile(filename, "utf8").catch(() => undefined);

    if (current === content) {
      continue;
    }

    if (check) {
      outOfDate.push(filename);
    } else {
      await writeFile(filename, content);
    }
  }

  if (outOfDate.length) {
    throw new Error(
      `Compiled files are out of date:\n${outOfDate
        .map((filename) => `- ${filename}`)
        .join("\n")}`,
    );
  }
}
