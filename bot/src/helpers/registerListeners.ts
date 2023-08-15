import { Client, ClientEvents } from "discord.js";
import { registerListener } from "./registerListener";

export const registerListeners = (client: Client, listeners: Partial<Record<keyof ClientEvents, any>>) => {
  for (const [event, handler] of Object.entries(listeners)) {
    registerListener(client, event as keyof ClientEvents, handler)
  }
}
