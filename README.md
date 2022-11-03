# COD-BOT

A discord bot that uses the call-of-duty-api to retrieve lifetime, recent, and match data (separate commands) for a given user using their gamertag and sends it as a custom message in the thread.

Was initially using 'dicord-interactions' but later opted for 'discord.js' so now you can feel free to clone this project and even host it on your local network since it uses sockets to connect to the discord server and communicate that way.

You can (should) also replace or customize the responses which currently include patronizing, sarcastic, and just plain rude comments to troll your friends on your server :)

## Required environment variables:

### Discord Related

**DISCORD_TOKEN** (your discord bot token) \
**APP_ID** (the discord server your bot initially connected to, for testing)

### Call of Duty related

**COD_SSO** (single sign on token for your call of duty account)

You can get this token by:

1. Signing in to your [call of duty account](https://www.my.callofduty.com) on your laptop
2. Going to your dev tools (right click and inspect if you must)
3. Depending on your browser, go to Applications (chrome) or Storage (firefox) tab
3. Search for 'ACT_SSO_COOKIE' and copy that value

Any COD account will do, you can create an account just for this if need be.

Enjoy
