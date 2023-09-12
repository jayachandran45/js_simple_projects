const videoElement = document.getElementById("video");
const canvasElement = document.getElementById("canvas");
const timestampElement = document.getElementById("timestamp");
const recordedVideoElement = document.getElementById("recordedVideo");

let mediaRecorder;
let recordedChunks = [];

// Access the user's camera and set up the video stream
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;

    mediaRecorder = new MediaRecorder(canvasElement.captureStream(), {
      mimeType: "video/webm",
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      recordedVideoElement.src = url;
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

// Draw the video frame on the canvas and overlay the timestamp
function drawFrame() {
  const context = canvasElement.getContext("2d");
  context.drawImage(
    videoElement,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

  // Get the current date and time
  const now = new Date();
  const timestamp = now.toLocaleString();

  // Overlay the timestamp on the canvas
  context.font = "16px Arial";
  context.fillStyle = "red";
  context.fillText(timestamp, 10, 30);

  // Display the timestamp in a separate element
  timestampElement.textContent = timestamp;

  // Repeat the drawing on the next animation frame
  requestAnimationFrame(drawFrame);
}

// Start the camera and drawing loop
videoElement.addEventListener("play", drawFrame);
startCamera();
