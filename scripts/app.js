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
   await Promise.all(promesa)
   }
   function cargarImagen(imagen){
   return new Promise(resolve => imagen.onload = resolve);
   }
   function agregarImagen(imagen){
   let div = document.createElement('div');
   div.className = 'gifos';
   div.appendChild(imagen);
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
   await Promise.all(promesa)
   }
   function cargarTrending(imagen){
   return new Promise(resolve => imagen.onload = resolve);
   }
   function agregarTrending(imagen){
   let div = document.createElement('div');
   div.className = 'trending';
   div.appendChild(imagen);
   let divImg = document.getElementById("trending-container");
   divImg.appendChild(div);
}



