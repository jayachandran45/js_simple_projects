const recordVideoEle = document.querySelector("#record-video");
const renderVideoEle = document.querySelector("#render-video");
let front = false;
let mediaStream = null;
let chunk = [];
let mediaRecorder = null;

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

      // Combine the current mediaStream with the previous streams (if any)
      const combinedMediaStream = combineMediaStreams([stream]);

      if (!mediaRecorder) {
        mediaRecorder = new MediaRecorder(combinedMediaStream, {
          audioBitsPerSecond: 100000,
          videoBitsPerSecond: 250000,
          mimeType: "video/webm;codecs=vp9,opus",
        });
        mediaRecorder.ondataavailable = function (e) {
          if (e.data.size > 0) {
            chunk.push(e.data);
          }
        };

        mediaRecorder.onstop = function () {
          const blob = new Blob(chunk, { type: "video/webm" });
          const videoUrl = URL.createObjectURL(blob);
          renderVideoEle.src = videoUrl;
          const ele = document.createElement("h1");
          const value = blob.size / 1000000;
          ele.innerHTML = value;
          document.body.appendChild(ele);
        };
      }

      mediaRecorder.start();
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

setTimeout(() => {
  mediaRecorder.stop();
  console.log(chunk, mediaRecorder);
}, 20000);

function combineMediaStreams(streams) {
  const audioTracks = [];
  const videoTracks = [];

  streams.forEach((stream) => {
    stream.getTracks().forEach((track) => {
      if (track.kind === "audio") {
        audioTracks.push(track);
      } else if (track.kind === "video") {
        videoTracks.push(track);
      }
    });
  });

  const combinedAudioStream = new MediaStream(audioTracks);
  const combinedVideoStream = new MediaStream(videoTracks);

  // Merge audio and video streams into one
  const combinedMediaStream = new MediaStream([
    ...combinedAudioStream.getTracks(),
    ...combinedVideoStream.getTracks(),
  ]);

  return combinedMediaStream;
}
