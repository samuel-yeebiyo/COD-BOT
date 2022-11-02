import  { SlashCommandBuilder } from 'discord.js'
import {getMostRecentMatchData} from '../cod/index.js'
import { responses } from '../responses/index.js';

export const command =  {
	data: new SlashCommandBuilder()
		.setName('recent-match-stats')
		.setDescription('View your most recent match stats.')
        .addStringOption(option=> 
            option.setName('gamertag')
            .setDescription("Input your gamertag")
            .setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply({content:"Figuring things out..."})

        const gamertag = interaction.options.getString('gamertag')
        console.log(`Fetching match data for ${gamertag}`)

        const stats = await getMostRecentMatchData(gamertag)
        const {teamPlacement,damageDone,kills,headshots,assists,kdRatio} = stats

        if(!stats){
            await interaction.editReply(
                `Please make sure you entered a valid gamertag: ${gamertag}`
            )
        }else {
            await interaction.editReply(
                `**Most Recent Match stats for ${gamertag}**\n\
                :trophy: **Team Placement**: ${teamPlacement}\n\
                :anger: **Damage Done**: ${damageDone}\n\
                :skull_crossbones: **KdRatio**: ${kdRatio}\n\
                :headstone: **Kills**: ${kills}\n\
                :skull: **Headshots**: ${headshots}\n\
                :beginner: **Assists**: ${assists}\n\ 
                ${responses[Math.floor(Math.random() * responses.length)]}`
            )
        }
	},
};
