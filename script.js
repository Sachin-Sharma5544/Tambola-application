let numDisplay = document.querySelector(".my-current-num");

let id = setInterval(
    function () {
        numDisplay.textContent = Math.round(Math.random() * 10);
    },
    1000,
    setTimeout(function () {
        clearInterval(id);
    }, 20000)
);
