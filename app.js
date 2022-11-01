import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
import {
  LIFETIME_STATS_COMMAND,
  RECENT_STATS_COMMAND,
  QUAD_STATS_COMMAND,
  RECENT_MATCH_STATS_COMMAND,
  HasGuildCommands,
} from './commands.js';
import { authInit, getLifetimeStats, getMostRecentMatchData, getRecentStats } from './cod/index.js';
import {config} from 'dotenv'

//allow environment variables
config()

//log in to COD server
authInit()

// getLifetimeStats('simao619#2255438')
// getMostRecentMatchData('simao619#2255438')
// getRecentStats('simao619#2255438')

// Create an express app
const app = express();
const PORT = process.env.PORT || 3000;

// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

const activeGames = {};

app.get('/', (req, res) => {res.send("Hello from home!")})

// Interactions endpoint URL where Discord will send HTTP requests
app.post('/interactions', async function (req, res) {
  // Interaction type and data
    const { type, id, data } = req.body;
    
    // Handle verification requests
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    
  //  Handle slash command requests
  //  See https://discord.com/developers/docs/interactions/application-commands#slash-commands
  if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;


      if (name === 'lifetime-stats') {
        
        const tag = data.options[0].value
        
        res.send({
          type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Lifetime stats for ${tag}\n ${await getLifetimeStats('simao619#2255438')}`,

            },
        })


        const gameData = await getLifetimeStats('simao619#2255438')

        console.log("here")
        // Send a message into the channel where command was triggered from
        return res.send({
            type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content:`Lifetime stats for ${tag}\n ${gameData}`,

            },
        });
      }
      if (name === 'recent-stats') {
        
          
          // Send a message into the channel where command was triggered from
          return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                  content: 'hello world ' + getRandomEmoji(),
              },
          });
      }
      if (name === 'quad-stats') {

        console.log(req.body)

          // Send a message into the channel where command was triggered from
          return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                  content: 'hello world ' + getRandomEmoji(),
              },
          });
      }
      if (name === 'recent-match-stats') {
          // Send a message into the channel where command was triggered from
          return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: {
                  content: 'hello world ' + getRandomEmoji(),
              },
          });
      }
    }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);

  // Check if guild commands from commands.json are installed (if not, install them)
  // This runs as soon as we connect and we have to install the commands before we can use them
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
    LIFETIME_STATS_COMMAND,
    RECENT_STATS_COMMAND,
    QUAD_STATS_COMMAND,
    RECENT_MATCH_STATS_COMMAND,
  ]);
});