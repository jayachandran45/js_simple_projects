const videoEle = document.querySelector("video");

let front = true;
document.querySelector("button").onclick = () => {
  front = !front;
};
window.navigator.mediaDevices
  .getUserMedia({
    video: { facingMode: front ? "user" : "environment" },
  })
  .then((stream) => {
    videoEle.srcObject = stream;
  })
  .catch((error) => {
    console.error("Error accessing media devices:", error);
  });
