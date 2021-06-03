document.getElementById("btn").addEventListener("click", e=>{
  
  let keyword = document.getElementById("search").value;
  llamadaGif(keyword);


})

window.onload = function() {
  llamadaTrending();
}

function modoOscuro() {
  let theme = document.getElementById("theme");
  if (theme.getAttribute("href") == "./estilos/style.css") {
  theme.href = "./estilos/styleNoc.css";
  localStorage.setItem("fondo","./estilos/styleNoc.css");
  } else {
  theme.href = "./estilos/style.css";
  localStorage.setItem("fondo","./estilos/style.css");
  }
}
function localColor(){
  const color = localStorage.getItem("fondo");
  if( color === null){
    theme.id = "theme";
  }else{
    theme.classList = color;
  }
}

const iconoMenu = document.querySelector(".icono-menu"),
  menu = document.querySelector("#menu");

  iconoMenu.addEventListener("click", e =>{
  menu.classList.toggle("active");
  document.body.classList.toggle("opacity");
  const rutaActual = e.target.getAttribute("src");
  if(rutaActual == "./assets/burger.svg"){
  e.target.setAttribute("src","./assets/close.svg");
  } else {
  e.target.setAttribute("src","./assets/burger.svg");
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



