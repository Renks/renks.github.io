let infoSpan;
let counterProgressBar;
let counterMaxInput;
const counterName = "gurbaniCounter";
const counterMaxName = "gurbaniCounterMax";
let currentCounter = 0;
let currentCounterMax = 108;

function setCounterMaxVal(elem) {
    if (elem <= 0 || elem == null) {
        return;
    }
    updateCounterMaxVal(elem.value);
    localStorage.setItem(counterMaxName, currentCounterMax);
}
function updateCounterMaxVal(val) {
    if (val <= 0 || val == null) {
        return;
    }
    currentCounterMax = val;
    counterProgressBar.setAttribute("max", currentCounterMax);
    counterMaxInput.value = currentCounterMax;
    updateCounterUI(currentCounter);
}
function updateCounterUI(val) {
    infoSpan.innerText = "Count: " + val + "/" + currentCounterMax;
    counterProgressBar.setAttribute("value", val);
}

//#region Add,Remove,Reset
function addCount(e) {
    // get current counter value
    currentCounter = localStorage.getItem(counterName);
    if (currentCounter == null) {
        // we need to add a new counter
        currentCounter = 1;
    } else {
        currentCounter = 1 + parseInt(currentCounter);
    }
    updateCounterUI(currentCounter);
    localStorage.setItem(counterName, currentCounter);
}
function removeCount(e) {
    // get current counter value
    currentCounter = localStorage.getItem(counterName);
    if (currentCounter == null || currentCounter <= 0) {
        return;
    }
    currentCounter = parseInt(currentCounter) - 1;
    updateCounterUI(currentCounter);
    localStorage.setItem(counterName, currentCounter);
}
function resetCount(e) {
    // remove counter
    localStorage.removeItem(counterName);
    localStorage.removeItem(counterMaxName);
    // reload page without cache
    location.reload(true);
}
//#endregion Add,Remove,Reset

//#region FullScreen
function toggleFullScreen(elem) {
    let fullscreenBtn = document.querySelector("#fullscreenBtn");
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
        fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    }
    else {
        cancelFullScreen.call(doc);
        fullscreenBtn.innerHTML = '<i class="fa fa-expand" aria-hidden="true"></i>';
    }
}
//#endregion FullScreen

window.onload = (event) => {
    // console.log("page is fully loaded");
    
    // init global variables
    infoSpan = document.querySelector("#info");
    counterProgressBar = document.querySelector("#counterProgressBar");
    counterMaxInput = document.querySelector("#counterMaxInput");
    currentCounter = localStorage.getItem(counterName) || 0;
    currentCounterMax = localStorage.getItem(counterMaxName) || 108;


    updateCounterMaxVal(currentCounterMax);
    // updateCounterUI(currentCounter); reduntant cause updateCounterMaxVal() calls it
};
