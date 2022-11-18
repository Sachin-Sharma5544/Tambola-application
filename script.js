// Dom Elements Declarations/ Initilizations
const numDisplay = document.querySelector(".my-current-num");
const myCalledNums = document.querySelector(".my-called-nums");
const startBtn = document.querySelector(".tambola-start-btn");
const resetBtn = document.querySelector(".tambola-reset-btn");
const playerSection = document.querySelector(".my-player-wrapper");

const playerOne = document.querySelector(".player-1 .player-card-nums");
const playerTwo = document.querySelector(".player-2 .player-card-nums");

const playerOneBtns = document.querySelector(".player-1 .player-buttons");
const playerTwoBtns = document.querySelector(".player-2 .player-buttons");

// Player related declarations
const firstRowBtn = "Row 1";
const secondRowBtn = "Row 2";
const thirdRowBtn = "Row 3";
const fullHouseBtn = "Full House";
const playerRowLength = 5;
// const firstRowEnd = playerCardRowLength;
// const secondRowStart = playerCardRowLength;
// const secondRowEnd = 2 * playerCardRowLength;
// const ThirdRowStart = 2 * playerCardRowLength;
// const ThirdRowEnd = 3 * playerCardRowLength;

//Variable Declarations
let tmblaSeqArr, playerOneArr, playerTwoArr;
let calledNums = [];
let count;
let id; // for clearing the setInterval

//Variable initilizations
const tambolaBoardLength = 100;
const intTime = 500;
const playerCardLength = 15;

//generate tambola seq array
tmblaSeqArr = generateRandomArray(tambolaBoardLength);
playerOneArr = generatePlayerArray(tmblaSeqArr);
playerTwoArr = generatePlayerArray(tmblaSeqArr);

createPlayerCard(playerOne, playerOneArr);
createPlayerCard(playerTwo, playerTwoArr);

//this is for accessing tambola board nums
count = setCount(0);

function setCount(zero) {
    let cnt = zero;
    return cnt;
}

//for generating Random Array for Tabmola board
function generateRandomArray(n) {
    let seqArray = [];
    for (let i = 0; i < n; i++) {
        seqArray.push(i);
    }

    function randomArraySeq(seqArray) {
        let randomArr = [];
        let index, spliceVal;
        for (let i = 0; i < n; i++) {
            index = Math.round(Math.random() * (seqArray.length - 1));
            spliceVal = seqArray.splice(index, 1)[0];
            randomArr.push(spliceVal);
        }

        return randomArr;
    }
    return randomArraySeq(seqArray);
}

//generates player Array
function generatePlayerArray(randomArr) {
    let playerArr = [];
    let index, spliceVal;
    while (playerArr.length < 15) {
        index = Math.round(Math.random() * (randomArr.length - 1));
        spliceVal = randomArr[index];
        playerArr.push(spliceVal);
    }
    return playerArr;
}

function createPlayerCard(player, playerArray) {
    for (let i = 0; i < playerArray.length; i++) {
        let spanEle = document.createElement("span");
        spanEle.classList.add("card-num");
        spanEle.textContent = playerArray[i];
        player.appendChild(spanEle);
    }
}

function setInitialValue(rowVal) {
    let initialVal;
    if (rowVal == firstRowBtn) {
        initialVal = 0;
    } else if (rowVal == secondRowBtn) {
        initialVal = playerRowLength;
    } else if (rowVal == thirdRowBtn) {
        initialVal = 2 * playerRowLength;
    } else if (rowVal == fullHouseBtn) {
        initialVal = 0;
    }

    return initialVal;
}

function setFinalValue(rowVal) {
    let finalVal;
    if (rowVal == firstRowBtn) {
        finalVal = playerRowLength;
    } else if (rowVal == secondRowBtn) {
        finalVal = 2 * playerRowLength;
    } else if (rowVal == thirdRowBtn) {
        finalVal = 3 * playerRowLength;
    } else if (rowVal == fullHouseBtn) {
        finalVal = 3 * playerRowLength;
    }

    return finalVal;
}

