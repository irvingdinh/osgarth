import { Collection } from 'mongodb'
import { Inject, Service } from 'typedi'

import { Item } from '../../lib/model'
import { randomString } from '../../lib/util'
import { MongoInfra } from '../infra/mongo'

@Service()
export class ItemRepository {
  private readonly collection: Collection<Item>

  constructor (
    @Inject() private readonly mongoInfra: MongoInfra
  ) {
    this.collection = this.mongoInfra.db().collection<Item>('items')
  }

  public listItems (): Promise<Item[]> {
    return this.collection.find().sort({ createdAt: -1 }).toArray()
  }

  public async getItemBySlug (slug: string): Promise<Item | null> {
    return await this.collection.findOne({ slug })
  }

  public async createItem (item: Item): Promise<Item> {
    item.slug = randomString()
    item.createdAt = new Date()
    item.updatedAt = new Date()

    await this.collection.insertOne(item)

    return item
  }
}
