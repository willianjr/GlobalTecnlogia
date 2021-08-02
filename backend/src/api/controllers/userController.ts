import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { validateOrReject } from 'class-validator'
import { UserModel } from '../models/userModel'

class UserController {
  public async getAll (req: Request, res: Response): Promise<Response> {
    try {
      // const { page, limit } = req.query
      // const skip = (+page * +limit) || 10
      // const limite = +limit
      const UserRepository = await getConnection().getRepository(UserModel)
      const [list, totalRegister] = await UserRepository.findAndCount()

      return res.status(200).json({ list, totalRegister })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async getID (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const UserRepository = await getConnection().getRepository(UserModel)
      const list = await UserRepository.findOne(id)

      return res.status(200).json({ list, totalRegister: 1 })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async count (req: Request, res: Response): Promise<Response> {
    try {
      const UserRepository = getConnection().getRepository(UserModel)
      const Users = await UserRepository.count()

      return res.status(200).json({ totalRegister: Users })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async save (req: Request, res: Response): Promise<Response> {
    try {
      const UserRepository = getConnection().getRepository(UserModel)
      console.log('save', req.body)
      const user = await UserRepository.create(req.body)
      // console.log(user)
      await validateOrReject(user).catch((errors) => {
        if (errors.length > 0) {
          throw errors
        }
      })
      // se passar pela validação ele salva o repositorio
      const results = await UserRepository.save(user)
      return res.status(201).send(results)
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const UserRepository = getConnection().getRepository(UserModel)
      console.log('update', req.body)
      const user = await UserRepository.findOne(id)
      UserRepository.merge(user, req.body)
      const results = await UserRepository.save(user)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const UserRepository = getConnection().getRepository(UserModel)
    const results = await UserRepository.delete(id)
    return res.json(results)
  }
}

export default new UserController()
