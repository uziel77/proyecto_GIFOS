function modoOscuro() {
  let theme = document.getElementById("noc");
  if (noc.getAttribute("href") == "../estilos/crear-gifo.css") {
  noc.href = "../estilos/crear-gifoNoc.css";
  } else {
  noc.href = "../estilos/crear-gifo.css";
  }
}
const iconoMenu = document.querySelector(".icono-menu"),
menu = document.querySelector("#menu");

iconoMenu.addEventListener("click", (e)=>{
  menu.classList.toggle("active");
  document.body.classList.toggle("opacity");
  const rutaActual = e.target.getAttribute("src");
  if(rutaActual == "../assets/burger.svg"){
  e.target.setAttribute("src","../assets/close.svg");
  } else {
  e.target.setAttribute("src","../assets/burger.svg");
  }
})


let comenzar = document.getElementById("btn-comenzar");
let grabar = document.getElementById("btn-grabar");
let finalizar = document.getElementById("btn-finalizar");
let subirGifo = document.getElementById("btn-gifo");
let spans = document.querySelectorAll("#sp");
let contador = document.getElementById("contador");
let repetir = document.getElementById("repetir");
let cargando = document.getElementById("cargando");
let loader = document.getElementById("load");
let parrafoVideo = document.getElementById("video-p");
let cargandoVideo = document.getElementById("cargando-video");
let cargaDeVideo = document.getElementById("cargando-video");

let recorder;
let blob;
let dateStarted;

let from = new FormData();
let misGifosArray = [];
let misGifosString = localStorage.getItem("misGifos");
let video = document.getElementById("grabacion");
let gifTerminado = document.getElementById("gif-terminado");


comenzar.addEventListener("click",comenzarGifo);

function comenzarGifo(){
    comenzar.style.display="none";
    let titulo = document.getElementById("titulo-grabar")
    let texto = document.getElementById("texto-grabar")
    titulo.innerHTML = "¿Nos das acceso a tu camara?";
    texto.innerHTML = "El acceso a tu camara sera valido solo en el tiempo que estes creando tu gifo."
    spans[0].classList.add("spans");
    
    navigator.mediaDevices.getUserMedia({audio: false,video:{width: 480, height:320}})


    .then(function(mediaStream){
        titulo.style.display = "none";
        texto.style.display = "none";
        grabar.style.display = "block";
        spans[0].classList.remove("spans")
        spans[1].classList.add("spans")
        video.style.display ="block";
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
            video.play();
        };
        recorder = RecordRTC(mediaStream,{
            type: "gif"
        })
    })
}

grabar.addEventListener("click",grabarGifo);
function grabarGifo(){
    recorder.startRecording();
    console.log("grabando el gifo");
    grabar.style.display="none";
    finalizar.style.display ="block";
    repetir.style.display = "none";
    dateStarted = new Date().getTime();
    (function looper(){
        if(!recorder){
            return;
        }
        contador.innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted)/ 1000);
        setTimeout(looper, 1000);
    })
}


finalizar.addEventListener("click", finalizarGif);

function finalizarGif(){
    console.log("gif terminado");
    finalizar.style.display ="none";
    subirGifo.style.display ="block";
    contador.style.display ="block";
    repetir.style.display ="block";

    recorder.stopRecording(function(){
        video.style.display = "none";
        gifTerminado.style.display ="block";
        blob = recorder.getBlob();
        gifTerminado.src = URL.createObjectURL(recorder.getBlob());
        from.append("file", recorder.getBlob(), "mygif.gif");
        from.append("api_key","k7myyVYXWc9zebI6Yrrm5zPMspeexlxV")
    })
}








// let camera;
// let recorder;
// let is_recording = false;

// function start_recording() {
    // let cam_options = {
    // video: true,
    // audio: false
// };

//     let recorder_options = {
//     type: "gif"
//     };

//     if (!navigator.mediaDevices.getUserMedia) {
//     throw new Error("No camera");
//     }

//     navigator.mediaDevices.getUserMedia(cam_options)
//     .then((response) => {
//     camera = response;
//     video_container.srcObject = camera;
//     video_container.play();
//     recorder = RecordRTC(camera, recorder_options);
//     recorder.startRecording();
//     recorder.camera = camera;
//     is_recording = true;
//     })
//     .catch(err => {
//     throw new Error(err);
//     });
// }

// function stop_recording() {
//     let form;
//     let src;
//     let blob;
//     recorder.camera.stop();
//     blob = recorder.getBlob();
//     form = new FormData();
//     form.append("file", blob, 'test.gif');
//     // here is where upload happens
//     src = URL.createObjectURL(blob);
//     img_element.src = src;
//     recorder.destroy();
//     recorder = null;
//     video_container.srcObject = null;
//     is_recording = false;
// }

// function setup_buttons() {
//     start_button.addEventListener("click", (e) => {
//     if (!is_recording)
//     start_recording();
//     });

//     stop_button.addEventListener("click", (e) => {
//         if (is_recording)
//         recorder.stopRecording(stop_recording);
//     });
// }

// function main() {
//     setup_buttons();
// }

// main();

