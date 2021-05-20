document.getElementById("btn").addEventListener("click", e=>{
   let keyword = document.getElementById("search").value;
   Giphy.getUrlAsync(keyword,function(videoUrl){
     document.getElementById("gif").src = videoUrl;
   })
})