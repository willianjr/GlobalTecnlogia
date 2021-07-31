import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { validateOrReject } from 'class-validator'
import { UserModel } from '../models/userModel'

class UsersController {
  public async getAll (req:Request, res:Response):Promise<Response> {
    try {
      const UsersRepository = await getConnection().getRepository(UserModel)
      const [list, totalRegister] = await UsersRepository.findAndCount()

      return res.status(200).json({ list, totalRegister })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async getID (req:Request, res:Response):Promise<Response> {
    const { id } = req.params
    return res.json({ message: 'getID', id })
  }

  public async count (req:Request, res:Response):Promise<Response> {
    try {
      const UsersRepository = getConnection().getRepository(UserModel)
      const Users = await UsersRepository.count()

      return res.status(200).json({ totalRegister: Users })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async save (req:Request, res:Response):Promise<Response> {
    try {
      const UsersRepository = getConnection().getRepository(UserModel)
      // console.log('save', req.body)
      const paper = await UsersRepository.create(req.body)
      await validateOrReject(paper).catch(errors => {
        if (errors.length > 0) {
          throw errors
        }
      })
      // se passar pela validação ele salva o repositorio
      const results = await UsersRepository.save(paper)
      return res.status(201).send(results)
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async update (req:Request, res:Response):Promise<Response> {
    try {
      const { id } = req.params
      const UsersRepository = getConnection().getRepository(UserModel)
      console.log('update', req.body)
      const paper = await UsersRepository.findOne(id)
      UsersRepository.merge(paper, req.body)
      // casos individuais
      paper.active = Boolean(req.body.active)
      const results = await UsersRepository.save(paper)
      return res.status(200).send(results)
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  public async delete (req:Request, res:Response):Promise<Response> {
    const { id } = req.params
    const UsersRepository = getConnection().getRepository(UserModel)
    const results = await UsersRepository.delete(id)
    return res.json(results)
  }
}

export default new UsersController()
