import { useEffect, useState } from 'react'
import * as DogApis from '../network/api/dog'

export default () => {
  const [dogImg, setDogImg] = useState<string>()
  const getDog = async () => {
    const dog = await DogApis.getDogImg(
      'https://dog.ceo/api/breeds/image/random'
    )
    setDogImg(dog?.message)
  }

  useEffect(() => {
    getDog()
  }, [])

  return (
    <div>
      <img src={dogImg} alt="" />
      <button onClick={getDog}>xx</button>
    </div>
  )
}
