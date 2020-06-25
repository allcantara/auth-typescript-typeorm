import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'
import { IUser } from '../interfaces'

class UserController {
  async store (req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User)
    const { email, password } = req.body as IUser

    const userExists = await repository.findOne({ where: { email } })

    if(userExists) {
      return res.sendStatus(409)
    }

    const user = repository.create({ email, password })
    await repository.save(user)

    return res.json(user)
  }

  async index (req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User)
    const users = await repository.find()
    return res.json({ loggedUser: req.userId, users })
  }
}

export default new UserController()
