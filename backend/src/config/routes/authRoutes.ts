import { Router } from 'express'

import AuthController from '../../api/controllers/authController'

const routes = Router()

routes.post('/', AuthController.login)
routes.get('/:id', AuthController.isLogin)

export default routes
