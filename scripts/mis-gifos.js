function modoOscuro() {
    let theme = document.getElementById("noc");
  
    if (noc.getAttribute("href") == "../estilos/mis-gifos.css") {
      noc.href = "../estilos/mis-gifosNoc.css";
    } else {
      noc.href = "../estilos/mis-gifos.css";
    }
  }
  const iconoMenu = document.querySelector(".icono-menu"),
   menu = document.querySelector("#menu");

   iconoMenu.addEventListener("click", (e)=>{
     menu.classList.toggle("active");
     document.body.classList.toggle("opacity");
     const rutaActual = e.target.getAttribute("src");
     if(rutaActual == "../assets/burger.svg"){
       e.target.setAttribute("src","../assets/close.svg");
    } else {
      e.target.setAttribute("src","../assets/burger.svg");
    }
   })

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
    window.onload = function() {
      llamadaTrending();
    }

    const leftArrow = document.getElementById("left-arrow");
const righttArrow = document.getElementById("right-arrow");
const content = document.getElementById("trending-container");
    righttArrow.addEventListener("click", e => {
      content.scrollLeft += 100;
  })
  
  leftArrow.addEventListener("click", e => {
      content.scrollLeft -= 100;
  });

  apiKey = "k7myyVYXWc9zebI6Yrrm5zPMspeexlxV";
  misGifosArray = [];
  misGifosString = localStorage.getItem("misGifos");
  
  let pantallaMisGifos = document.getElementById('resultados-misgifos');
  
  let modalMobileMG = document.createElement("div");
  let modalDesktopMG = document.createElement("div");
  
  buscarMisGifos();
  
  //funciones para mostrar mis gifos en la pagina
  function buscarMisGifos() {
      let pantallaMisGifosVacio = document.querySelector('.contenido');
  
      if (misGifosString == null || misGifosString == "[]") {
          //1. si no tengo gif creados, muestro la pantalla mis gifos vacia
          pantallaMisGifosVacio.style.display = "block";
          pantallaMisGifos.style.display = "none";
   
      } else {
          misGifosArray = JSON.parse(misGifosString);
          let urlMisGifos = `https://api.giphy.com/v1/gifs?ids=${misGifosArray.toString()}&api_key=${apiKey}`;
          //console.log(urlMisGifos);
  
          fetch(urlMisGifos)
              .then(response => response.json())
  
              .then(content => {
                  console.log(content);
                  mostrarMisGifos(content);
              })
              .catch(err => {
                  console.error('mis gifos fallo', err);
              })
      }
  }
  
  function mostrarMisGifos(content) {
      let gifosMisGifosArray = content.data;
  
      for (let i = 0; i < gifosMisGifosArray.length; i++) {
          pantallaMisGifos.innerHTML += `
          <div class="resultados-gif-box-misgifos" onclick="maxGifMobileMG('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
                      <div class="gif-acciones-resultados-misgifos">
                          <div class="iconos-acciones-gif">
                              <button class="iconos-acciones-box borrar" onclick="borrarGifo('${content.data[i].id}')">
                                  <img src="../assets/icon-trash-normal.svg" alt="icon-borrar">
                              </button>
                              <button class="iconos-acciones-box download" onclick="descargarGif('${content.data[i].images.downsized.url}', '${content.data[i].slug}')">
                                  <img src="../assets/icon-download.svg" alt="icon-download" >
                              </button>
                              <button class="iconos-acciones-box max" onclick="maxGifDesktopMG('${content.data[i].images.downsized.url}', '${content.data[i].id}', '${content.data[i].slug}', '${content.data[i].username}', '${content.data[i].title}')">
                                  <img src="../assets/icon-max-normal.svg" alt="icon-max">
                              </button>
                          </div>
                          <div class="textos-descripcion-gif-misgifos">
                              <p class="user-gif-misgifos">${content.data[i].username}</p>
                              <p class="titulo-gif-misgifos">${content.data[i].title}</p>
                          </div>
                      </div>
                      <img src="${content.data[i].images.downsized.url}" alt="${content.data[i].title}" class="resultados-gif">
                  </div>
          `;
      }
  }
  
  //FUNCION BORRAR GIF
  function borrarGifo(gif){
      let arrayAuxGifos = [];
      arrayAuxGifos = JSON.parse(misGifosString);
      let indiceGif = arrayAuxGifos.indexOf(gif);
  
      console.log(arrayAuxGifos);
      console.log(indiceGif);
  
      arrayAuxGifos.splice(indiceGif,1);
  
      let nuevoMisGifosString = JSON.stringify(arrayAuxGifos);
      localStorage.setItem("misGifos", nuevoMisGifosString);
  
      location.reload();
  }
  
  
  
  //FUNCION DESCARGAR GIF
  async function descargarGif(gifImg, gifNombre) {
      let blob = await fetch(gifImg).then(img => img.blob());;
      invokeSaveAsDialog(blob, gifNombre + ".gif");
  }
  
  //FUNCION MAXIMIZAR GIF mobile
  function maxGifMobileMG(img, id, slug, user, title) {
      if (window.matchMedia("(max-width: 1023px)").matches) {
          modalMobileMG.style.display = "block";
          modalMobileMG.innerHTML = `
      <button class="modal-btn-close" onclick="cerrarModalMobileMG()"><img src="./assets/button-close.svg" alt=""></button>
      <img src="${img}" alt="${id}" class="modal-gif">
  
      <div class="modal-bar">
          <div class="modal-textos">
              <p class="modal-user">${user}</p>
              <p class="modal-titulo">${title}</p>
          </div>
          <div>
              <button class="modal-btn" onclick="borrarGifo('${id}')"><img src="./assets/icon_trash.svg" alt="delete-gif"></button>
              <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
          </div>
      </div>
      `;
          modalMobileMG.classList.add("modal-activado");
          document.body.appendChild(modalMobileMG);
      }
  }
  
  function cerrarModalMobileMG() {
      modalMobileMG.style.display = "none";
  }
  
  //FUNCION MAXIMIZAR DESKTOP
  function maxGifDesktopMG(img, id, slug, user, title) {
      if (window.matchMedia("(min-width: 1023px)").matches) {
          modalDesktopMG.style.display = "block";
          modalDesktopMG.innerHTML = `
      <button class="modal-btn-close" onclick="cerrarModalDesktopMG()"><img src="./assets/button-close.svg" alt=""></button>
      <img src="${img}" alt="${id}" class="modal-gif">
  
      <div class="modal-bar">
          <div class="modal-textos">
              <p class="modal-user">${user}</p>
              <p class="modal-titulo">${title}</p>
          </div>
          <div>
              <button class="modal-btn" onclick="borrarGifo('${id}')"><img src="./assets/icon_trash.svg" alt="delete-gif"></button>
              <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="./assets/icon-download.svg" alt="download-gif"></button>
          </div>
      </div>
      `;
          modalDesktopMG.classList.add("modal-activado");
          document.body.appendChild(modalDesktopMG);
      }
  }
  
  function cerrarModalDesktopMG() {
      modalDesktopMG.style.display = "none";
  } 