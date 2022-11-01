import { login, Warzone, platforms } from "call-of-duty-api";


export const authInit = ()=>{
    const success = login(process.env.COD_SSO)

    if(success) console.log("Logged in to COD server")
}

export const getRecentStats = async (gamertag) => {

    try {
        let response = await Warzone.combatHistory(gamertag, platforms.Activision)
        const allRecentData = response.data?.summary?.all
        const quadRecentData = response.data?.summary?.br_rebirth_rbrthquad
        
        const allData = {
            kills:allRecentData.kills,
            kdRatio:allRecentData.kdRatio,
            gulagDeaths:allRecentData.gulagDeaths,
            matchesPlayed:allRecentData.matchesPlayed,
            assists:allRecentData.assists,
            gulagKills:allRecentData.gulagKills,
            killsPerGame:allRecentData.killsPerGame,
            damageDone:allRecentData.damageDone,
            deaths:allRecentData.deaths,
        }

        const quadData = {
            kills:quadRecentData.kills,
            kdRatio:quadRecentData.kdRatio,
            gulagDeaths:quadRecentData.gulagDeaths,
            matchesPlayed:quadRecentData.matchesPlayed,
            assists:quadRecentData.assists,
            gulagKills:quadRecentData.gulagKills,
            killsPerGame:quadRecentData.killsPerGame,
            damageDone:quadRecentData.damageDone,
            deaths:quadRecentData.deaths,
        }

        return{
            allData,
            quadData
        }        
    } catch(error) {
        //Handle Exception
        console.log("Error occurred while getting recent data")
        console.log(error)
    }

}

export const getLifetimeStats = async (gamertag) => {

    try {
        let response = await Warzone.fullData(gamertag, platforms.Activision)
        const lifeTimeData = response.data?.lifetime?.all?.properties
        const generalData = response.data

        //granular data
        const {totalGamesPlayed,score,suicides,kills,headshots,assists} = lifeTimeData
        //user data
        const {level, totalXp} = generalData

        const data = {
            totalGamesPlayed:totalGamesPlayed,
            score:score,
            suicides:suicides,
            kills:kills,
            headshots:headshots,
            assists:assists,
            level:level,
            totalXp:totalXp
        }

        console.log({data})

        return data
    } catch(error) {
        //Handle Exception
        console.log("Error occurred while getting lifetime data")
        console.log(error)
    }
}

export const getMostRecentMatchData = async (gamertag) => {

    try {
        let response = await Warzone.combatHistory(gamertag, platforms.Activision)
        const matchData = response.data?.matches[0]?.playerStats
        const {teamPlacement,damageDone,kills,headshots,assists,kdRatio} = matchData
        const data = {
            teamPlacement:teamPlacement,
            damageDone:damageDone,
            kdRatio:kdRatio,
            kills:kills,
            headshots:headshots,
            assists:assists,
        }

        return data     
    } catch(error) {
        //Handle Exception
        console.log("Error occurred while getting recent match data")
        console.log(error)
    }
}