import { getRPSChoices } from './game.js';
import { capitalize, DiscordRequest } from './utils.js';

export async function HasGuildCommands(appId, guildId, commands) {
  if (guildId === '' || appId === '') return;

  //install all the commands listed during connection
  commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Checks for a command
async function HasGuildCommand(appId, guildId, command) {
  
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;

  try {
    
    //get all the commands available
    const res = await DiscordRequest(endpoint, { method: 'GET' });
    const data = await res.json();

    if (data) {
      //get all names of commands
      const installedNames = data.map((c) => c['name']);

      // This is just matching on the name, so it's not good for updates
      if (!installedNames.includes(command['name'])) {
        console.log(`Installing "${command['name']}"`);
        InstallGuildCommand(appId, guildId, command);
      } else {
        // RemoveGuildCommand(appId, guildId, command);
        console.log(`"${command['name']}" command already installed`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Installs a command
export async function InstallGuildCommand(appId, guildId, command) {
  // API endpoint to get and post guild commands
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'POST', body: command });
  } catch (err) {
    console.error(err);
  }
}

export async function RemoveGuildCommand(appId, guildId, command) {
  const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
  // install command
  try {
    await DiscordRequest(endpoint, { method: 'PUT', body: {} });
  } catch (err) {
    console.error(err);
  }
}

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// chat message commands
export const LIFETIME_STATS_COMMAND = {
  name: 'lifetime-stats',
  description: 'Get an overview of your lifetime stats in warzone.',
  type: 1,
  options: [
    {
        "name": "gamertag",
        "description": "input your gamertag",
        "type": 3,
        "required": true,
    },
  ] 
};

export const RECENT_STATS_COMMAND = {
  name: 'recent-stats',
  description: 'Get your recent stats across all your matches in warzone.',
  type: 1,
};

export const QUAD_STATS_COMMAND = {
  name: 'quad-stats',
  description: 'Get your recent stats for quad matches in warzone.',
  type: 1,
};

export const RECENT_MATCH_STATS_COMMAND = {
  name: 'recent-match-stats',
  description: 'Get your stats for most recent match in warzone.',
  type: 1,
};


// Command containing options
// export const CHALLENGE_COMMAND = {
//   name: 'challenge',
//   description: 'Challenge to a match of rock paper scissors',
//   options: [
//     {
//       type: 3,
//       name: 'object',
//       description: 'Pick your object',
//       required: true,
//       choices: createCommandChoices(),
//     },
//   ],
//   type: 1,
// };
