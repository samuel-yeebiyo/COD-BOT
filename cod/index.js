import { login, Warzone, platforms } from "call-of-duty-api";


export const authInit = ()=>{
    const success = login(process.env.COD_SSO)

    if(success) console.log("Logged in to COD server")
}


export const log = async () => {


    // liftime statistics
    try {
        let data = await Warzone.fullData(process.env.USER, platforms.Activision)
        console.log(data.data.lifetime)
    } catch(Error) {
        //Handle Exception
        console.error(Error)
    }
    
    //recent matches
    try {
        let data = await Warzone.combatHistory(process.env.USER, platforms.Activision)
        //info of matches
        console.log(data.data.matches[0])

        //summary of match types
        console.log(data.data.summary)
    } catch(Error) {
        //Handle Exception
    }

}

