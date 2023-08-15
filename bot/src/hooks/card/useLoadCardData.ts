import { StorageEntities } from "../../data/StorageEntities"
import { useGetCardData } from "./useGetCardData"

export const useLoadCardData = () => {
  const { query } = useGetCardData()
  let error = false

  const loadCardData = async () => {
    try {
      const response = await query()
      const data = await (await response.blob()).text()

      const parsed = await JSON.parse(data)

      if (!parsed) throw new Error("No data found")

      storage.set(StorageEntities.CardData, data)
    } catch (e) {
      error = true
    }

    return error
  }

  return { loadCardData }
}
