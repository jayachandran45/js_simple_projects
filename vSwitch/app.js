const videoEle = document.querySelector("video");

window.navigator.mediaDevices
  .getUserMedia({
    video: { facingMode: { exact: "environment" } },
  })
  .then((resolver) => {
    console.log(resolver);
    videoEle.srcObject = resolver;
  });
