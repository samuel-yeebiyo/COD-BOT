import { login, Warzone, platforms } from "call-of-duty-api";


export const authInit = ()=>{
    const success = login(process.env.COD_SSO)

    if(success) console.log("Logged in to COD server")
}

export const getRecentQuadStats = async (gamertag) => {

    try {
        let response = await Warzone.combatHistory(gamertag, platforms.Activision)
        const quadRecentData = response.data?.summary?.br_rebirth_rbrthquad
        const {kills, kdRatio, gulagDeaths, matchesPlayed, assists, gulagKills, killsPerGame, damageDone, deaths} = quadRecentData
        
        const quadData = {
            kills:kills,
            kdRatio:kdRatio,
            gulagDeaths:gulagDeaths,
            matchesPlayed:matchesPlayed,
            assists:assists,
            gulagKills:gulagKills,
            killsPerGame:killsPerGame,
            damageDone:damageDone,
            deaths:deaths,
        }

        return quadData

    } catch(error) {
        //Handle Exception
        console.log("Error occurred while getting recent quad data")
        console.log(error)
        return false
    }
}

export const getRecentStats = async (gamertag) => {

    try {
        let response = await Warzone.combatHistory(gamertag, platforms.Activision)
        const allRecentData = response.data?.summary?.all
        const {kills, kdRatio, gulagDeaths, matchesPlayed, assists, gulagKills, killsPerGame, damageDone, deaths} = allRecentData

        const allData = {
            kills:kills,
            kdRatio:kdRatio,
            gulagDeaths:gulagDeaths,
            matchesPlayed:matchesPlayed,
            assists:assists,
            gulagKills:gulagKills,
            killsPerGame:killsPerGame,
            damageDone:damageDone,
            deaths:deaths,
        }

        return allData

    } catch(error) {
        //Handle Exception
        console.log("Error occurred while getting recent data")
        console.log(error)
        return false
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
        return false
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
        return false
    }
}