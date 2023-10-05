import 'reflect-metadata'

import Joi, { ObjectSchema } from 'joi'
import { NextRequest } from 'next/server'
import { Container } from 'typedi'

import { ItemRepository } from '../../../server/repository/item'

export async function GET (req: NextRequest) {
  const items = await Container.get(ItemRepository).listItems()

  return Response.json({
    data: items
  }, {
    status: 200
  })
}

export async function POST (req: NextRequest) {
  const body = await req.json()

  let schema: ObjectSchema

  switch (body.type) {
    case 'url':
      schema = Joi.object({
        type: Joi.string().required(),
        payload: {
          to: Joi.string().uri().required()
        }
      })

      break
    default:
      return new Response(null, { status: 400 })
  }

  const { value, error } = schema.validate(body)
  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  const item = await Container.get(ItemRepository).createItem(value)

  return Response.json(item, {
    status: 200
  })
}
