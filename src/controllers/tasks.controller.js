import { readAll, writeAll } from "../repositories/tasks.repo.js";
import { newId } from "../utils/id.js";
import { readJsonBody } from "../core/body.js";
import { sendJson } from "../core/send.js";
function httpError(statusCode, message) {
const err = new Error(message);
err.statusCode = statusCode;
return err;
}
export async function list(req, res) {
const tasks = await readAll();
return sendJson(res, 200, tasks);
}
export async function getOne(req, res, { params }) {
const tasks = await readAll();
const task = tasks.find((t) => t.id === params.id);
if (!task) throw httpError(404, "Task not found");
return sendJson(res, 200, task);
}
export async function create(req, res) {
const body = await readJsonBody(req);
const title = body?.title;
if (typeof title !== "string" || title.trim().length < 3) {
throw httpError(400, "title is required (min 3 chars)");
}
const tasks = await readAll();
const now = new Date().toISOString();
const task = {
id: newId(),
title: title.trim(),
done: false,
createdAt: now,
updatedAt: now,
};
tasks.push(task);
await writeAll(tasks);
return sendJson(res, 201, task);
}
export async function update(req, res, { params }) {
const body = await readJsonBody(req);
const tasks = await readAll();
const idx = tasks.findIndex((t) => t.id === params.id);
if (idx === -1) throw httpError(404, "Task not found");
if (body?.title !== undefined) {
if (typeof body.title !== "string" || body.title.trim().length <
3) {
throw httpError(400, "title must be a string (min 3 chars)");
}
tasks[idx].title = body.title.trim();
}
if (body?.done !== undefined) {
if (typeof body.done !== "boolean") {
throw httpError(400, "done must be a boolean");
}
tasks[idx].done = body.done;
}
tasks[idx].updatedAt = new Date().toISOString();
await writeAll(tasks);
return sendJson(res, 200, tasks[idx]);
}
export async function remove(req, res, { params }) {
const tasks = await readAll();
const idx = tasks.findIndex((t) => t.id === params.id);
if (idx === -1) throw httpError(404, "Task not found");
const deleted = tasks.splice(idx, 1)[0];
await writeAll(tasks);
return sendJson(res, 200, deleted);
}

