import { Router } from "express"
import ProductController from "./app/controllers/ProductController"
import SessionsController from "./app/controllers/SessionsController"
import UserController from "./app/controllers/UserController"
import CategoryControler from "./app/controllers/CategoryControler"
import multer from "multer"
import multerConfig from "./config/multer"

import authMiddleware from "./app/middlewares/auth"
const upload = multer(multerConfig)

const routes = new Router()

routes.post("/users", UserController.store)

routes.post("/sessions", SessionsController.store)

routes.use(authMiddleware)
routes.post("/product", upload.single("file"), ProductController.store)

routes.get("/product", ProductController.index)

routes.post("/categories", CategoryControler.store)

routes.get("/categories", CategoryControler.index)

export default routes
