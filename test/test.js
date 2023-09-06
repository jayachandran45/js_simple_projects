// selecting all the value using dom we want
const recordVideoEle = document.querySelector("#recording");
const showVideoEle = document.querySelector("#showing");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");

let mediaRecorder;
let chunks = [];

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    recordVideoEle.srcObject = stream;
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
}

startCamera();

startBtn.addEventListener("click", () => {
  mediaRecorder = new MediaRecorder(recordVideoEle.srcObject);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const videoBlob = new Blob(chunks, { type: "video/webm" });
    showVideoEle.src = URL.createObjectURL(videoBlob);
    console.log(videoBlob.size);
    showVideoEle.play();
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  // pauseBtn.disabled = false;
  // stopBtn.disabled = false;

  setTimeout(() => {
    stopRecording();
  }, 5000); // Stop recording after 50 seconds
});

// pauseBtn.addEventListener("click", () => {
//   if (mediaRecorder.state === "recording") {
//     mediaRecorder.pause();
//     pauseBtn.innerText = "Resume Recording";
//   } else if (mediaRecorder.state === "paused") {
//     mediaRecorder.resume();
//     pauseBtn.innerText = "Pause Recording";
//   }
// });

// stopBtn.addEventListener("click", () => {
//   stopRecording();
// });

function stopRecording() {
  // if (mediaRecorder.state === "recording" || mediaRecorder.state === "paused") {
  //   mediaRecorder.stop();
  //   startBtn.disabled = false;
  //   pauseBtn.disabled = true;
  //   stopBtn.disabled = true;
  // }
  mediaRecorder.stop();
}
