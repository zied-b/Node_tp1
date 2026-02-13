

export function sendJson(res, statusCode, data) {
const body = JSON.stringify(data);
res.writeHead(statusCode, {
"Content-Type": "application/json; charset=utf-8",
"Content-Length": Buffer.byteLength(body),
});
res.end(body);
}
export function sendText(res, statusCode, text) {
res.writeHead(statusCode, { "Content-Type": "text/plain;charset=utf-8" });
res.end(text);
}
