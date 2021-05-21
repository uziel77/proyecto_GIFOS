function modoOscuro() {
    let theme = document.getElementById("noc");
  
    if (noc.getAttribute("href") == "../estilos/crear-gifo.css") {
      noc.href = "../estilos/crear-gifoNoc.css";
    } else {
      noc.href = "../estilos/crear-gifo.css";
    }
  }