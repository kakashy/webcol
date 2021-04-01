// db
// TODO `Listen to db changes`
var cloudant_chat = 'https://e6b140c8-fa3f-4bf4-854a-ce9d2befab62-bluemix.cloudantnosqldb.appdomain.cloud'
var cloudant_answer = 'https://e6b140c8-fa3f-4bf4-854a-ce9d2befab62-bluemix.cloudantnosqldb.appdomain.cloud'
var cloudant_offer = 'https://e6b140c8-fa3f-4bf4-854a-ce9d2befab62-bluemix.cloudantnosqldb.appdomain.cloud'

// servers
const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  };
// global
let pc = new RTCPeerConnection(servers)
let localStream = null
let remoteStream = null

var webCam = document.getElementById('web-cam')
var remoteCam = document.getElementById('remote-cam')
var camBtn = document.getElementById('cam-btn')
var callBtn = document.getElementById('call-btn')
var answerBtn = document.getElementById('answer-btn')
var answerValue = document.getElementById('answer-value')

camBtn.addEventListener('click', async ()=>{
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
    remoteStream = new MediaStream();

    // ui
    camBtn.style.border = 'red solid 2px'

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
  
    webCam.srcObject = localStream;
    remoteCam.srcObject = remoteStream;
  
    callBtn.disabled = false;
    answerBtn.disabled = false;
    camBtn.disabled = true;
})