import { redirect, RedirectType } from 'next/navigation'
import { Container } from 'typedi'

import { ItemRepository } from '../../server/repository/item'

interface Props {
  params: {
    slug: string
  }
}

export default async function Page (props: Props) {
  const { slug } = props.params

  const item = await Container.get(ItemRepository).getItemBySlug(slug)
  if (item == null) {
    return redirect('/', RedirectType.replace)
  }

  switch (item.type) {
    case 'url':
      return redirect(item.payload.to, RedirectType.replace)
    default:
      break
  }

  return redirect('/', RedirectType.replace)
}
