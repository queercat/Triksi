import { Message } from "discord.js"

// Regex to match [[text]] but not [[text[[text]]text]]]] only [[text]] or [[ text ]] or [[ text 123 ]]
const regex = /\[\[([^\[\]]+)\]\]/g

export const cardFetcher = (message: Message, content: string) => {
  let cardNames = []

  const matches = content.match(regex)

  if (!matches) return

  for (const match of matches) {
    const text = match.replace("[[", "").replace("]]", "")

    cardNames.push(text)
  }

  if (cardNames.length <= 0) return

  let reply = ""

  cardNames.forEach((cardName) => {
    const card = cardNameMap.get(cardName) 

    if (card) {
      card.faces.forEach((face: any) => {
        reply += face.image + "\n"
      })
    }
  })

  if (reply.length > 0) {
    message.reply(reply)
  }
}
