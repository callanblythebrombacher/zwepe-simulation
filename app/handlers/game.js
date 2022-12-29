import selectServices from '../services/selectServices'
import handlerFunctions from './handlerFunctions'
import insertServices from "../services/insertServices";
const bettingRound = async (players, cnt) =>
{
    console.log(cnt)
    for (const item of players) {
        const minimumBet = await selectServices.getMinimumBet().then(r=>{return r});
        const walletBalance =
            typeof item.wallet !== 'number'
                ? parseInt(item.wallet)
                : item.wallet;
        if (walletBalance > minimumBet)
        {
            const bet = {
                playerID: item.id,
                betValue: await handlerFunctions.getBetValue(walletBalance),
                headsOrTails: await handlerFunctions.getBetOption(),
            };

           await insertServices.storeBets(bet);
        }
    }
};

const outCome = async (players, cnt) => {
    await bettingRound(players, cnt).then( async (r)=>{
    const config =  await selectServices.getConfig()
        let totalWinnings;
        let houseTotal;
        let totalLosings;
        const housePercentage = 0.1;
        const flipResult = await handlerFunctions.getBetOption().then(async r=>{
    totalLosings = await selectServices.getTotalLosings(flipResult).then(async r=> {
    totalWinnings = await selectServices.getTotalWinnings(flipResult, totalLosings, housePercentage).then(async r=>{
    houseTotal = await handlerFunctions.getHouseTotal(totalLosings, housePercentage).then(async r => {
    await insertServices.storeBetResults(flipResult, totalLosings, totalWinnings, houseTotal).then(async r =>
    {
        //await compensatePlayers()
    });}
    );});});})
})};


export default outCome;
