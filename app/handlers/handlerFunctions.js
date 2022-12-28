import selectServices from '../services/selectServices'

const getBetOption = async () => {
    const result = Math.random();
    if (result > 0.5) {
        return 'heads';
    } else {
        return 'tails';
    }
};

const getBetValue = async (walletBalance) =>
{
    const bettingOptions = await selectServices.getBets().then(r=>{return r})
    let run = true
    while(run)
    {
        let choice = Math.random()

        if (choice < 0.333 && walletBalance > bettingOptions[0]) {
            run = false
            return bettingOptions[0]
        } else if (choice > 0.333 && choice < 0.666 && walletBalance > bettingOptions[1]) {
            run = false
            return bettingOptions[1]
        } else if (choice > 0.666 && walletBalance > bettingOptions[2]) {
            run = false
            return bettingOptions[2]
        }
    }
}

const getHouseTotal = async ( totalLosings, housePercentage) =>
{
    return totalLosings * housePercentage
};

export default {
    getBetOption,
    getBetValue,
    getHouseTotal
}
