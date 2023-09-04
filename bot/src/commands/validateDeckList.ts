import { SlashCommandBuilder } from "discord.js"

export const validateCommand = {
  data: new SlashCommandBuilder()
    .setName("validate")
    .setDescription("Validate a decklist in a given format.")
  .addStringOption(option =>
    option
      .setName("format")
      .setDescription("The format to validate the deck against.")
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName("decklist")
      .setDescription("The deck list.")
      .setRequired(true)
  ),

  execute: async (interaction: { options: { getString: (arg0: string) => any }; reply: (arg0: string) => any }) => { 
    const format = interaction.options.getString("format")
    const decklist = interaction.options.getString("decklist")

    if (!format || !decklist) await interaction.reply("YOU DID SOMETHING WRONG!!!!!!!!!!!!")
  }
}
