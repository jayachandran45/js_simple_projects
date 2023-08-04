const recordVideoEle = document.querySelector("#record-video");
const renderVideoEle = document.querySelector("#render-video");
let front = false;
let mediaStream = null;
let chunks = [];
let mediaRecorder = null;
let mediaRecorder1 = null;
let timeoutSet = false;

let m = true;

function switchCamera() {
  front = !front;
  let facingMode = front ? "user" : "environment";

  if (mediaStream) {
    mediaRecorder.stop();
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

      if (m) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        mediaRecorder.onstop = () => {
          console.log("record 1 stopped");
          const blo = new Blob(chunks);
          console.log(chunks, chunks.length);
          console.log(blo);
        };
      }

      if (!m) {
        mediaRecorder1 = new MediaRecorder(stream);
        mediaRecorder1.start();
        mediaRecorder1.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder1.onstop = () => {
          const completeBlob = new Blob(chunks);
          console.log(chunks, chunks.length);

          const combinedBlobPromise = combineBlobs(chunks);

          combinedBlobPromise.then((combinedBlob) => {
            // Use the combinedBlob here
            console.log(combinedBlob);
            const videoUrl = URL.createObjectURL(combinedBlob);
            renderVideoEle.src = videoUrl;

            // Now you can set it as the source for a video element, upload it, etc.
          });
        };
      }
      m = false ? true : false;
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

function combineBlobs(blobs) {
  const blobPromises = blobs.map((blob) => blob.arrayBuffer());

  return Promise.all(blobPromises).then((arrayBuffers) => {
    // Concatenate the ArrayBuffers into a new single ArrayBuffer
    const combinedBuffer = arrayBuffers.reduce((accumulator, currentBuffer) => {
      const totalLength = accumulator.byteLength + currentBuffer.byteLength;
      const combined = new Uint8Array(totalLength);
      combined.set(new Uint8Array(accumulator), 0);
      combined.set(new Uint8Array(currentBuffer), accumulator.byteLength);
      return combined;
    }, new Uint8Array());

    // Create a new Blob using the combined ArrayBuffer
    const combinedBlob = new Blob([combinedBuffer], { type: blobs[0].type });
    return combinedBlob;
  });
}
