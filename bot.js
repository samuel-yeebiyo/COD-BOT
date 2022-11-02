import path from 'node:path'
import fs from 'node:fs'
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import { config } from 'dotenv';
import { authInit } from './cod/index.js'
config()
import commands from './commands/index.js'

// login to COD server
authInit()

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = commands

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.DISCORD_TOKEN);