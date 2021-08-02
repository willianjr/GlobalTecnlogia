import { Router } from 'express'

import UserRoutes from './userRoutes'
import AuthRoutes from './authRoutes'

const routes = Router()

routes.use('/User', UserRoutes)
routes.use('/Auth', AuthRoutes)

export default routes
