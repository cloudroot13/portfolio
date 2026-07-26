import { cpSync, existsSync, rmSync } from "node:fs";

if (!existsSync("out")) {
  throw new Error("A exportação estática não gerou a pasta out.");
}

rmSync("dist", { recursive: true, force: true });
cpSync("out", "dist", { recursive: true });
