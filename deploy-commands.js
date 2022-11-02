import {REST, Routes} from 'discord.js'
import { config } from 'dotenv';
config()
import {allCommands} from './commands/index.js'


const commandsJson = []
allCommands.map((cmd)=>{
  commandsJson.push(cmd.command.data.toJSON())
})

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commandsJson });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();