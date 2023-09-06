const recordEle = document.querySelector("#record");
const renderEle = document.querySelector("#render");
let chunks = [];
let mediaRecorder;

window.navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    recordEle.srcObject = stream;
    recordEle.play();

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const videoBlob = new Blob(chunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(videoBlob);
      console.log(videoUrl);
      renderEle.src = videoUrl;
      renderEle.play();
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000);
  });
