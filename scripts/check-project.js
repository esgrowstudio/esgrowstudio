import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
for (const file of [
  "vite.config.js",
  "scripts/postbuild.js",
  "src/lib/googleSheets.js",
  "src/lib/inquiryId.js",
])
  execFileSync(process.execPath, ["--check", file]);
new vm.Script(fs.readFileSync("integrations/google-sheets/Code.gs", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
for (const name of [
  "express",
  "express-rate-limit",
  "helmet",
  "mongoose",
  "dotenv",
  "concurrently",
])
  assert.ok(
    !pkg.dependencies?.[name] && !pkg.devDependencies?.[name],
    `Unexpected backend dependency: ${name}`,
  );
assert.ok(!fs.existsSync("server"), "Backend directory must be removed");
const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
assert.equal(vercel.outputDirectory, "dist");
assert.equal(vercel.framework, "vite");
assert.ok(!vercel.functions);
console.log(
  "Frontend project, Apps Script syntax and static Vercel configuration passed.",
);
