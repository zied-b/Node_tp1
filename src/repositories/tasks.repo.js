import fs from "node:fs/promises";
import path from "node:path";
const DB_PATH = path.join(process.cwd(), "data", "tasks.json");
export async function readAll() {
const raw = await fs.readFile(DB_PATH, "utf-8");
return JSON.parse(raw);
}
export async function writeAll(tasks) {
await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
}
