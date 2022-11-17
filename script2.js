let newNumsArray = generateNumsArray();

let newCalledArray = generateCalledArray(newNumsArray);

function generateNumsArray() {
    let newNumsArray = [];
    for (let i = 0; i < 100; i++) {
        newNumsArray.push(i);
    }
    return newNumsArray;
}

function generateCalledArray(newNumsArray) {
    let newCalledArray = [];
    let index;
    for (let j = 0; j < 100; j++) {
        index = Math.floor(Math.random() * (newNumsArray.length - 1));

        let spliceVal = newNumsArray.splice(index, 1)[0];
        newCalledArray.push(spliceVal);
    }

    return newCalledArray;
}
