function modoOscuro() {
    let theme = document.getElementById("noc");
  
    if (noc.getAttribute("href") == "../estilos/favoritos.css") {
      noc.href = "../estilos/favoritosNoc.css";
    } else {
      noc.href = "../estilos/favoritos.css";
    }
  }