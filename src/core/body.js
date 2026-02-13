export async function readJsonBody(req, { limitBytes = 1_000_000 } =
{}) {
return await new Promise((resolve, reject) => {
let size = 0;
let raw = "";
req.on("data", (chunk) => {
size += chunk.length;
if (size > limitBytes) {
reject(Object.assign(new Error("Payload too large"), {
statusCode: 413 }));
req.destroy();
return;
}
raw += chunk.toString("utf-8");
});
req.on("end", () => {
if (!raw) return resolve(null);
try {
resolve(JSON.parse(raw));
} catch {
reject(Object.assign(new Error("Invalid JSON"), {
statusCode: 400 }));
}
});
req.on("error", (err) => reject(err));
});
}
