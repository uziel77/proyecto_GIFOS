document.getElementById("btn").addEventListener("click", e=>{
   let keyword = document.getElementById("search").value;
   Giphy.getUrlAsync(keyword,function(videoUrl){
     document.getElementById("gif").src = videoUrl;
   })
})

function modoOscuro() {
  let theme = document.getElementById("theme");

  if (theme.getAttribute("href") == "syle.css") {
    theme.href = "modo-noche.css";
  } else {
    theme.href = "style.css";
  }
}