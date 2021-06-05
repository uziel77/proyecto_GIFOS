let barraSearch = document.getElementById("search");
let btnSearch = document.getElementById("btn");
let barraDesp = document.getElementsByClassName("barra-desp");
let busqueda = document.getElementById("busqueda");
let desplegable;








function getGifUrl(keyword){
return fetch("https://api.giphy.com/v1/gifs/search?api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV&q="+keyword+"&limit=12").then(response => response.json());
}
async function llamadaGif(keyword) {
   const result = await this.getGifUrl(keyword);
   let promesa = [];
   result.data.forEach(gif => {
   let imagen = new Image();
   imagen.src = gif.images.original.url;
   promesa.push(cargarImagen(imagen));
   agregarImagen(imagen);
   });
   await Promise.all(promesa);
   }
   function cargarImagen(imagen){
   return new Promise(resolve => imagen.onload = resolve);
   }
   
   function agregarImagen(imagen){
   let div = document.createElement('div');
   div.className = 'gifos';
   div.addEventListener("click", cardEvent)
   div.appendChild(imagen);
   let divCard = document.createElement('div');
   divCard.id = "card1"
   divCard.className = "kinter"
   let imagenFav = new Image();
   let imagenDow = new Image();
   let imagenMax = new Image();
   imagenFav.id = "img-fav";
   imagenDow.id = "img-dow";
   imagenMax.id = "img-max";
   imagenFav.src ="./assets/icon-fav.svg";
   imagenDow.src = "./assets/icon-download.svg";
   imagenMax.src = "./assets/icon-max-normal.svg";
   divCard.appendChild(imagenFav);
   divCard.appendChild(imagenDow);
   divCard.appendChild(imagenMax);
   div.appendChild(divCard);
   let divImg = document.getElementById("gifs");
   divImg.appendChild(div);
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

function cardEvent(e){
   e.children
   let imagenCard = e.currentTarget.getElementsByClassName("kinter")[0]
   imagenCard.style.display = "block"
}


barraSearch.addEventListener("keyup", sugerencia);

function sugerencia(){
 desplegable = barraSearch.value;
 busqueda.classList.remove("busqueda")
 busqueda.classList.add("buscando")

 if(desplegable.length >=1){
   fetch(`https://api.giphy.com/v1/tags/related/${desplegable}?api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV&q=&limit=4`)
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
    </li>
    <li class="options">
    <p class="option-p">${option[1].name}<p>
    </li>
    <li class="options">
    <p class="option-p">${option[2].name}<p>
    </li>
    <li class="options">
    <p class="option-p">${option[3].name}<p>
    </li>
    `
 }
 busqueda.addEventListener("click", function
 (li) {
    barraSearch.value = li.target.textContent;
    llamadaGif();
 })

 btnSearch.addEventListener("click",vaciar);
 function vaciar(){
    barraSearch.value ="";
    barraSearch.placeholder = "busca GIFOS y mas";
    busqueda.classList.add("busqueda");
    busqueda.classList.remove("buscando");
 }



let imgFav = document.getElementById("img-fav")
imgFav.addEventListener("click", agregarAFav)
 function agregarAFav(imagen){
    let iconFav = document.getElementById("img-fav" + imagen);
    iconFav.setAttribute("src","./assets/icon-fav-hover.svg");
    agregarF(imagen);
 }

 
 function agregarF(imagen){
    if(gifFav == null){
       gifosFav = [];
    } else {
       gifosFav = JSON.parse(gifFav);
    }
    gifosFav.push(imagen);
    gifFav = JSON.stringify(gifosFav);
    localStorage.setItem("gifosFav",gifFav)
 }