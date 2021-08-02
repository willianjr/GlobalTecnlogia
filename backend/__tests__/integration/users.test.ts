import { getConnection } from 'typeorm'
// import request = require('supertest');
import Database from '../../src/database'
// import App from '../../src/config/app'
import { UserModel } from '../../src/api/models/userModel'

describe('UserModel: Repositories in Banco de Dados', () => {
  beforeAll(async () => {
    await Database.conect()
  })
  afterAll(async () => {
    await Database.close()
  })
  beforeEach(async () => {
    await Database.truncate()
  })
  // Testes de Repositórios
  // CREATE
  test('Shouldnt not enter a new user if it does not have all required fields', async () => {
    const userRepository = getConnection().getRepository(UserModel)
    const user = await userRepository.create({
      name: 'Nome',
      nivel: 'src',
      email: 'nome@email.com'
    })
    await expect(userRepository.save(user)).rejects.toThrow()
    // console.log('result', results)
  })
  test('Should insert a new user', async () => {
    const userRepository = getConnection().getRepository(UserModel)
    const user = await userRepository.create({
      name: 'Nome',
      email: 'nome@email.com',
      passwordHash: '123123',
      nivel: 'src'
    })
    const results = await userRepository.save(user)
    // console.log(results)
    expect(user.name).toBe(results.name)
  })
  test('Must not enter a new user with duplicate email', async () => {
    const userRepository = getConnection().getRepository(UserModel)
    const user = await userRepository.create({
      name: 'Nome',
      email: 'nome@email.com',
      passwordHash: '123123',
      nivel: 'src'
    })
    const user1 = { ...user, email: 'nome@email.com' }
    await userRepository.save(user)
    await expect(userRepository.save(user1)).rejects.toThrow()
  })
})
