import {Collection} from 'discord.js'
import  * as lifetime from './lifetime-stats.js'
import * as recentmatch from './recent-match-stat.js'
import * as recent from './recent-stats.js'
import * as recentquads from './recent-quad-stats.js'

const commandsCollection = new Collection();

export const allCommands = [lifetime, recentmatch, recent, recentquads]

allCommands.forEach((cmd, idx)=>{
    if ('data' in cmd.command && 'execute' in cmd.command) {
        commandsCollection.set(cmd.command.data.name, cmd.command)
	} else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
})

export default commandsCollection