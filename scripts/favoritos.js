const leftArrow = document.getElementById("left-arrow");
const righttArrow = document.getElementById("right-arrow");
const content = document.getElementById("trending-container");
const iconoMenu = document.querySelector(".icono-menu");
let menu = document.querySelector("#menu");


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

function getTrendingUrl(tren){
  return fetch("https://api.giphy.com/v1/gifs/trending?api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV&q="+tren+"&limit=20"+"rating=g").then(response => response.json());
  }

  async function llamadaTrending(tren) {
  const result = await this.getTrendingUrl(tren);
  let promesa = [];
  result.data.forEach(gif => {
  let imagen = new Image();
  imagen.src = gif.images.original.url;
  promesa.push(cargarTrending(imagen));
  agregarTrending(imagen);
  });
  await Promise.all(promesa)
  }
function cargarTrending(imagen){
  return new Promise(resolve => imagen.onload = resolve);
  }
function agregarTrending(imagen){
  let div = document.createElement('div');
  div.className = 'trending';
  div.appendChild(imagen);
  let divImg = document.getElementById("trending-container");
  divImg.appendChild(div);
}
window.onload = function() {
  llamadaTrending();
}
  

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
function mostrarFavoritos(content) {
  let gifosFavoritosArray = content.data;

  for(let i=0; i< gifosFavoritosArray.length; i++) {
      pantallaFavoritos.innerHTML += `
      <div class="resultados-gif-box-fav" onclick="maxGifMobileFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
      <div class="gif-acciones-resultados-fav">
          <div class="iconos-acciones-gif">
              <button class="iconos-acciones-box favorito-fav" onclick="borrarFav('${content.data[i].id}')">
                  <img src="./assets/icon-fav-active.svg" alt="icon-favorito" id="icon-borrar-fav-${content.data[i].id}">
              </button>
              <button class="iconos-acciones-box download" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
                  <img src="./assets/icon-download.svg" alt="icon-dowlnoad">
              </button>
              <button class="iconos-acciones-box max" onclick="maxGifDesktopFav('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
                  <img src="./assets/icon-max.svg" alt="icon-max">
              </button>
          </div>
          <div class="textos-descripcion-gif-favoritos">
              <p class="user-gif-favoritos">${content.data[i].username}</p>
              <p class="titulo-gif-favoritos">${content.data[i].title}</p>
          </div>
      </div>
      <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
  </div>
      `;
  }
}

//FUNCION BORRAR FAV
function borrarFav(gif){
  let arrayAux = [];
  arrayAux = JSON.parse(favoritosString);
  let indice = arrayAux.indexOf(gif);
  //console.log(arrayAux);
  //console.log(indice);

  arrayAux.splice(indice, 1);

  let nuevoFavoritosString = JSON.stringify(arrayAux);
  localStorage.setItem("gifosFavoritos", nuevoFavoritosString);
  //console.log(favoritosString);

  //cambio icono
  let iconFavBorrar = document.getElementById('icon-borrar-fav-' + gif);
  iconFavBorrar.setAttribute("src", "./assets/icon-fav-hover.svg");

  //refresco pag
  location.reload();
}

//FUNCION DESCARGAR GIF
async function descargarGif(gifImg, gifNombre) {
  let blob = await fetch(gifImg).then( img => img.blob());;
  invokeSaveAsDialog(blob, gifNombre + ".gif");
}

function borrarFavMaxMob(gif){
  let iconNoFavMaxMob = document.getElementById('icon-borrar-fav-max-mobile-' + gif);
  iconNoFavMaxMob.setAttribute("src", "./assets/icon-fav-hover.svg");
  borrarFav(gif);
}