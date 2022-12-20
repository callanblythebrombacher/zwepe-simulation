const getBetOption = () => {
    const result = Math.random();
    if (result > 0.5) {
        return 'heads';
    } else {
        return 'tails';
    }
};


export default {
    getBetOption

}