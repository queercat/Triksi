import { Message } from "discord.js"

// Regex to match [[text]] but not [[text[[text]]text]]]] only [[text]] or [[ text ]] or [[ text 123 ]]
const regex = /\[\[(?<query>[^\[\]]+)\]\]/g

export const messageHandler = async (message: Message) => {
  const content = message.content
  let cardNames = []

  if (content.match(regex)) {
    const matches = content.matchAll(regex)
    if (matches) {
      for (const match of matches) {
        cardNames.push(match.groups.query)
      }
    }
  }

  if (cardNames.length === 0) return

  let reply = ""

  cardNames.forEach((cardName) => {
    const card = cardNameMap.get(cardName) 

    if (card) {
      reply += card.faces[0].image + "\n"
    }
  })

  if (reply.length > 0) {
    message.reply(reply)
  }
}
