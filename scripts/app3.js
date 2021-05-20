function modoOscuro() {
    let theme = document.getElementById("theme");
  
    if (theme.getAttribute("href") == "../estilos/style.css") {
      theme.href = "../estilos/styleNoc.css";
    } else {
      theme.href = "../estilos/style.css";
    }
  }