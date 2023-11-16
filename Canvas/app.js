const camVideoElement = document.querySelector("#camVideo");
const recVideoElement = document.querySelector("#recordedVideo");
const stopBtnEle = document.querySelector("#stop-btn");

let Chunks = [];

async function record() {
  const stream = await window.navigator.mediaDevices.getUserMedia({
    video: true,
  });
  // passing capturing video to the video element
  camVideoElement.srcObject = stream;
  const mr = new MediaRecorder(stream);
  mr.ondataavailable = (event) => {
    if (event.data.size > 0) {
      Chunks.push(event.data);
    }
  };

  // Start recording
  mr.start();

  mr.onstop = () => {
    const blob = new Blob(Chunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    recVideoElement.src = url;
  };

  // add stop mediarecorder when button clicks
  stopBtnEle.addEventListener("click", () => {
    mr.stop();
  });
}

record();
