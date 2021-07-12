function modoOscuro() {
let theme = document.getElementById("noc");
   if (noc.getAttribute("href") == "../estilos/mis-gifos.css") {
   noc.href = "../estilos/mis-gifosNoc.css";
   } else {
   noc.href = "../estilos/mis-gifos.css";
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

const leftArrow = document.getElementById("left-arrow");
const righttArrow = document.getElementById("right-arrow");
const content = document.getElementById("trending-container");
righttArrow.addEventListener("click", e => {
content.scrollLeft += 100;
})
  
leftArrow.addEventListener("click", e => {
content.scrollLeft -= 100;
});

apiKey = "k7myyVYXWc9zebI6Yrrm5zPMspeexlxV";
misGifosArray = [];
misGifosString = localStorage.getItem("misGifos");
let pantallaMisGifos = document.getElementById('resultados-misgifos');
let modalDesktop = document.createElement("div")
let apikey = "k7myyVYXWc9zebI6Yrrm5zPMspeexlxV";
let modalMobileMG = document.createElement("div");
let modalDesktopMG = document.createElement("div");
  
buscarMisGifos();
  
function buscarMisGifos() {
let pantallaMisGifosVacio = document.querySelector('.contenido');
    if (misGifosString == null || misGifosString == "[]") {
    pantallaMisGifosVacio.style.display = "block";
    pantallaMisGifos.style.display = "none";
    } else {
    misGifosArray = JSON.parse(misGifosString);
    let urlMisGifos = `https://api.giphy.com/v1/gifs?ids=${misGifosArray.toString()}&api_key=${apiKey}`;
    fetch(urlMisGifos)
    .then(response => response.json())
    .then(content => {
    console.log(content);
    mostrarMisGifos(content);
    })
    .catch(err => {
    console.error('mis gifos fallo', err);
    })
  }
}
  
function mostrarMisGifos(content) {
let gifosMisGifosArray = content.data;
    for (let i = 0; i < gifosMisGifosArray.length; i++) {
    pantallaMisGifos.innerHTML += `
    <div class="resultados-gifos">
    <div class="box-mis-gifos">
    <div class="card-gifos">
    <img src="../assets/icon-trash-normal.svg" alt="icon-borrar" onclick="borrarGifo('${content.data[i].id}')" class="borrar">
    <img src="../assets/icon-download.svg" alt="icon-download" id="dow" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')" >
    <img src="../assets/icon-max-normal.svg" alt="icon-max" id="max" onclick="maxGifDesktopMG('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}')">
    </div>
    <div class="texto-mis-gifos">
    <p class="texto-gifos">${content.data[i].username}</p>
    </div>
    </div>
    <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
    </div>
    `;
}
}
  
  //FUNCION BORRAR GIF
function borrarGifo(gif){
let arrayAuxGifos = [];
arrayAuxGifos = JSON.parse(misGifosString);
let indiceGif = arrayAuxGifos.indexOf(gif);
console.log(arrayAuxGifos);
console.log(indiceGif);
arrayAuxGifos.splice(indiceGif,1);
let nuevoMisGifosString = JSON.stringify(arrayAuxGifos);
localStorage.setItem("misGifos", nuevoMisGifosString);
location.reload();
}
  
async function descargarGif(gifImg, gifNombre) {
let blob = await fetch(gifImg).then(img => img.blob());;
invokeSaveAsDialog(blob, gifNombre + ".gif");
}
 
function maxGifDesktopMG(img, id, slug, title) {
  if(window.matchMedia("(min-width: 1023px)").matches){
    modalDesktop.style.display = "block";
    modalDesktop.innerHTML = `<img src="../assets/close.svg" alt="" class="modal-close" onclick="cerrarModalDesktop()">
    <img src="${img}" alt="${id}" class="modal-gif">
    <div class="modal-bar">
    <div class="modal-texto">
    <p class="modal-titulo">${title}</p>
    </div>
    <div class="btn-modal">
    <img src="../assets/icon-fav-hover.svg" alt="fav" id="icon-fav-max-${id}" onclick="agregarFavoritoMax('${id}')">
    <img src="../assets/icon-download-hover.svg" alt="down" onclick="descargaGif('${img}','${slug}')">
    </div>
    </div>
    `
 modalDesktop.classList.add("modal-activo");
 document.body.appendChild(modalDesktop)
 }
}
  
function cerrarModalDesktopMG() {
modalDesktopMG.style.display = "none";
} 

  //trendings
let sliderTrendingGifos = document.getElementById('trending-container');
window.onload = trendingGifos();

function trendingGifos() {
   let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=12`;

   fetch(url)
    .then(resp => resp.json()) //me trae el json con los 4 trending gifos
    .then(content => {
    let trendingGifArray = content.data;
    let trendingGIFOhtml = "";
    for (let i = 0; i < trendingGifArray.length; i++) {
    let trendingGif = trendingGifArray[i];
    trendingGIFOhtml += `
    <div class="trending-box">
    <div class="box-card2">
    <div class="card2">
    <img src="../assets/icon-fav.svg" alt="icon-favorito" id="icon-fav-trending-${trendingGif.id}" class="icon-fav-trending" onclick="agregarFavoritoTrending('${trendingGif.id}')">
    <img src="../assets/icon-download.svg" alt="icon-download" id="dow-trending" onclick="descargarGifTrending('${trendingGif.images.downsized.url}', '${trendingGif.slug}')">
    <img src="../assets/icon-max-normal.svg" alt="icon-max" id="max-trending" onclick="maxGifDesktopTrending('${trendingGif.images.downsized.url}', '${trendingGif.id}', '${trendingGif.slug}', '${trendingGif.username}', '${trendingGif.title}')">
    </div>
    <div class="textos-trending">
    <p id="titulo-gif">${trendingGif.title}</p>
    </div>
    <img src="${trendingGif.images.downsized.url}" alt="${trendingGif.title}" class="trending-gif">
    </div>
    </div>`
}
sliderTrendingGifos.innerHTML = trendingGIFOhtml;
})
.catch(err => {
console.log(err);
})
}

function maxGifDesktopTrending(img, id, slug, title) {
   if (window.matchMedia("(min-width: 1023px)").matches) {
   modalDesktop.style.display = "block";
   modalDesktop.innerHTML = `
   <img src="../assets/close.svg" alt=""  class="modal-close" onclick="cerrarModalDesktop()">
   <img src="${img}" alt="${id}" class="modal-gif">
   <div class="modal-bar">
   <div class="modal-textos">
   <p class="modal-titulo">${title}</p>
   </div>
   <div class="btn-modal">
   <img src="../assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-${id}" onclick="agregarFavoritoMaxTren('${id}')">
   <img src="../assets/icon-download-hover.svg" alt="download-gif" onclick="descargarGifTrending('${img}','${slug}')">
   </div>
   </div>
`;
modalDesktop.classList.add("modal-activo");
document.body.appendChild(modalDesktop);
}
}

function cerrarModalDesktop() {
modalDesktop.style.display = "none";
}

function cerrarModalDesktop() {
modalDesktop.style.display = "none";
}

function agregarFavoritoMaxTren(gif) {
let iconFavMax = document.getElementById('icon-fav-max-' + gif);
iconFavMax.setAttribute("src", "../assets/icon-fav-active.svg");
agregarFavoritoTrendingGral(gif);
}

// FAVORITOS
favoritosArray = [];
favoritosString = localStorage.getItem("gifosFavoritos");

function agregarFavoritoTrending(gif) {
let iconFav = document.getElementById('icon-fav-trending-' + gif);
iconFav.setAttribute("src", "../assets/icon-fav-active.svg");
agregarFavoritoTrendingGral(gif);
}

function agregarFavoritoTrendingGral(gif) {
if (favoritosString == null) {
favoritosArray = [];
} else {
favoritosArray = JSON.parse(favoritosString);
}
favoritosArray.push(gif);
favoritosString = JSON.stringify(favoritosArray);
localStorage.setItem("gifosFavoritos", favoritosString);
}

//DESCARGAR
async function descargarGifTrending(gifImg, gifNombre) {
   let blob = await fetch(gifImg).then(img => img.blob());
   invokeSaveAsDialog(blob, gifNombre + ".gif");
}