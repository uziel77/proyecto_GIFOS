
   function getGifUrl(keyword){
      return fetch("http://api.giphy.com/v1/gifs/search?api_key=k7myyVYXWc9zebI6Yrrm5zPMspeexlxV&q="+keyword+"&limit=12").then(response => response.json());
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

