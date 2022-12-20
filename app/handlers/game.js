import selectServices from '../services/selectServices'
import handlerFunctions from './handlerFunctions'
import insertServices from "../services/insertServices";
const bettingRound = async () => {
    const players = await selectServices.getPlayers();
    for (const item of players) {
        const minimumBet = await selectServices.getMinimumBet();
        const walletBalance =
            typeof item.wallet !== 'number'
                ? parseInt(item.wallet)
                : item.wallet;
        if (walletBalance > minimumBet) {
            const bet = {
                playerID: item.id,
                betValue: await handlerFunctions.getBetValue(walletBalance),
                headsOrTail: handlerFunctions.getBetOption(),
            };
            await insertServices.storeBets(bet);
        }
    }
};

const outCome = async () => {
    await bettingRound();
    const flipResult = handlerFunctions.getBetOption();
    const config =  await selectServices.getConfig()
    const housePercentage = parseInt(config.housePercentage)
    const totalLosings = await selectServices.getTotalLosings(flipResult);
    const totalWinnings = await selectServices.getTotalWinnings(flipResult, totalLosings, housePercentage);
    const houseTotal = await handlerFunctions.getHouseTotal(totalLosings, housePercentage);
    await storeBetResults(flipResult, totalLosings, totalWinnings, houseTotal);
    await compensatePlayers();
};

export default outCome();
