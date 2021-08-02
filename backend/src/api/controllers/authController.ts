import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { UserModel } from '../models/userModel'
import Jwt from 'jsonwebtoken'
import Auth from '../../config/auth'

class AuthController {
  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      console.log(email, password)
      const UserRepository = await getConnection().getRepository(UserModel)
      const user = await UserRepository.findOne({ email })
      if (user) {
        await bcrypt.compare(password, user.passwordHash, (error, data) => {
          if (error) throw error
          if (data) {
            const token = Jwt.sign({ id: user._id, email: user.email }, Auth.secret, { expiresIn: Auth.expires })
            return res.status(200).json({ user: { email: user.email, nivel: user.nivel, nome: user.name }, token })
          } else return res.status(401).json({ message: 'E-mail/ Senha não são válidos!' })
        })
      } else {
        return res.status(401).json({ message: 'E-mail não é válido!' })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }


  public async isLogin (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const token = Jwt.verify(id, Auth.secret)
      if (token) return res.status(200).json({ login: true })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }
}

export default new AuthController()
