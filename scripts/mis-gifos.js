function modoOscuro() {
    let theme = document.getElementById("noc");
  
    if (noc.getAttribute("href") == "../estilos/mis-gifos.css") {
      noc.href = "../estilos/mis-gifosNoc.css";
    } else {
      noc.href = "../estilos/mis-gifos.css";
    }
  }