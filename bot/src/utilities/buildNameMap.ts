import { StorageEntities } from "../data/StorageEntities"

export const buildNameMap = async () => {
  const cardData = storage.get(StorageEntities.CardData)
  let cardDataParsed = null
  let error = false

  if (!cardData) {
    return
  }

  // Destringify! (It's at "compile-time" so it's fine!)
  cardDataParsed = await JSON.parse(cardData)

  if (!cardDataParsed) {
    return error = true
  }

  // Iterate through the card data and build a map of card names to :w
  for (const card of cardDataParsed) {
    const name = card.faces[0].name
    cardNameMap.set(name, card)
  }

  return error = false
}
