import  { SlashCommandBuilder } from 'discord.js'
import {getLifetimeStats} from '../cod/index.js'

export const command =  {
	data: new SlashCommandBuilder()
		.setName('lifetime-stats')
		.setDescription('Show lifetime warzone stats')
        .addStringOption(option=> 
            option.setName('gamertag')
            .setDescription("Input your gamertag")
            .setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply()

        const gamertag = interaction.options.getString('gamertag')
        console.log(`Fetching lifetime data for ${gamertag}`)

        const stats = await getLifetimeStats(gamertag)
        const {totalGamesPlayed,score,suicides,kills,headshots,assists,level,totalXp} = stats

        if(!stats){
            await interaction.editReply(
                `Please make sure you entered a valid gamertag: ${gamertag}`
            )
        }else {
            await interaction.editReply(
                `**Lifetime stats for ${gamertag}**\n 
                :globe_with_meridians: **Total Games Played**: ${totalGamesPlayed}\n 
                :100: **Score**: ${score}\n 
                :coffin: **Suicides**: ${suicides}\n 
                :headstone: **Kills**: ${kills}\n 
                :skull: **Headshots**: ${headshots}\n 
                :beginner: **Assists**: ${assists}\n 
                :medal: **Level**: ${level}\n 
                :gem: **Total Xp**: ${totalXp}`
            )
        }
	},
};
