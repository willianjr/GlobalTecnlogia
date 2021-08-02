import { Request, Response, NextFunction } from 'express'
import Auth from '../../config/auth'
import Jwt from 'jsonwebtoken'
// import util from 'util'
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

const AuthMidlewares = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ error: true, message: 'Não foi passado um token' })
    const [, token] = auth.split(' ')
    await Jwt.verify(token, Auth.secret, (error, data) => {
      if (error) return res.status(401).json({ error: true, message: error.message })
      if (data) {
        req.userId = data.id
      }
    })
    next()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export default AuthMidlewares
