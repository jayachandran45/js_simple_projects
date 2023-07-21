// selecting all the value using dom we want
const recordVideoEle = document.querySelector("#recording");
const showingVideoEle = document.querySelector("#showing");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const showVideoEle = document.querySelector("#showing");
let chunk = [];
let mediaRecorder;
async function record() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } },
    });

    recordVideoEle.srcObject = mediaStream;

    // start btn functionality
    recordFunction(mediaStream);
  } catch (e) {
    alert("allow video and audio");
  }
}

record();

function recordFunction(mediaStream) {
  mediaRecorder = new MediaRecorder(mediaStream, {
    videoBitsPerSecond: 250000,
    mimeType: "video/webm;codecs=vp9,opus",
  });
  mediaRecorder.start();
  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      chunk.push(e.data);
    }
  };

  mediaRecorder.onstop = function () {
    const blob = new Blob(chunk, { type: "video/webm" });
    const videoUrl = URL.createObjectURL(blob);
    showVideoEle.src = videoUrl;
    const ele = document.createElement("h1");
    const value = blob.size / 1000000;
    ele.innerHTML = value;
    document.body.appendChild(ele);
  };

  setTimeout(() => {
    mediaRecorder.stop();
    console.log(chunk, mediaRecorder);
  }, 40000);
}

startBtn.addEventListener("click", () => {
  startBtn.disable = true;
  stopBtn.disable = false;
});
