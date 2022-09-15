import { Router } from "express"
import ProductController from "./app/controllers/ProductController"
import SessionsController from "./app/controllers/SessionsController"
import UserController from "./app/controllers/UserController"
import CategoryControler from "./app/controllers/CategoryControler"
import multer from "multer"
import multerConfig from "./config/multer"

import authMiddleware from "./app/middlewares/auth"
import OrderController from "./app/controllers/OrderController"
const upload = multer(multerConfig)

const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/sessions", SessionsController.store)

routes.use(authMiddleware)

routes.post("/product", upload.single("file"), ProductController.store)
routes.put("/product/:id", upload.single("file"), ProductController.update)
routes.get("/product", ProductController.index)

routes.post("/categories", upload.single("file"), CategoryControler.store)
routes.put("/categories/:id", upload.single("file"), CategoryControler.update)
routes.get("/categories", CategoryControler.index)

routes.post("/orders", OrderController.store)
routes.get("/orders", OrderController.index)
routes.put("/orders/:id", OrderController.update)

export default routes
