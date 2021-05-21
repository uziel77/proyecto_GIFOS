document.getElementById("btn").addEventListener("click", e=>{
   let keyword = document.getElementById("search").value;
   Giphy.getUrlAsync(keyword,function(videoUrl){
     document.getElementById("gif").src = videoUrl;
   })
})


function modoOscuro() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "../estilos/style.css") {
    theme.href = "../estilos/styleNoc.css";
  } else {
    theme.href = "../estilos/style.css";
  }
}