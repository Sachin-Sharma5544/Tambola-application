let numDisplay = document.querySelector(".my-current-num");

let id = setInterval(
    function () {
        numDisplay.textContent = Math.round(Math.random() * 100);
    },
    1000,
    setTimeout(function () {
        numDisplay.textContent = "End";
        clearInterval(id);
    }, 20000)
);
