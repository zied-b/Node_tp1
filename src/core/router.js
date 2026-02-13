
import { parse } from "node:url";
function compilePath(pattern) {
const keys = [];
const regexStr = "^" + pattern.replace(/\/:([^/]+)/g, (_, key) =>
{
keys.push(key);
return "/([^/]+)";
}) + "$";
return { regex: new RegExp(regexStr), keys };
}
export class Router {
constructor() {
this.routes = [];
}
register(method, pathPattern, handler) {
const { regex, keys } = compilePath(pathPattern);
this.routes.push({ method, pathPattern, regex, keys, handler });
}
get(path, h) { this.register("GET", path, h); }
post(path, h) { this.register("POST", path, h); }
patch(path, h) { this.register("PATCH", path, h); }
delete(path, h) { this.register("DELETE", path, h); }
async handle(req, res) {
const { pathname, query } = parse(req.url, true);
for (const r of this.routes) {
if (r.method !== req.method) continue;
const m = pathname.match(r.regex);
if (!m) continue;
const params = {};
r.keys.forEach((k, i) => (params[k] = m[i + 1]));
return await r.handler(req, res, { params, query, pathname });
}
return null;
}
}
