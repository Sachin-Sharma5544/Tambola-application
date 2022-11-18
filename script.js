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
const ThirdRowBtn = "Row 3";
const FullHouseBtn = "Full House";
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

function checkClaims(player, button, playerArrry) {
    if (button == firstRowBtn) {
        for (let i = 0; i < playerRowLength; i++) {
            if (calledNums.includes(playerArrry[i])) {
                player.children[i].classList.add("card-called-num");
            }
        }
    } else if (button == secondRowBtn) {
        for (let i = playerRowLength; i < 2 * playerRowLength; i++) {
            if (calledNums.includes(playerOneArr[i])) {
                player.children[i].classList.add("card-called-num");
            }
        }
    } else if (button == ThirdRowBtn) {
        for (let i = 2 * playerRowLength; i < 3 * playerRowLength; i++) {
            if (calledNums.includes(playerOneArr[i])) {
                player.children[i].classList.add("card-called-num");
            }
        }
    } else if (button == FullHouseBtn) {
        for (let i = 0; i < playerRowLength; i++) {
            if (calledNums.includes(playerOneArr[i])) {
                player.children[i].classList.add("card-called-num");
            }
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

    checkClaims(playerOne, buttonClicked, playerOneArr);
});

playerTwoBtns.addEventListener("click", function (e) {
    let buttonClicked = e.target.innerHTML;
    checkClaims(playerTwo, buttonClicked, playerTwoArr);
});

//Event Listeners on page ends
