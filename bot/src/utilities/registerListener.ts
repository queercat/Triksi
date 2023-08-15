import { Client, ClientEvents } from 'discord.js'

export const registerListener = (client: Client, trigger: keyof ClientEvents, listenerFunction: any) => {
  client.on(trigger, listenerFunction)
}
