import { ClientEvents } from "discord.js"

import { env } from "./env"
import { login } from "./utilities/login"
import { messageHandler } from "./handlers/messageHandler"
import { AppStorage } from "./utilities/storage"
import { useLoadCardData } from "./hooks/card/useLoadCardData"
import { registerListeners } from "./utilities/registerListeners"
import { buildNameMap } from "./utilities/buildNameMap"

const { loadCardData } = useLoadCardData()

export const API_KEY = env.API_KEY

// Injects the storage objects into the global scope so we can use it anywhere. Technically export is fine too but I like this.
declare global {
  var storage: AppStorage<string>
  var cardNameMap: AppStorage<any>
}

global.storage = new AppStorage()
global.cardNameMap = new AppStorage()

if (!API_KEY) throw new Error("API_KEY is not defined")

// We encapsulate the main function in an async function so we can use await on certain setup functions.
const main = async () => {
  console.log("Loading card data...")
  // Pull in the API.
  const cardLoadingError = await loadCardData()

  if (cardLoadingError) {
    throw new Error("Failed to load card data.")
  }
  console.log("Card data loaded into memory.")

  const cardNameMapError = await buildNameMap()

  if (cardNameMapError) {
    throw new Error("Failed to build card name map.")
  }

  console.log("Logging in...")
  const client = login(API_KEY)
  console.log("Logged in.")

  // Register all of our listeners.
  const listeners: Partial<Record<keyof ClientEvents, any>> = {
    "messageCreate": messageHandler
  }

  registerListeners(client, listeners)
}

main()
