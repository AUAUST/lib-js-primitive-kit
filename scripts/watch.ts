import { spawn, spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const vitest = resolve(
  root,
  "node_modules/.bin",
  process.platform === "win32" ? "vitest.cmd" : "vitest",
);

const tsx = resolve(
  root,
  "node_modules/.bin",
  process.platform === "win32" ? "tsx.cmd" : "tsx",
);

const initialGeneration = spawnSync(tsx, ["scripts/compile.ts"], {
  cwd: root,
  stdio: "inherit",
});

if (initialGeneration.status !== 0) {
  process.exit(initialGeneration.status ?? 1);
}

const children = [
  spawn(tsx, ["scripts/compile.ts", "--watch"], {
    cwd: root,
    stdio: "inherit",
  }),
  spawn(vitest, ["--config", "vitest.config.ts", "--typecheck", "--"], {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  }),
];

let stopping = false;

function stop(signal: NodeJS.Signals = "SIGTERM") {
  if (stopping) return;
  stopping = true;

  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
}

for (const signal of ["SIGINT", "SIGTERM"] satisfies NodeJS.Signals[]) {
  process.on(signal, () => stop(signal));
}

for (const child of children) {
  child.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
    stop();
  });

  child.on("exit", (code, signal) => {
    if (stopping) return;
    process.exitCode = code ?? (signal ? 1 : 0);
    stop();
  });
}
