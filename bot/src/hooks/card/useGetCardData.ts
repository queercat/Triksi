import { ApiRoute } from "../../data/API"

export const useGetCardData = () => {
  const route = ApiRoute("Cards")

  const query = async () => {
    return await fetch(route)
  }

  return { query }
}
