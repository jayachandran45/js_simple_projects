const videoEle = document.querySelector(video);
let currentFacingMode = "environment"; // Initial facing mode, default to back camera

function switchCamera() {
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";

  window.navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: { exact: currentFacingMode } },
    })
    .then((stream) => {
      videoEle.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error accessing media devices:", error);
    });
}

// Add event listener to the button to toggle the camera
const toggleCameraButton = document.getElementById("toggleCameraButton");
toggleCameraButton.addEventListener("click", switchCamera);

// Initially, get the video stream with the default facing mode (back camera)
switchCamera();
