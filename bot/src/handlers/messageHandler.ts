import { Message } from "discord.js"

// Regex to match [[text]] but not [[text[[text]]text]]]] only [[text]] or [[ text ]] or [[ text 123 ]]
const regex = /\[\[([^\[\]]+)\]\]/g

export const messageHandler = async (message: Message) => {
  const content = message.content

  if (content.match(regex)) {
    const matches = content.match(regex)
    if (matches) {
      for (const match of matches) {
        const text = match.replace("[[", "").replace("]]", "")
        console.log(text)
      }
    }
  }
}
