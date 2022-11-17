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

//Variable Declarations
let tmblaSeqArr, playerOneArr, playerTwoArr;
let calledNums = [];
let count;
let id; // for clearing the setInterval

//Variable initilizations
const tambolaBoardLength = 100;
const intTime = 1000;
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

//Event Listeners on page Starts

//Start Button Event Listner
startBtn.addEventListener("click", function () {
    // let count = 0;
    if (count <= 0) {
        id = setInterval(function () {
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
        }, intTime);
    }
});

//Reset Button Event Listner
resetBtn.addEventListener("click", function () {
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
});

//Player 1 buttons
playerOneBtns.addEventListener("click", function (e) {
    if (e.target.innerHTML == "First Row") {
        for (let i = 0; i < 5; i++) {
            if (calledNums.includes(playerOneArr[i])) {
                console.log(
                    "it includes",
                    calledNums.indexOf(playerOneArr[i]) + 1,
                    playerOneArr[i]
                );
            }
        }
    }
});

playerTwoBtns.addEventListener("click", function () {
    console.log("player 2 ka button daab diya");
});

//Event Listeners on page ends
