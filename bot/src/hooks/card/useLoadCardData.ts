import { StorageEntities } from "../../data/StorageEntities"
import { useGetCardData } from "./useGetCardData"

export const useLoadCardData = () => {
  const { query } = useGetCardData()
  let error = false

  const loadCardData = async () => {
    try {
      const data = await (await query()).json()
      storage.set(StorageEntities.CardData, data)
    } catch (e) {
      error = true
    }

    return error
  }

  return { loadCardData }
}
