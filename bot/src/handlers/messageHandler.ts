import { Message } from "discord.js"
import { cardFetcher } from "./executors/cardFetcher"

export const messageHandler = async (message: Message) => {
  const content = message.content;

  cardFetcher(message, content)
}
