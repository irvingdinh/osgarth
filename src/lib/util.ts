export const randomString = (length: number = 8): string => {
  const availableChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const result = []

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length)
    result.push(availableChars[randomIndex])
  }

  return result.join('')
}
