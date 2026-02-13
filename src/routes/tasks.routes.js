import * as ctrl from "../controllers/tasks.controller.js";
export function registerTaskRoutes(router) {
router.get("/tasks", ctrl.list);
router.get("/tasks/:id", ctrl.getOne);
router.post("/tasks", ctrl.create);
router.patch("/tasks/:id", ctrl.update);
router.delete("/tasks/:id", ctrl.remove);
}
