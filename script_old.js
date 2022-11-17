/* 

The logic implemented in the Script_old.js file is not smooth, also it some times blocks 
the main thread which is not good

*/

const numDisplay = document.querySelector(".my-current-num");
const myCalledNums = document.querySelector(".my-called-nums");
const startBtn = document.querySelector(".tambola-start-btn");
const resetBtn = document.querySelector(".tambola-reset-btn");
let calledNum = [];

startBtn.addEventListener("click", function () {
    let id = setInterval(function () {
        let genNum = Math.round(Math.random() * 99);
        if (!calledNum.includes(genNum)) {
            calledNum.push(genNum);
            numDisplay.textContent = genNum;
            let spanEle = document.createElement("span");
            spanEle.textContent = genNum;
            spanEle.classList.add("my-num");
            myCalledNums.appendChild(spanEle);

            if (calledNum.length == 100) {
                numDisplay.textContent = "End";
                console.log(calledNum);
                clearInterval(id);
            }
        }
    }, 10);
});

resetBtn.addEventListener("click", function () {
    myCalledNums.innerHTML = "";
    numDisplay.textContent = "00";
    calledNum = [];
});
