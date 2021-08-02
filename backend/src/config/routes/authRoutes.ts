import { Router } from 'express'

import AuthController from '../../api/controllers/authController'

const routes = Router()

routes.post('/', AuthController.login)
routes.delete('/:id', AuthController.logout)
routes.get('/:id', AuthController.isLogin)

export default routes
