const API = {
  Base: "https://archive.horse.cards/api/v0/",
  Endpoints: {
    Cards: "cards",
    Sets: "sets",
    Formats: "formats",
  }
}

export const ApiRoute = (route: keyof typeof API.Endpoints) => {
  return `${API.Base}${API.Endpoints[route]}`
}
