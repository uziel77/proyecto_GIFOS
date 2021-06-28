let barraSearch = document.getElementById("search");
let btnSearch = document.getElementById("btn");
let barraDesp = document.getElementById("barra-desp");
let busqueda = document.getElementById("busqueda");
let cerrar = document.getElementById("cerrar");
let desplegable;
let offset = 0;
let containerGif = document.getElementById("container-gifs");
let verMas = document.getElementById("ver-mas");
let apikey = "k7myyVYXWc9zebI6Yrrm5zPMspeexlxV";



barraSearch.addEventListener("keyup", sugerencia);

function sugerencia(){
 desplegable = barraSearch.value;
 busqueda.classList.remove("busqueda")
 busqueda.classList.add("buscando")
 btnSearch.style.display = "none";
 cerrar.style.display = "block";
 if(desplegable.length >=1){
   fetch(`https://api.giphy.com/v1/tags/related/${desplegable}?api_key=${apikey}&q=&limit=4`)
   .then(response => response.json())
   .then(data =>{
      optionsData(data);
   }).catch(e => {console.error("problemas con la busqueda"),e})
  } else {
     closeBox();
   }
}
 function optionsData(data){
    let option = data.data;
    busqueda.innerHTML = `
    <li class="options">
    <p class="option-p">${option[0].name}<p>
    <img src="./assets/icon-search.svg" class="lupa">
    </li>
    <li class="options">
    <p class="option-p">${option[1].name}<p>
    <img src="./assets/icon-search.svg" class="lupa">
    </li>
    <li class="options">
    <p class="option-p">${option[2].name}<p>
    <img src="./assets/icon-search.svg" class="lupa">
    </li>
    <li class="options">
    <p class="option-p">${option[3].name}<p>
    <img src="./assets/icon-search.svg" class="lupa">
    </li>
    `
 }
 busqueda.addEventListener("click", function
 (li) {
    barraSearch.value = li.target.textContent;
    searchGif();
 })

 cerrar.addEventListener("click",vaciar);
 function vaciar(){
    barraSearch.value ="";
    busqueda.classList.add("busqueda");
    busqueda.classList.remove("buscando");
    btnSearch.style.display = "block";
    cerrar.style.display = "none";
 }

 btnSearch.addEventListener("click", searchGif);
 barraSearch.addEventListener("keyup", (e)=>{
    if(e.keyCode === 13){
       searchGif();
    }
 })
 function searchGif(){
    event.preventDefault();
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&offset=${offset}&q=`;
    let strSearch = barraSearch.value.trim();
    urlSearch = urlSearch.concat(strSearch);
 
 fetch(urlSearch)
 .then(res => res.json())
 .then(content =>{
    gifs.innerHTML= "";
    containerGif.style.display = "block";
    let tituloGifs = document.getElementById("titulo-gifs");
    tituloGifs.innerHTML = barraSearch.value;
    if(content.data == 0){
       gifs.innerHTML = `<div id="search-error">
       <img src="./assets/icon-busqueda-sin-resultado.svg" id="icon-error">
       <h4 id="texto-error">INTENTA CON OTRA BUSQUEDA</h3>
       </div>
       `;
       verMas.style.display = "none";
    }else{
       for (let i = 0; i < content.data.length; i++) {
            agregarGif(content.data[i]);
        }
    }
 })
.catch(e=>{
   console.log("error busqueda" + e)
})
   closeBox();
}
function agregarGif(content) {
   gifs.innerHTML += `
               <div class="container-gifos" onclick="maxGifMobile('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
               <div class="box-card">
                   <div id="card1">
                       <button id="img-fav" onclick="agregarFavoritoBusqueda('${content.id}')">
                           <img src="./assets/icon-fav-hover.svg" alt="icon-favorito" id="fav${content.id}">
                       </button>
                       <button id="img-dow" onclick="descargarGif('${content.images.downsized.url}', '${content.slug}')">
                           <img src="./assets/icon-download.svg" alt="icon-dowlnoad" id="dow">
                       </button>
                       <button id="img-max" onclick="maxGifDesktop('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
                           <img src="./assets/icon-max.svg" alt="icon-max" id="max">
                       </button>
                   </div>
                   <div class="textos-descripcion-gif-resultados">
                       <p class="user-gif-resultados">${content.username}</p>
                       <p class="titulo-gif-resultados">${content.title}</p>
                   </div>
               </div>
               <img src="${content.images.downsized.url}" alt="${content.id}" class="resultados-gif" >
           </div>
               `;
}
function closeBox(){
   busqueda.classList.add("busqueda");
   busqueda.classList.remove("buscando");
   btnSearch.style.display = "block";
   cerrar.style.display = "none"
}
verMas.addEventListener("click", verMasGifs);
function verMasGifs(){
   offset = offset + 12;
   llamadaGif();
}

function llamadaGif(){
   preventDefault();
   let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&offset=${offset}&q=`;
   let strSearch = barraSearch.value.trim();
   urlSearch = urlSearch.concat(strSearch);
   fetch(urlSearch)
   .then(res => res.json())
   .then(content =>{
      let gifs = document.getElementById("gifs")
      containerGif.style.display = "block";
      let tituloGifs = document.getElementById("titulo-gifs");
      tituloGifs.innerHTML = barraSearch.value;
      if(content.data == 0){
         gifs.innerHTML =`<div id="search-error">
         <img src="./assets/icon-busqueda-sin-resultado.svg" id="icon-error">
         <h4 id="texto-error">INTENTA CON OTRA BUSQUEDA</h3>
         </div>`;
         verMas.style.display = "none";
      }else{
         for (let i = 0; i < content.data.length; i++) {
            agregarGif = (content.data[i]);
         }
      }
   })
   .catch(e=>{
      console.log("error busqueda")
   })
}


 function getTrendingUrl(tren){
   return fetch("https://api.giphy.com/v1/gifs/trending?api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV&q="+tren+"&limit=20"+"rating=g").then(response => response.json());
   }
   async function llamadaTrending(tren) {
      const result = await this.getTrendingUrl(tren);
      let promesa = [];
      result.data.forEach(gif => {
      let imagen = new Image();
      imagen.src = gif.images.original.url;
      promesa.push(cargarTrending(imagen));
      agregarTrending(imagen);
      });
      await Promise.all(promesa);
      }
      function cargarTrending(imagen){
      return new Promise(resolve => imagen.onload = resolve);
      }
      function agregarTrending(imagen){
      let div = document.createElement('div');
      div.className = 'trending';
      div.appendChild(imagen);
      let divCard = document.createElement('div');
      divCard.id = "card2"
      let imagenFav = new Image();
      let imagenDow = new Image();
      let imagenMax = new Image();
      imagenFav.id = "img-fav-tren";
      imagenDow.id = "img-dow-tren";
      imagenMax.id = "img-max-tren";
      imagenFav.src ="./assets/icon-fav.svg";
      imagenDow.src = "./assets/icon-download.svg";
      imagenMax.src = "./assets/icon-max-normal.svg";
      divCard.appendChild(imagenFav);
      divCard.appendChild(imagenDow);
      divCard.appendChild(imagenMax);
      div.appendChild(divCard);
      let divImg = document.getElementById("trending-container");
      divImg.appendChild(div);
   }
 
function agregarFav(gif){
   let fav = document.getElementById("fav")
   fav.setAttribute("src","./assets/icon-fav-active.svg");
   agregarGifFav()
}
function agregarGifFav(){
   if(favoritosString == null){
      favoritosArray = []
   } else {
      favoritosArray = JSON.parse(favoritosString);
   }
   favoritosArray.push(gif)
   favoritosString = JSON.stringify(favoritosArray)
   localStorage.setItem("gifosFavoritos", favoritosString);
}

async function descargarGif(gifImg,gifName){
   let blob = await fetch(gifImg).then(img => img.blob());
   invokeSaveAsDialog(blob, gifName + ".gif");
}
