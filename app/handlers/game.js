import selectServices from '../services/selectServices'
import handlerFunctions from './handlerFunctions'

const bettingRound = async () => {
    const players = await selectServices.getPlayers();
    players.foreach(async (item) => {
        const minimumBet = await getMinimumBet();
        const walletBalance =
            typeof item.wallet !== 'number'
                ? parseInt(item.wallet)
                : item.wallet;
        if (walletBalance > minimumBet) {
            const bet = {
                playerID: item.id,
                betValue: getBetValue(walletBalance),
                headsOrTail: handlerFunctions.getBetOption(),
            };
            await storeBet(bet);
        }
    });
};

const outCome = async () => {
    await bettingRound();
    const flipResult = await getBetOption();
    const totalWinnings = await getTotalWinnigs(flipResult);
    const totalLosings = await getTotalLosings(flipResult);
    const houseTotal = await getHouseTotal(totalLosings, totalWinnings);
    await storeBetResults(flipResult, totalLosings, totalWinnings, houseTotal);
    await compensatePlayers();
};

export default outCome();
