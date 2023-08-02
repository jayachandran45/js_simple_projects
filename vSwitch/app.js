const recordVideoEle = document.querySelector("#record-video");
const renderVideoEle = document.querySelector("#render-video");
let front = false;
let mediaStream = null;
let chunks = [];
let mediaRecorder = null;
let timeoutSet = false;

function switchCamera() {
  front = !front;
  const facingMode = front ? "user" : "environment";

  if (mediaStream) {
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => track.stop());
  }

  // Request a new media stream with the updated facingMode
  window.navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: facingMode },
    })
    .then((stream) => {
      mediaStream = stream;
      recordVideoEle.srcObject = stream;

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;

      if (!timeoutSet) {
        setTimeout(() => {
          mediaRecorder.onstop = handleStop;
          console.log("settimeout works");
        }, 10000);
        timeoutSet = true; // Set the flag to true after setting the timeout
      }
    })
    .catch((error) => {
      console.error("Error accessing media devices:", error);
    });
}

// Add event listener to the button to toggle the camera
const toggleCameraButton = document.querySelector("button");
toggleCameraButton.addEventListener("click", switchCamera);

// Initially, get the video stream with the default facing mode (front camera)
switchCamera();

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    chunks.push(event.data);
  }
}

function handleStop(event) {
  const videoBlob = new Blob(chunks, { type: "video/webm" });
  const videoBlobUrl = URL.createObjectURL(videoBlob);

  renderVideoEle.src = videoBlobUrl;
  chunks = [];
  // Use the videoBlob here as needed (e.g., upload to server, save to file, etc.)
  console.log("Video Blob:", videoBlob);
}
