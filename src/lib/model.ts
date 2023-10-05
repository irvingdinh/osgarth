export type UrlItem = {
  slug: string
  type: string
  payload: {
    to: string
  }
  createdAt: Date
  updatedAt: Date
}

export type Item = UrlItem
