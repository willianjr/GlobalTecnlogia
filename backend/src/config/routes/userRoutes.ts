import { Router } from 'express'

import UserController from '../../api/controllers/userController'

const routes = Router()
// routes.use('/api')
/* ROUTES PAPER -=> API/PAPER */
routes.get('/count', UserController.count)
routes.get('/', UserController.getAll)
routes.get('/:id', UserController.getID)
routes.post('/', UserController.save)
routes.put('/:id', UserController.update)
routes.delete('/:id', UserController.delete)

export default routes
