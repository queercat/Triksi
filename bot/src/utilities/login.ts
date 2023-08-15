import { Client } from "discord.js"

export const login = (credentials: string) => {
  const client = new Client({
    intents: [
      "GuildMembers",
      "GuildMessages",
      "Guilds",
      "MessageContent",
    ]
  })

  client.login(credentials)

  return client
}
