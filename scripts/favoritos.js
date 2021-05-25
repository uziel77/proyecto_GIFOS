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