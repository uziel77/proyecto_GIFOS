let barraSearch = document.getElementById("search"); //input-buscador
let btnSearch = document.getElementById("btn"); // buscador lupa
let barraDesp = document.getElementById("barra-desp"); // buscador sugerencia
let busqueda = document.getElementById("busqueda"); // bloque buscador
let cerrar = document.getElementById("cerrar"); // cerrar busqueda
let containerGif = document.getElementById("container-gifs"); //resultados busqueda
let verMas = document.getElementById("ver-mas"); // resultados ver mas
let desplegable; 
let offset = 0;
let favoritosString;
let favoritosArray;

let apikey = "k7myyVYXWc9zebI6Yrrm5zPMspeexlxV";
let imgFav = document.getElementById("img-fav-tren")



barraSearch.addEventListener("keyup", sugerencia);

function sugerencia(){
 desplegable = barraSearch.value;
 busqueda.classList.remove("busqueda");
 busqueda.classList.add("buscando");
 btnSearch.style.display = "none";
 barraDesp.innerHTML = "";
 cerrar.style.display = "block";
 if(desplegable.length >=3){
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
    barraDesp.innerHTML = `
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
    `;
 }
 busqueda.addEventListener("click", e => {
    barraSearch.value = e.target.textContent;
    if(desplegable.length >=3)
      searchGif();
        
 })

 cerrar.addEventListener("click",vaciar);
 function vaciar(){
    barraSearch.value ="";
    barraSearch.placeholder = "Busca gifos y mas"
    busqueda.classList.remove("buscando");
    busqueda.classList.add("busqueda");
    barraDesp.innerHTML = "";
    btnSearch.style.display = "block";
    
    cerrar.style.display = "none";
 }
 function closeBox(){
   busqueda.classList.remove("buscando");
   busqueda.classList.add("busqueda");
   btnSearch.style.display = "block"
   barraSearch.style.display = "block";
   barraDesp.innerHTML = "";
   cerrar.style.display = "none";
  
}

 btnSearch.addEventListener("click", searchGif);
 barraSearch.addEventListener("keyup", (e)=>{
    
    if(e.keyCode === 13){
       searchGif();
    }
 })
 function searchGif(){
    let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&offset=${offset}&q=`;
    let strSearch = barraSearch.value.trim();
    urlSearch = urlSearch.concat(strSearch);
 
 fetch(urlSearch)
 .then(res => res.json())
 .then(content =>{
    gifs.innerHTML= "";
    containerGif.style.display = "block";
    let tituloGifs = document.getElementById("titulo-gifs");
    verMas.style.display = "block";
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
   <div class="container-cards">
       <div id="box-card">
         <div class="card1">
         <img src="./assets/icon-fav.svg" alt="icon-favorito" id="icon-fav-${content.id}" onclick="agregarFavBus('${content.id}')" class="fav">
         <img src="./assets/icon-download.svg" alt="icon-dowlnoad" id="dow" onclick="descargaGif('${content.images.downsized.url}', '${content.slug}')">
         <img src="./assets/icon-max-normal.svg" alt="icon-max" id="max" onclick="maxGifDesktop('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')"onclick="maxGifDesktop('${content.images.downsized.url}', '${content.id}', '${content.slug}', '${content.username}', '${content.title}')">
         </div>
      <div id="texto-gif">
      <p id="titulo-gif-res">${content.title}</p>
      </div>
      </div>
         <img src="${content.images.downsized.url}" alt="${content.id}" class="res-gif" >
   </div>
   `;
}

verMas.addEventListener("click", verMasGifs);
function verMasGifs(){
   offset = offset + 12;
   searchGif();
}

function llamadaGif(){
   let urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&offset=${offset}&q=`;
   let strSearch = barraSearch.value.trim();
   urlSearch = urlSearch.concat(strSearch);
   fetch(urlSearch)
   .then(res => res.json())
   .then(content =>{
      let gifs = document.getElementById("gifs");
      containerGif.style.display = "block";
      let tituloGifs = document.getElementById("titulo-gifs");
      tituloGifs.innerHTML = barraSearch.value;
      verMas.style.display = "block";
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
      console.log("error busqueda");
   })
}



function agregarFavBus(gif){
  let btnFav = document.getElementById('icon-fav-' + gif)
  btnFav.setAttribute("src","./assets/icon-fav-active.svg")
  agregarFav(gif);
}

function agregarFav(gif){
   if(favoritosString == null){
      favoritosArray = [];
   } else {
      favoritosArray = JSON.parse(favoritosString);
   }
   favoritosArray.push(gif);
   favoritosString = JSON.stringify(favoritosArray);
   localStorage.setItem("gifosFavoritos", favoritosString);
}

async function descargaGif(gifImg, gifName){
   let blob = await fetch(gifImg).then(img => img.blob());
   invokeSaveAsDialog(blob, gifName + ".gif");
}


// function getTrendingUrl(tren){
// return fetch("https://api.giphy.com/v1/gifs/trending?api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV&q="+tren+"&limit=20"+"rating=g").then(response => response.json());
//    }
//    async function llamadaTrending(tren) {
//       const result = await this.getTrendingUrl(tren);
//       let promesa = [];
//       result.data.forEach(gif => {
//       let imagen = new Image();
//       imagen.src = gif.images.original.url;
//       promesa.push(cargarTrending(imagen));
//       agregarTrending(imagen);
//       });
//       await Promise.all(promesa);
//       }
//       function cargarTrending(imagen){
//       return new Promise(resolve => imagen.onload = resolve);
//       }
//       function agregarTrending(imagen){
//       let div = document.createElement('div');
//       div.className = 'trending';
//       div.appendChild(imagen);
//       let divCard = document.createElement('div');
//       divCard.id = "card2";
//       let imagenFav = new Image();
//       let imagenDow = new Image();
//       let imagenMax = new Image();
//       imagenFav.id = "img-fav-tren";
//       imagenDow.id = "img-dow-tren";
//       imagenMax.id = "img-max-tren";
//       imagenFav.src ="./assets/icon-fav.svg";
//       imagenDow.src = "./assets/icon-download.svg";
//       imagenMax.src = "./assets/icon-max-normal.svg";
//       divCard.appendChild(imagenFav);
//       divCard.appendChild(imagenDow);
//       divCard.appendChild(imagenMax);
//       div.appendChild(divCard);
//       let divImg = document.getElementById("trending-container");
//       divImg.appendChild(div);
//       imagenDow.addEventListener("click", descargaGif);
      
      
// }

let sliderTrendingGifos = document.getElementById('trending-container');
window.onload = trendingGifos();

function trendingGifos() {
   let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=12`;

   fetch(url)
       .then(resp => resp.json()) //me trae el json con los 4 trending gifos
       .then(content => {
           //object with data, pagination, meta
           let trendingGifArray = content.data;

           let trendingGIFOhtml = "";

           for (let i = 0; i < trendingGifArray.length; i++) {
               let trendingGif = trendingGifArray[i];
               trendingGIFOhtml += `
           <div class="trending-box" onclick="maxGifMobileTrending('${trendingGif.images.downsized.url}', '${trendingGif.id}', '${trendingGif.slug}', '${trendingGif.username}', '${trendingGif.title}')">
                   <div class="box-card2">
                       <div class="card2">
                           <img src="./assets/icon-fav.svg" alt="icon-favorito" id="icon-fav-trending-${trendingGif.id}" class="icon-fav-trending">
                           <img src="./assets/icon-download.svg" alt="icon-download" id="dow-trending">
                           <img src="./assets/icon-max-normal.svg" alt="icon-max" id="max-trending">
                       </div>
                       <div class="textos-trending">
                           <p id="titulo-gif">${trendingGif.title}</p>
                       </div>
                       <img src="${trendingGif.images.downsized.url}" alt="${trendingGif.title}" class="trending-gif">
                   </div>
                  
               </div>`
            }

            sliderTrendingGifos.innerHTML = trendingGIFOhtml;

        })
        .catch(err => {
            console.log(err);
        })
}