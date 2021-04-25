console.log("Javascript is running");

let photoViewerEnabled = false;
const photoViewer = document.getElementById("photoviewer");
const photoViewerImg = document.getElementById("photoviewer-img");
const photoViewerText = document.getElementById("photoviewer-text");

document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        photoViewerClose();
    }
};


function photoViewerClose() {
    document.getElementById("photoviewer-content").style.transform = "scale(0,0)";
    photoViewer.style.transform = "scale(0,0)";
    setTimeout(() => {
        photoViewer.style.display = "none";
        photoViewer.style.transform = "scale(1,1)";
        photoViewerImg.src = "images/loading.gif";
        photoViewerText.innerHTML = `Dummy text goes here`;
        photoViewerEnabled = false;
    }, 280);
}

function photoviewerView(wrapper) {
    // console.log(wrapper)
    if (!photoViewerEnabled) {
        photoViewer.style.display = "block";
        // Assinging values to dom
        photoViewerImg.src = wrapper.getElementsByTagName("img")[0].src;
        photoViewerText.innerHTML = `<p>${wrapper.getElementsByTagName("p")[0].innerText}</p>`;
        document.getElementById("photoviewer-content").style.transform = "scale(1,1)";
        photoViewerEnabled = true;
    }
}
