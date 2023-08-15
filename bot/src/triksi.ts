import { Client, ClientEvents, Message } from "discord.js"

import { env } from "./env"
import { login } from "./utilities/login"
import { messageHandler } from "./handlers/messageHandler"
import { AppStorage } from "./utilities/storage"
import { useLoadCardData } from "./hooks/card/useLoadCardData"
import { registerListeners } from "./utilities/registerListeners"
import { StorageEntities } from "./data/StorageEntities"

const { loadCardData } = useLoadCardData()

export const API_KEY = env.API_KEY
export const PERMISSION_INTEGER = Number(env.PERMISSION_INTEGER)

// Injects the storage object into the global scope so we can use it anywhere. Technically export is fine too but I like this.
declare global {
  var storage: AppStorage
}

global.storage = new AppStorage()

if (!API_KEY) throw new Error("API_KEY is not defined")
if (!PERMISSION_INTEGER) throw new Error("PERMISSION_INTEGER is not defined")

// We encapsulate the main function in an async function so we can use await on certain setup functions.
const main = async () => {
  console.log("Loading card data...")
  // Pull in the API.
  const cardLoadingError = await loadCardData()

  if (cardLoadingError) {
    throw new Error("Failed to load card data.")
  }
  console.log("Card data loaded into memory.")

  console.log(storage.get(StorageEntities.CardData))

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
