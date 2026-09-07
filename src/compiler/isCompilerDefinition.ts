export function isCompilerDefinition(filename: string | null | undefined) {
  const normalized = filename?.replace(/\\/g, "/");

  return Boolean(
    normalized &&
      (normalized.endsWith("/facade.ts") ||
        normalized.endsWith("/types.ts") ||
        normalized.includes("/methods/")),
  );
}
