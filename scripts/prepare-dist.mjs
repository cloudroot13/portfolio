import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

if (!existsSync("out")) {
  throw new Error("A exportação estática não gerou a pasta out.");
}

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist/server", { recursive: true });
mkdirSync("dist/client", { recursive: true });
mkdirSync("dist/.openai", { recursive: true });
cpSync("out", "dist/client", { recursive: true });
cpSync(".openai/hosting.json", "dist/.openai/hosting.json");

const assets = {};
const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const file = resolve(directory, name);
    if (statSync(file).isDirectory()) walk(file);
    else {
      const path = `/${relative(resolve("out"), file).split(sep).join("/")}`;
      assets[path] = readFileSync(file).toString("base64");
    }
  }
};
walk(resolve("out"));
assets["/"] = assets["/index.html"];

writeFileSync(
  "dist/server/index.js",
  `const assets = ${JSON.stringify(assets)};
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};
const decode = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = assets[url.pathname] ? url.pathname : (!url.pathname.includes(".") ? "/" : "");
    if (!path) return new Response("Not found", { status: 404 });
    const extension = path.includes(".") ? path.slice(path.lastIndexOf(".")) : ".html";
    return new Response(decode(assets[path]), {
      headers: {
        "content-type": types[extension] || "application/octet-stream",
        "cache-control": extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
      }
    });
  }
};
`,
);
