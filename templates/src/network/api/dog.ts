import { get } from '../http'

export const getDogImg = (url: string) => {
  return get<{ message: string }>({
    url
  })
}
