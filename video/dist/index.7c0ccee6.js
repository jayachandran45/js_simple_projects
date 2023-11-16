// selecting all the value using dom we want
const recordVideoEle = document.querySelector("#recording");
const showVideoEle = document.querySelector("#showing");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
let mediaRecorder;
let chunks = [];
window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then((stream)=>{}).catch((error)=>{
    console.error("Error accessing camera and microphone:", error);
});

//# sourceMappingURL=index.7c0ccee6.js.map
