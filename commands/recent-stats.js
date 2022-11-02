import  { SlashCommandBuilder } from 'discord.js'
import { getRecentStats } from '../cod/index.js'

export const command =  {
	data: new SlashCommandBuilder()
		.setName('recent-stats')
		.setDescription('View your most recent overall stats.')
        .addStringOption(option=> 
            option.setName('gamertag')
            .setDescription("Input your gamertag")
            .setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply()

        const gamertag = interaction.options.getString('gamertag')
        console.log(`Fetching recent stats for ${gamertag}`)

        const stats = await getRecentStats(gamertag)
        const {kills, kdRatio, gulagDeaths, matchesPlayed, assists, gulagKills, killsPerGame, damageDone, deaths} = stats

        if(!stats){
            await interaction.editReply(
                `Please make sure you entered a valid gamertag: ${gamertag}`
            )
        }else {

            await interaction.editReply(
                `**Most Recent Overall stats for** *${gamertag}*\n\
                :headstone: **Kills**: ${kills}\n\
                :skull_crossbones: **KdRatio**: ${kdRatio}\n\
                :x: **Gulag Deaths**: ${gulagDeaths}\n\
                :globe_with_meridians: **Matches Played**: ${matchesPlayed}\n\
                :beginner: **Assists**: ${assists}\n\
                :unlock: **Gulag Kills**: ${gulagKills}\n\
                :crossed_swords: **Kills Per Game**: ${killsPerGame}\n\
                :anger: **Damage Done**: ${damageDone}\n\
                :coffin: **Deaths**: ${deaths}
                `
            )
        }
	},
};
