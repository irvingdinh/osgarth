import { Container } from 'typedi'

import { MongoInfra } from '../server/infra/mongo'

export default async function Page () {
  const mongoInfra = Container.get(MongoInfra)

  console.log(await mongoInfra.db().collections())

  return <p>This is Home page.</p>
}
