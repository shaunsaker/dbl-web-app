import fs from 'fs'
import path from 'path'

const CACHE_DIR = path.join(process.cwd(), '.cache')

export const getCachedData = async <T>({
  filename,
  api,
}: {
  filename: string
  api: () => Promise<T>
}): Promise<T> => {
  const filepath = path.join(CACHE_DIR, filename)

  let cachedData

  try {
    cachedData = JSON.parse(fs.readFileSync(filepath, 'utf8'))
  } catch (error) {
    console.log(`${filename} cache not initialized`)
  }

  if (!cachedData) {
    const data = await api()

    try {
      fs.mkdirSync(CACHE_DIR)
    } catch (error) {
      // ignore
    }

    try {
      fs.writeFileSync(filepath, JSON.stringify(data), 'utf8')

      console.log(`wrote to ${filename} cache`)
    } catch (error) {
      console.log(`error creating ${filename} cache`)
      console.log(error)
    }

    cachedData = data
  }

  console.log(`returning cached data for ${filename}`)

  return cachedData
}
