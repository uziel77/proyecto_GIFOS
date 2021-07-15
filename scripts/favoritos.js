const leftArrow = document.getElementById("left-arrow");
const righttArrow = document.getElementById("right-arrow");
const content = document.getElementById("trending-container");
const iconoMenu = document.querySelector(".icono-menu");
let menu = document.querySelector("#menu");
let modal = document.createElement("div")
let apikey = "k7myyVYXWc9zebI6Yrrm5zPMspeexlxV";

let btnNoc = document.getElementById("mod");
let btnNoc1 = document.getElementById("mod1");
btnNoc.addEventListener("click", e=> {
   modoOscuro()
})
btnNoc1.addEventListener("click", e=> {
   modoOscuro()
})

function modoOscuro() {
let theme = document.getElementById("noc");
  if (noc.getAttribute("href") == "../estilos/favoritos.css") {
  noc.href = "../estilos/favoritosNoc.css";
  } else {
  noc.href = "../estilos/favoritos.css";
  }
}

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

righttArrow.addEventListener("click", e => {
content.scrollLeft += 100;
})

leftArrow.addEventListener("click", e => {
content.scrollLeft -= 100;
});

let pantallaFav = document.getElementById("resultados-fav")
let favoritosArray = [];
let favoritosString = localStorage.getItem("gifosFavoritos");
let urlActual = window.location.pathname;

buscarFav();

function buscarFav(){
let pantallaFavVacio = document.getElementById("contenido")
  if(favoritosString == null || favoritosString == "[]"){
  pantallaFavVacio.style.display = "block";
  pantallaFav.style.display = "none";
  } else {
  favoritosArray = JSON.parse(favoritosString);
  let urlFav = `https://api.giphy.com/v1/gifs?ids=${favoritosArray.toString()}&api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV`
  fetch(urlFav)
  .then(res => res.json())
  .then(content =>{
  mostrarFav(content)
}).catch(e =>{
console.error("fallo favorito", e)
})
}
}
function mostrarFav(content) {
let gifosFavoritosArray = content.data;
  for(let i=0; i< gifosFavoritosArray.length; i++) {
  pantallaFav.innerHTML += `
  <div class="box-fav">
  <div class="fav-accion">
  <div class="card-fav">
  <img src="../assets/icon-fav-active.svg" alt="icon-favorito" id="icon-borrar-fav-${content.data[i].id}" class="fav" onclick="borrarFav('${content.data[i].id}')">
  <img src="../assets/icon-download.svg" alt="icon-dowlnoad" id="dow" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
  <img src="../assets/icon-max-normal.svg" alt="icon-max" onclick="maxGifFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].title}')" id="max">
  </div>
  <div class="fav-texto">
  <p class="texto-fav">${content.data[i].title}</p>
  </div>
  </div>
  <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" id="resultados-gif">
  </div>
  `;
}
}

function borrarFav(gif){
let arrayAux = [];
arrayAux = JSON.parse(favoritosString);
let indice = arrayAux.indexOf(gif);
arrayAux.splice(indice, 1);
let nuevoFavoritosString = JSON.stringify(arrayAux);
localStorage.setItem("gifosFavoritos", nuevoFavoritosString);
let iconFavBorrar = document.getElementById('icon-borrar-fav-' + gif);
iconFavBorrar.setAttribute("src", "../assets/icon-fav-hover.svg");
location.reload();
}

async function descargarGif(gifImg, gifNombre) {
let blob = await fetch(gifImg).then( img => img.blob());;
invokeSaveAsDialog(blob, gifNombre + ".gif");
}

function borrarFavMaxMob(gif){
let iconNoFavMaxMob = document.getElementById('icon-borrar-fav-max-mobile-' + gif);
iconNoFavMaxMob.setAttribute("src", "../assets/icon-fav-hover.svg");
borrarFav(gif);
}

function maxGifFav(img, id, slug, title) {
  modal.style.display = "block";
  modal.innerHTML = `<img src="../assets/close.svg" alt="" class="modal-close" onclick="cerrarmodal()">
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
 modal.classList.add("modal-activo");
 document.body.appendChild(modal)
 }


let sliderTrendingGifos = document.getElementById('trending-container');
window.onload = trendingGifos();

function trendingGifos() {
let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=12`;
  fetch(url)
  .then(resp => resp.json())
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
  <img src="../assets/icon-max-normal.svg" alt="icon-max" id="max-trending" onclick="maxGifTrending('${trendingGif.images.downsized.url}', '${trendingGif.id}', '${trendingGif.slug}', '${trendingGif.username}', '${trendingGif.title}')">
  </div>
  <div class="textos-trending">
  <p id="titulo-gif">${trendingGif.title}</p>
  </div>
  <img src="${trendingGif.images.downsized.url}" alt="${trendingGif.title}" class="trending-gif">
  </div>
  </div>`;
}
sliderTrendingGifos.innerHTML = trendingGIFOhtml;
})
.catch(err => {
console.log(err);
})
}

function maxGifTrending(img, id, slug, title) {
  modal.style.display = "block";
  modal.innerHTML = `
  <img src="../assets/close.svg" alt=""  class="modal-close" onclick="cerrarmodal()">
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
  modal.classList.add("modal-activo");
  document.body.appendChild(modal);
  }


function cerrarmodal() {
modal.style.display = "none";
}

function agregarFavoritoMaxTren(gif) {
let iconFavMax = document.getElementById('icon-fav-max-' + gif);
iconFavMax.setAttribute("src", "../assets/icon-fav-active.svg");
agregarFavoritoTrendingGral(gif);
}

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

async function descargarGifTrending(gifImg, gifNombre) {
let blob = await fetch(gifImg).then(img => img.blob());
invokeSaveAsDialog(blob, gifNombre + ".gif");
}