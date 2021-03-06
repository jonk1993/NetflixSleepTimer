var timeLeft = 0;

function updateTimer(time) {
    timeLeft = time;
    document.getElementById('timer').innerHTML = pad(Math.floor(timeLeft / 60), 2) + ":" + pad(timeLeft % 60, 2);
}

function pad(num, size) {
    var s = "0" + num;
    return s.substr(s.length-size);
}

function handleTimer() {
    chrome.extension.sendRequest({timeLeft:timeLeft});
    document.getElementById('selectors').style.visibility = "hidden";
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        timeLeft = request.remainingSecs;
        updateTimer(timeLeft);
        console.log("laucher received", request.remainingSecs);
    }
);

function handleReset() {
    document.getElementById('selectors').style.visibility = "visible";
    document.getElementById('timer').innerHTML = "";
    chrome.extension.sendRequest({timeLeft:-1});
    timeLeft = 0;
}

function main() {

    document.getElementById('15_min').addEventListener('click', function() { updateTimer(900) });
    document.getElementById('30_min').addEventListener('click', function() { updateTimer(1800) });
    document.getElementById('60_min').addEventListener('click', function() { updateTimer(3600) });

    document.getElementById('start_button').addEventListener('click', handleTimer);
    document.getElementById('reset_button').addEventListener('click', handleReset);
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
    main();
});