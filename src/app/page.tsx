import { headers } from 'next/headers'

export default async function Page () {
  headers()

  return <p>This is Home page.</p>
}
