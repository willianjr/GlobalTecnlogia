import { Router } from 'express'
import AuthMidlewares from '../../api/midlewares/authMidlewares'
import UserController from '../../api/controllers/userController'

const routes = Router()
// routes.use('/api')
/* ROUTES PAPER -=> API/PAPER */
routes.get('/count', AuthMidlewares, UserController.count)
routes.get('/', AuthMidlewares, UserController.getAll)
routes.get('/:id', AuthMidlewares, UserController.getID)
routes.post('/', AuthMidlewares, UserController.save)
routes.put('/:id', AuthMidlewares, UserController.update)
routes.delete('/:id', AuthMidlewares, UserController.delete)

export default routes
