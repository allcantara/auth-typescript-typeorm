import { Router } from 'express'

import middleware from './app/middlewares/auth'

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'

const routes = Router()

routes.post('/users', UserController.store)
routes.post('/session', AuthController.authenticate)

routes.use(middleware)

routes.get('/session', UserController.index)

export default routes
