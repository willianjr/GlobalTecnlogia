import bcrypt from 'bcryptjs'
import Database from '../../src/database'
import { UserModel } from '../../src/api/models/userModel'
import { getConnection } from 'typeorm'

describe('Teste bcrypt - password hash', () => {
  beforeAll(async () => {
    await Database.conect()
  })
  afterAll(async () => {
    await Database.close()
  })
  beforeEach(async () => {
    await Database.truncate()
  })
  test('shoul encrypt password usign bcrypt', async () => {
    const password = '123123'
    const passwordHash = bcrypt.hashSync(password, 8)
    const compareHash = await bcrypt.compare(password, passwordHash)
    expect(compareHash).toBe(true)
  })
  test('shoul encrypt user password', async () => {
    const userRepository = getConnection().getRepository(UserModel)
    const user = await userRepository.create({
      name: 'NomeX',
      email: 'nomex@email.com',
      passwordHash: '123124',
      nivel: 'usr'
    })
    await userRepository.save(user)
    const compareHash = await bcrypt.compare('123124', user.passwordHash)
    expect(compareHash).toBe(true)
  })
})