function checkRowDone(player, playerVal, rowVal) {
    let rowCountFlag = 0;
    let msg = "";
    let initialVal = setInitialValue(rowVal);
    let finalVal = setFinalValue(rowVal);

    for (let i = initialVal; i < finalVal; i++) {
        if (player.children[i].classList.contains("card-called-num")) {
            rowCountFlag++;
        }
    }

    if (rowVal != fullHouseBtn) {
        msg =
            rowCountFlag == 5
                ? `${rowVal} is done for ${playerVal}`
                : `${rowVal} is not done for ${playerVal}`;
    } else {
        msg =
            rowCountFlag == 15
                ? `${rowVal} is done for ${playerVal}`
                : `${rowVal} is not done for ${playerVal}`;
    }

    alert(msg);
}

function checkClaims(player, button, playerArrry) {
    let initialVal = setInitialValue(button);
    let finalVal = setFinalValue(button);

    for (let i = initialVal; i < finalVal; i++) {
        if (calledNums.includes(playerArrry[i])) {
            player.children[i].classList.add("card-called-num");
        }
    }
}

//startBtn click events
// function callStartBtnEvents() {
//     if (count <= 0) {
//         id = setInterval(function () {
//             if (count == tmblaSeqArr.length) {
//                 numDisplay.textContent = "Over";
//                 clearInterval(id);
//             } else {
//                 numDisplay.textContent = tmblaSeqArr[count];
//                 let spanEle = document.createElement("span");
//                 spanEle.textContent = tmblaSeqArr[count];
//                 spanEle.classList.add("my-num");
//                 myCalledNums.appendChild(spanEle);
//                 calledNums.push(tmblaSeqArr[count]);
//                 count++;
//             }
//         }, intTime);
//     }
// }

//Modified Method
function callStartBtnEvents() {
    if (count == tmblaSeqArr.length) {
        numDisplay.textContent = "Over";
        clearInterval(id);
    } else {
        numDisplay.textContent = tmblaSeqArr[count];
        let spanEle = document.createElement("span");
        spanEle.textContent = tmblaSeqArr[count];
        spanEle.classList.add("my-num");
        myCalledNums.appendChild(spanEle);
        calledNums.push(tmblaSeqArr[count]);
        count++;
    }
}

//Reset Button click events
function callResetBtnEvents() {
    clearInterval(id);
    count = setCount(0);
    myCalledNums.innerHTML = "";
    numDisplay.textContent = "Play";
    calledNums = [];
    tmblaSeqArr = generateRandomArray(tambolaBoardLength);
    playerOne.innerHTML = "";
    playerTwo.innerHTML = "";
    playerOneArr = generatePlayerArray(tmblaSeqArr);
    playerTwoArr = generatePlayerArray(tmblaSeqArr);
    createPlayerCard(playerOne, playerOneArr);
    createPlayerCard(playerTwo, playerTwoArr);
}

//Event Listeners on page Starts

//Start Button Event Listner
// startBtn.addEventListener("click", function () {
//     callStartBtnEvents();
// });

startBtn.addEventListener("click", function () {
    if (count <= 0) {
        id = setInterval(function () {
            callStartBtnEvents();
        }, intTime);
    }
});

//Reset Button Event Listner
resetBtn.addEventListener("click", function () {
    callResetBtnEvents();
});

//Player 1 buttons
playerOneBtns.addEventListener("click", function (e) {
    //check Rows function (Player, button)
    let buttonClicked = e.target.innerHTML;
    let rowVal = e.target.innerHTML;
    let playerVal = "Player 1";
    checkClaims(playerOne, buttonClicked, playerOneArr);
    setTimeout(function () {
        checkRowDone(playerOne, playerVal, rowVal);
    }, 300);
});

playerTwoBtns.addEventListener("click", function (e) {
    let buttonClicked = e.target.innerHTML;
    let rowVal = e.target.innerHTML;
    let playerVal = "Player 2";

    checkClaims(playerTwo, buttonClicked, playerTwoArr);
    setTimeout(function () {
        checkRowDone(playerTwo, playerVal, rowVal);
    }, 300);
});

//Event Listeners on page ends
