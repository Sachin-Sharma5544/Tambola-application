function generateRandomArray(n) {
    let seqArray = [];
    for (let i = 0; i < n; i++) {
        seqArray.push(i);
    }

    function createRandomArray(seqArray) {
        let newRandArray = [];
        let index, spliceVal;
        for (let i = 0; i < n; i++) {
            index = Math.floor(Math.random() * (seqArray.length - 1));
            spliceVal = seqArray.splice(index, 1)[0];
            newRandArray.push(spliceVal);
        }

        return newRandArray;
    }
    return createRandomArray(seqArray);
}
