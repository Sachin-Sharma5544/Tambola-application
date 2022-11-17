const numDisplay = document.querySelector(".my-current-num");
const myCalledNums = document.querySelector(".my-called-nums");
const startBtn = document.querySelector(".tambola-start-btn");
const resetBtn = document.querySelector(".tambola-reset-btn");
const tambolaLength = 100;
const intTime = 1;
let tmblaSeqArr = generateTambolaSeq(tambolaLength);
let count = resetCount(0);

function resetCount(zero) {
    let cnt = zero;
    return cnt;
}

function generateTambolaSeq(n) {
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

startBtn.addEventListener("click", function () {
    // let count = 0;
    if (count <= 0) {
        let id = setInterval(function () {
            if (count == tmblaSeqArr.length) {
                numDisplay.textContent = "Over";
                clearInterval(id);
            } else {
                numDisplay.textContent = tmblaSeqArr[count];
                let spanEle = document.createElement("span");
                spanEle.textContent = tmblaSeqArr[count];
                spanEle.classList.add("my-num");
                myCalledNums.appendChild(spanEle);
                count++;
            }
        }, intTime);
    }
});

resetBtn.addEventListener("click", function () {
    count = resetCount(0);
    myCalledNums.innerHTML = "";
    numDisplay.textContent = "Play";
    tmblaSeqArr = generateTambolaSeq(tambolaLength);
});
