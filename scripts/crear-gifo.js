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


const video_container = document.querySelector(".cuadrado");
const start_button = document.getElementById("btn-grabar");
const stop_button = document.getElementById("btn-finalizar");
const img_element = document.getElementById("img-element");

let camera;
let recorder;
let is_recording = false;

function start_recording() {
    let cam_options = {
    video: true,
    audio: false
};

    let recorder_options = {
    type: "gif"
    };

    if (!navigator.mediaDevices.getUserMedia) {
    throw new Error("No camera");
    }

    navigator.mediaDevices.getUserMedia(cam_options)
    .then((response) => {
    camera = response;
    video_container.srcObject = camera;
    video_container.play();
    recorder = RecordRTC(camera, recorder_options);
    recorder.startRecording();
    recorder.camera = camera;
    is_recording = true;
    })
    .catch(err => {
    throw new Error(err);
    });
}

function stop_recording() {
    let form;
    let src;
    let blob;
    recorder.camera.stop();
    blob = recorder.getBlob();
    form = new FormData();
    form.append("file", blob, 'test.gif');
    // here is where upload happens
    src = URL.createObjectURL(blob);
    img_element.src = src;
    recorder.destroy();
    recorder = null;
    video_container.srcObject = null;
    is_recording = false;
}

function setup_buttons() {
    start_button.addEventListener("click", (e) => {
    if (!is_recording)
    start_recording();
    });

    stop_button.addEventListener("click", (e) => {
        if (is_recording)
        recorder.stopRecording(stop_recording);
    });
}

function main() {
    setup_buttons();
}

main();

