const recordVideoEle = document.querySelector("#record-video");
const renderVideoEle = document.querySelector("#render-video");
let front = false;
let mediaStream = null;
let chunks = [];
let mediaRecorder = null;
let mediaRecorder1 = null;
let timeoutSet = false;

let m = true;

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

      if (m) {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        mediaRecorder.start();
      }
      if (!m) {
        mediaRecorder.stop();
        mediaRecorder1 = new MediaRecorder(stream);

        mediaRecorder1.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder1.onstop = () => {
          const completeBlob = new Blob(chunks, { type: "video/webm" });
          const videoUrl = URL.createObjectURL(completeBlob);
          renderVideoEle.src = videoUrl;
          console.log(completeBlob);
        };
        mediaRecorder1.start();
      }
      m = false;
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
