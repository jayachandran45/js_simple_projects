// Function to switch between front and back cameras
async function switchCamera() {
  try {
    // Enumerate available media devices
    const devices = await navigator.mediaDevices.enumerateDevices();

    // Filter video input devices (cameras)
    const videoInputDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    if (videoInputDevices.length > 1) {
      // Get the current media stream track
      const videoTrack = stream.getVideoTracks()[0];

      // Get the ID of the currently used camera
      const currentDeviceId = videoTrack.getSettings().deviceId;

      // Find the index of the currently used camera in the available video input devices
      const currentIndex = videoInputDevices.findIndex(
        (device) => device.deviceId === currentDeviceId
      );

      // Calculate the index of the next camera to switch to (cyclically)
      const nextIndex = (currentIndex + 1) % videoInputDevices.length;

      // Get the next camera's deviceId
      const nextDeviceId = videoInputDevices[nextIndex].deviceId;

      // Get the constraints for the new camera
      const constraints = {
        video: { deviceId: { exact: nextDeviceId } },
        audio: true, // You can include audio constraints if needed
      };

      // Get the new media stream with the switched camera
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Replace the old video track with the new one
      videoTrack.stop();
      const newVideoTrack = newStream.getVideoTracks()[0];
      stream.addTrack(newVideoTrack);
    }
  } catch (error) {
    console.error("Error switching camera:", error);
  }
}

// Start capturing video stream
let stream;
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((mediaStream) => {
    stream = mediaStream;
    const videoElement = document.querySelector("video");
    videoElement.srcObject = mediaStream;
  })
  .catch((error) => console.error("Error accessing media devices:", error));

const iEle = document.querySelector("i");
iEle.addEventListener("click", () => {
  switchCamera();
});
