function modoOscuro() {
let theme = document.getElementById("noc");
  if (noc.getAttribute("href") == "../estilos/favoritos.css") {
  noc.href = "../estilos/favoritosNoc.css";
  } else {
  noc.href = "../estilos/favoritos.css";
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
  
const leftArrow = document.getElementById("left-arrow");
const righttArrow = document.getElementById("right-arrow");
const content = document.getElementById("trending-container");
  righttArrow.addEventListener("click", e => {
  content.scrollLeft += 100;
})

leftArrow.addEventListener("click", e => {
  content.scrollLeft -= 100;
});