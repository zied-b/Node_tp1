import http from "node:http";
import { Router } from "./core/router.js";
import { sendJson, sendText } from "./core/send.js";
import { registerTaskRoutes } from "./routes/tasks.routes.js";
const router = new Router();
router.get("/health", async (req, res) => {
sendJson(res, 200, { status: "ok" });
});
registerTaskRoutes(router);
const server = http.createServer(async (req, res) => {
try {
const handled = await router.handle(req, res);
if (handled === null) {
sendText(res, 404, "Not Found");
}
} catch (err) {
const status = err.statusCode || 500;
sendJson(res, status, { error: err.message || "Internal Server Error" });
}
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
