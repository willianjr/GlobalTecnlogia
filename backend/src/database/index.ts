import { Connection, createConnection, getConnection } from 'typeorm'

class Database {
  public async conect ():Promise<void> {
    await createConnection().then(() => {
      // console.log('CONNECT:', process.env.DB_DATABASE)
    }).catch((error) => {
      console.log(error)
    })
    const { options } = getConnection()
    process.env.NODE_ENV.trim() !== 'test' && console.log(`---=============== TYPEORM: Conected:${options.type} \n to DataBase: ${options.database}==========---`)
  }

  public async close ():Promise<void> {
    return await getConnection().close()
      .then(() => {
        process.env.NODE_ENV.trim() !== 'test' && console.log('---===============TYPEORM: Desconected ==========---')
      })
      .catch(() => {
        console.log('---=============== TYPEORM: Error ao Desconected ==========---')
      })
  }

  public async dropDataBase ():Promise<void> {
    return await getConnection().dropDatabase().then().catch((error) => {
      console.log(error)
    })
  }

  public async truncate ():Promise<void> {
    const entities = getConnection().entityMetadatas

    for (const entity of entities) {
      const repository = await getConnection().getRepository(entity.name)
      await repository.clear()
    }
  }

  public connected ():Connection {
    return getConnection()
  }
}

export default new Database()
