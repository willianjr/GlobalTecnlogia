import { Router } from 'express'

import UserRoutes from './userRoutes'

const routes = Router()


routes.use('/User', UserRoutes)

export default routes
