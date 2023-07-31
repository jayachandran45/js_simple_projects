let currentCamera = "environment"; // 'environment' is used for the back camera, 'user' is used for the front camera

async function switchCamera() {
  const constraints = { video: { facingMode: currentCamera } };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector("video");

    // Stop the existing tracks
    if (videoElement.srcObject) {
      const tracks = videoElement.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }

    // Set the new stream to the video element
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }

  // Toggle between front and back cameras
  currentCamera = currentCamera === "environment" ? "user" : "environment";
}

document.querySelector("i").addEventListener("click", switchCamera);
