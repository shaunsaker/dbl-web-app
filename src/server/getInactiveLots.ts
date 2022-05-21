import fs from 'fs'
import path from 'path'
import { Lot } from '../store/lots/models'
import { firebaseFetchInactiveLots } from './services/firebase/firebaseFetchInactiveLots'

const CACHE_PATH = path.resolve(__dirname + '.cache/lots')

export const getInactiveLots = async (): Promise<Lot[]> => {
  let cachedData

  try {
    cachedData = JSON.parse(
      fs.readFileSync(path.join(__dirname, CACHE_PATH), 'utf8'),
    )
  } catch (error) {
    console.log('Lots cache not initialized')
  }

  if (!cachedData) {
    const data = await firebaseFetchInactiveLots()

    try {
      fs.writeFileSync(
        path.join(__dirname, CACHE_PATH),
        JSON.stringify(data),
        'utf8',
      )
      console.log('Wrote to lots cache')
    } catch (error) {
      console.log('ERROR WRITING LOTS CACHE TO FILE')
      console.log(error)
    }

    cachedData = data
  }

  return cachedData
}
