import { Db, MongoClient } from 'mongodb'
import { Service } from 'typedi'

@Service()
export class MongoInfra {
  private readonly mongoClient: MongoClient

  private readonly mongoDatabase: Db

  constructor () {
    this.mongoClient = new MongoClient(process.env.MONGO_URI)
    this.mongoDatabase = this.mongoClient.db(process.env.MONGO_DB)

    this.mongoDatabase.collections()
      .catch(console.error)
  }

  db (): Db {
    return this.mongoDatabase
  }
}
