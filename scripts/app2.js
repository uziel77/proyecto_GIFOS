document.getElementById("btn").addEventListener("click","touch", e=>{
   let keyword = document.getElementById("search").value;
   Giphy.getUrlAsync(keyword,function(videoUrl){
     document.getElementById("gif").src = videoUrl;
   })
})


function modoOscuro() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "./estilos/style.css") {
    theme.href = "./estilos/styleNoc.css";
  } else {
    theme.href = "./estilos/style.css";
  }
}

const iconoMenu = document.querySelector(".icono-menu"),
   menu = document.querySelector("#menu");

   iconoMenu.addEventListener("click", (e)=>{
     menu.classList.toggle("active");
     document.body.classList.toggle("opacity");
     const rutaActual = e.target.getAttribute("src");
     if(rutaActual == "./assets/burger.svg"){
       e.target.setAttribute("src","./assets/close.svg");
    } else {
      e.target.setAttribute("src","./assets/burger.svg");
    }
   })
