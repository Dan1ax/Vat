let isSerie = document.getElementById('serie');
let isMovie = document.getElementById('movie');



let types = document.querySelectorAll('input[type=radio][name=type]');

types.forEach(type => {
    type.addEventListener('change', () =>{
        if (type.value == "movie") {
            document.getElementById('season-selector').style.display = "none";
        } else if (type.value == "serie"){
            document.getElementById('season-selector').style.display = "block";
        }
    })
})


function convertMinutes(minutess){
    let hours = Math.floor(minutess / 60) ,
    minutes = Math.floor(minutess % 60),
    total = '';

    if (minutess < 60){
        total = `${minutes}m`
        return total
    } else if (minutess > 60){
      total = `${hours}h ${minutes}m`
      return total
    } else if (minutess = 60){
        total = `${hours}h`
        return total
    }
}



async function searchMoviesAndSeries() {
  const searchQuery = document.getElementById('search-input').value;
  const languaje = "es-MX";

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}&query=${searchQuery}`);
    const data = await response.json();

    // Mostrar los resultados en la pÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡gina
    displaySearchResults(data.results);
  } catch (error) {
    console.log(error);
  }
}

 let datalink2 = document.getElementById('datalink2').value; // Capturar el valor de datalink2
  let ubi = document.getElementById('ubi').value; // Capturar el valor de ubi
  let link1 = document.getElementById('link1').value; // Capturar el valor de link1
  
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('search-results');
  const moviesContainer = document.getElementById('movies-container');
  const seriesContainer = document.getElementById('series-container');

  // Limpiar resultados anteriores
  moviesContainer.innerHTML = "";
  seriesContainer.innerHTML = "";

  results.forEach((result) => {
    const resultItem = document.createElement('div');
    resultItem.className = "search-result-item";

    // Crear elemento para mostrar la carÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡tula o pÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³ster
    const posterImg = document.createElement('img');
    posterImg.src = `https://image.tmdb.org/t/p/original/${result.poster_path}`;
    posterImg.alt = result.title || result.name;
    resultItem.appendChild(posterImg);

    // Crear elemento para mostrar el nombre de la pelÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cula o serie
    const nameElement = document.createElement('span');
    nameElement.textContent = result.title || result.name;
    resultItem.appendChild(nameElement);

    resultItem.addEventListener('click', () => {
      // Al seleccionar un resultado, cierra todos los resultados y actualiza el generador con el ID de la pelÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­cula o serie seleccionada
      document.getElementById('search-results').style.display = "none";
      document.getElementById('numero').value = result.id;
    });

    // Separar resultados en pelÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­culas y series
    if (result.media_type === "movie") {
      moviesContainer.appendChild(resultItem);
    } else if (result.media_type === "tv") {
      seriesContainer.appendChild(resultItem);
    }
  });

  // Mostrar los resultados en pantalla
  searchResultsContainer.style.display = "block";
}













function generar() {
    let serieKey = document.getElementById('numero').value;
    let languaje = "es-MX"
    let seasonNumber = document.getElementById('numeroTemporada').value;

    const cargarPeliculas = async() => {

        if (isSerie.checked) {
            try {

                const respuesta = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);
                const respuesta3 = await fetch(`https://api.themoviedb.org/3/tv/${serieKey}/season/${seasonNumber}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);
    
                if (respuesta.status === 200) {
                    const datos = await respuesta.json();
                    const datosTemporada = await respuesta3.json();
                    
                  
                    
                        
                    let tags = '';
    
                    datos.genres.forEach(genre => {
                        if (genre.name != datos.genres[datos.genres.length - 1].name) {
                            tags += `${genre.name}, `
                        } else {
                            tags += datos.genres[datos.genres.length - 1].name
                        }
                    });

                    let creators = '';
    
                    datos.created_by.forEach((creator, i) => {
                        if (i == datos.created_by.length - 1){
                            creators += creator.name
                        } else{
                            creators += `${creator.name}, `

                        }
                    });
    
                       
                    let episodeList = '';
    
                    datosTemporada.episodes.forEach(episode => {
                        let runtime ;
                        if (episode.runtime != null) {
                            runtime = convertMinutes(episode.runtime);
                        } else {
                            runtime = ''
                        }
                        episodeList += `
                        
                        
                        <a href="#!ENLACEDETUVIDEO" class="capitulo">
                <div class="imagen">
                    <img src="https://image.tmdb.org/t/p/original/${episode.still_path}" alt="CapÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­tulo 1">
                    <div class="duracion">${runtime}</div>
                    <div class="titulo">${episode.episode_number}. ${episode.name}</div>
<div class="play-icon">
            <i class="fas fa-play"></i>
        </div>                    
                </div>
            </a>
                        
                        
                        `
                    })
    
                    let seasonsOption = '';
    
                    datos.seasons.forEach(season => {
                        
                        if(season.name != "Especiales"){
                            seasonsOption += `<option value="capitulos-temporada${season.season_number}">Temporada ${season.season_number}</option>
                            `
                        }
                    })
    
                    let genSeasonsCount;
    
                    if (datos.number_of_seasons == 1){
                        genSeasonsCount = " Temporada"
                    } else if (datos.number_of_seasons > 1){
                        genSeasonsCount = " Temporadas"
                    }
                    
                    let template = document.getElementById('html-final');
    
                    let justHtml = ` 
                    

                    <!DOCTYPE html>

                    <html lang="es">
                    <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                    <title>${datos.name}</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
                    <style>
                    @import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap);body,html{margin:0;padding:0;height:100%;background-color:#000;color:#fff;font-family:Arial,sans-serif;font-weight:700}.menu{position:fixed;top:0;left:0;width:100%;background:linear-gradient(to bottom,#000000 0%,rgb(0 0 0 / .98) 10%,#fff0 100%);color:#fff;font-size:28px;padding:20px;z-index:3;transition:background 0.3s}.image-container{background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed;position:relative;width:100%;height:70vh;overflow:hidden}.inner-shadow{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top,rgb(0 0 0 / .98) 8%,#fff0 40%)}.texto-blanco{position:absolute;bottom:0;left:15px;font-size:22px;color:#e7e5e4;margin:0;z-index:1}.menu.scroll{background:#000}.boton-gris{background-color:#181818;margin-top:0px;color:#e7e5e4;font-size:12px;border:none;padding:5px;margin-right:10px;border-radius:6px;margin-left:15px}.botones-transparentes{display:inline-block}.botones-transparentes button{background:#fff0;border:#fff0;color:#16d3ff;padding:1px 1px;margin-right:5px;cursor:pointer}.texto-largo{color:#e7e5e4;padding:20px;text-align:left;font-size:16px;line-height:1.5}button{border:none;outline:none}#boton{background-color:#181818;color:#fff;padding:13px;border-radius:8px;cursor:pointer;font-size:15px;margin:0 10px 20px 15px;font-weight:700}.favoritoBtn{background-color:#fff0;color:#fff;border:none;font-size:26px;cursor:pointer;position:absolute;right:60px}#mensaje{user-select:none;display:none;background-color:#4c4c4c;color:#fff;text-align:center;padding:10px 18px;margin:0 auto;position:fixed;bottom:10%;left:0;right:0;width:fit-content;z-index:999;transition:opacity 0.5s ease-in-out;border-radius:20px}#mensaje.mostrando{display:block;opacity:1}#mensaje.ocultando{opacity:0}.open-button{background-color:#fff0;color:#fff;border:none;font-size:16px;cursor:pointer;margin-bottom:0;position:relative;width:100%;height:38px;border-bottom:1px solid #fff}#close-button{position:absolute;right:10px;background-color:#fff0;color:#fff;border:none;font-size:24px;cursor:pointer;margin-top:-330px}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}*{list-style:none;color:#fff;font-family:'Source Sans Pro',sans-serif;text-decoration:none}:root{--main:#e21221}.watch-movie{display:flex;flex-direction:column;padding:0 20px}.btn{display:block;text-align:center;font-weight:600;background:#006b95;padding:20px;border-radius:10px}.btn{margin-bottom:20px}.swiper-slide{align-items:flex-start}.iframe-box{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;z-index:9999;background:rgb(0 0 0 / .9);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;display:none}#cerrar{cursor:pointer}.fa-xmark{font-size:50px}#lightbox{aspect-ratio:16 / 9;width:100%;display:flex;flex-direction:column;align-items:flex-end}#lightbox-content{position:relative;overflow:hidden;width:100%;padding-top:36.25%;aspect-ratio:16 / 9}.responsive-iframe{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;aspect-ratio:16 / 9;z-index:9999}@media screen and (min-width:1000px){#lightbox{width:80%}}.btns{display:flex;width:99%;height:60px;background:#000;margin:0;align-items:center;justify-content:space-between}.btns a{display:grid;text-align:center;color:#ffffff;padding:10px;text-decoration:none}.btns a i{color:#fff}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}
                    @import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap);@import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap);body{background:#000;color:#fff}#contenedor-general{width:100%;height:100%;margin:0 auto 0;padding:0}#cuerpo-entradas{width:100%;height:100%;padding:0}.popSc{position:fixed;z-index:99999;top:0;bottom:0;left:0;right:0;padding:20px;background:#000000eb;display:flex;justify-content:center;align-items:center}.popSc.hidden{display:none}.popSc .popBo{position:relative;background:#390000c4;max-width:400px;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:30px;border-radius:30px}.popSc .popBo svg{display:block;width:50px;height:50px;fill:none!important;stroke:#f9ff00;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5}.popSc .popBo h2{margin:10px 0 15px 0;font-size:1.2rem;font-weight:800;color:red}.popSc .popBo p{margin:0;line-height:1.7em;font-size:.9rem;color:#fff}.darkMode .popSc{background:#1f1f1f}.darkMode .popSc .popBo{background:#2c2d31}.darkMode .popSc .popBo svg{stroke:#fefefe}.drkMode .popSc .popBo p,.darkMode .popSc .popBo h2{color:#fefefe}#offline-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgb(0 0 0 / .8);justify-content:center;align-items:center;text-align:center;z-index:1000}#offline-message{color:#fff;background-color:#333;padding:20px;border-radius:10px}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}*{list-style:none;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none}:root{--main:#e21221}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}*{list-style:none;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none}:root{--main:#e21221}*{list-style:none;margin:0;padding:0;box-sizing:border-box;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none;-webkit-tap-highlight-color:#fff0}:root{--main:#950000}body{background:#000;font-family:"Source Sans Pro",sans-serif}
                    @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500;700&display=swap");
                    :root {
                    --bg-red: #e50914;
                    --bg-white: #f7f7f7;
                    --bg-black: #181919;
                    }
                    </style>
                    </head>
                    <body oncontextmenu='return false' ondragstart='return false' onselectstart='return false'>
                    <div class="menu">
                    <i id="flecha" class="fa-solid fa-arrow-left" style="cursor: pointer;"></i>
                    <button id="flag-button" style="position: fixed; top: px; right: 20px; background: transparent; border: none; color: white; font-size: 25px; cursor: pointer;">
                    </button>
                    </div>
                    <div class="image-container" style="background-image: url('https://image.tmdb.org/t/p/original/${datos.poster_path}');">
                    <img alt="" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}" style="position:absolute;top:59%;width:110px;height:150px;left:10px;right:10px;border-radius:20px;border: 1.3px solid white;" />
                    <div class="inner-shadow">
                    <div class="texto-blanco">${datos.name} (${datos.first_air_date.slice(0,4)})</div>
                    </div>
                    </div>
                    <div class="btns">
                    <a><i class="fa-solid fa-star "></i>${datos.genres.map(genre => genre.name).join(', ')}</a>
                    <a id="favoritoBtn" fav-id="${datos.name}"><i class="fa-solid fa-heart-circle-plus"></i><span id="favoritoText"></span></a>
                    <a href=""><i class="fa-solid fa-font-awesome "></i>Reportar</a>
                    <a><i class="fa-brands fa-medium"></i>${datos.vote_average}</a></div>
                    </div>
                    <div class="watch-movie" id="watch-movie">
                    <a href="${link1}" class="btn"><i class="fa fa-play" style="font-size:18px"></i> Reproducir</a>
                    </div>
                    <button class="boton-gris">SERIES</button>
                    <div class="botones-transparentes">
                    <button>Temporada:${datos.number_of_seasons} &#8226; Episodios:${datos.number_of_episodes}</button>
                    </div>
                    <div class="texto-largo">
                    <p>${datos.overview}</p>
                    </div>
                    <div id="mensaje" class="oculto">&#161;Serie añadida a tu lista!</div>
                    <script>
                    document.getElementById('flecha').addEventListener('click',function(){redirigir()});function redirigir(){var ultimoIdentificador=localStorage.getItem("ultimaPagina");if(ultimoIdentificador){window.location.href="go:"+ultimoIdentificador}else{alert("No hay última página registrada")}}
                    document.getElementById("flag-button").addEventListener("click",function(){window.location.href=""});const favoritoBtn=document.getElementById("favoritoBtn");const favoritoText=document.getElementById("favoritoText");const elementoAgregado={id:favoritoBtn.getAttribute("fav-id"),src:"https://image.tmdb.org/t/p/w500/${datos.poster_path}",alt:"${datos.name}",url:"${ubi}",};const favoritos=JSON.parse(localStorage.getItem("favoritos"))||[];const isAdded=favoritos.some(item=>item.id===elementoAgregado.id);updateButtonContent(isAdded);favoritoBtn.addEventListener("click",()=>{const index=favoritos.findIndex(item=>item.id===elementoAgregado.id);if(index===-1){favoritos.push(elementoAgregado);mostrarMensajeEmergente("Añadida a tu lista!")}else{favoritos.splice(index,1);mostrarMensajeEmergente("Eliminada de tu lista")}
                    localStorage.setItem("favoritos",JSON.stringify(favoritos));updateButtonContent(index===-1)});function updateButtonContent(isAdded){if(isAdded){favoritoText.innerText="Eliminar";favoritoBtn.innerHTML='<i class="fa-solid fa-minus"></i><span id="favoritoText">Eliminar</span>'}else{favoritoText.innerText="Agregar";favoritoBtn.innerHTML='<i class="fa-solid fa-plus"></i><span id="favoritoText">Mis Favoritos</span>'}}
                    function mostrarMensajeEmergente(message){const mensaje=document.getElementById('mensaje');mensaje.innerText=message;mensaje.classList.add('mostrando');setTimeout(function(){mensaje.classList.add('ocultando');setTimeout(function(){mensaje.classList.remove('mostrando')},500);setTimeout(function(){mensaje.classList.remove('ocultando')},1000)},3000)}
                    window.addEventListener("scroll",function(){var menu=document.querySelector(".menu");var textoBlanco=document.querySelector(".texto-blanco");if(window.scrollY>=textoBlanco.offsetTop){menu.classList.add("scroll")}else{menu.classList.remove("scroll")}})
                    </script>
                    <script language='Javascript'>
                    document.oncontextmenu = function(){return false}
                    </script>
                    
                    <script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
                    
                    </body>
                    </html>



                    `;
                    
                    let seasonOnly = `
                    <div class="capitulos" id="capitulos-temporada${seasonNumber}">
            <!-- CapÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â­tulos  temporada ${seasonNumber} -->
            
            ${episodeList}
        </div>
    
    
    
                    `;
    
                    const btnCopiar = document.getElementById('copiar');
    
                    if (seasonNumber == 1) {
                        template.innerText = justHtml;
                    } else if (seasonNumber > 1){
                        template.innerText = seasonOnly;
                    }
    
                    let templateHTML = template.innerText;
                    console.log(justHtml, typeof justHtml)
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })

                    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${datos.poster_path}`)
                    genTitle.innerText = datos.name;
                    genSeasons.innerText = datos.number_of_seasons + genSeasonsCount;
                    genYear.innerText = datos.first_air_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }
        } else
        if(isMovie.checked){
            try {

            const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${serieKey}?api_key=b6083b855479a79fd9acdb0a2789f126&language=${languaje}`);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                console.log(datos);
                




let datalink3 = document.getElementById('datalink3').value; // Capturar el valor de datalink3    
let link2 = document.getElementById('link2').value; // Capturar el valor de link2
let link4 = document.getElementById('link4').value; // Capturar el valor de link4
                let tags = '';

                datos.genres.forEach(genre => {
                    if (genre.name != datos.genres[datos.genres.length - 1].name) {
                        tags += `${genre.name}, `
                    } else {
                        tags += datos.genres[datos.genres.length - 1].name
                    }
                });


                    let template = document.getElementById('html-final');

                    let justHtml = `

                    <!DOCTYPE html>

                    <html lang="es">
                    <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                    <title>${datos.title}</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
<link href="https://cdn.jsdelivr.net/gh/Dan1ax/Vat@e1b2df6579798a907dba85ffe40c4c519c26e3f3/video-js%20(1).css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Dan1ax/Vat@2e8f58046f059309e7556b4c9b9f6db36374041d/all.min%20(1).css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Dan1ax/Vat@26ad08391f687a4937650d648b68d754277361cc/cssdp.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                    <style>
                    @import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap);body,html{margin:0;padding:0;height:100%;background-color:#000;color:#fff;font-family:Arial,sans-serif;font-weight:700}.menu{position:fixed;top:0;left:0;width:100%;background:linear-gradient(to bottom,#000000 0%,rgb(0 0 0 / .98) 10%,#fff0 100%);color:#fff;font-size:28px;padding:20px;z-index:3;transition:background 0.3s}.image-container{background-size:cover;background-position:center;background-repeat:no-repeat;background-attachment:fixed;position:relative;width:100%;height:70vh;overflow:hidden}.inner-shadow{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top,rgb(0 0 0 / .98) 8%,#fff0 40%)}.texto-blanco{position:absolute;bottom:0;left:15px;font-size:22px;color:#e7e5e4;margin:0;z-index:1}.menu.scroll{background:#000}.boton-gris{background-color:#181818;margin-top:0px;color:#e7e5e4;font-size:12px;border:none;padding:5px;margin-right:10px;border-radius:6px;margin-left:15px}.botones-transparentes{display:inline-block}.botones-transparentes button{background:#fff0;border:#fff0;color:#16d3ff;padding:1px 1px;margin-right:5px;cursor:pointer}.texto-largo{color:#e7e5e4;padding:20px;text-align:left;font-size:16px;line-height:1.5}button{border:none;outline:none}#boton{background-color:#181818;color:#fff;padding:13px;border-radius:8px;cursor:pointer;font-size:15px;margin:0 10px 20px 15px;font-weight:700}.favoritoBtn{background-color:#fff0;color:#fff;border:none;font-size:26px;cursor:pointer;position:absolute;right:60px}#mensaje{user-select:none;display:none;background-color:#4c4c4c;color:#fff;text-align:center;padding:10px 18px;margin:0 auto;position:fixed;bottom:10%;left:0;right:0;width:fit-content;z-index:999;transition:opacity 0.5s ease-in-out;border-radius:20px}#mensaje.mostrando{display:block;opacity:1}#mensaje.ocultando{opacity:0}.open-button{background-color:#fff0;color:#fff;border:none;font-size:16px;cursor:pointer;margin-bottom:0;position:relative;width:100%;height:38px;border-bottom:1px solid #fff}#close-button{position:absolute;right:10px;background-color:#fff0;color:#fff;border:none;font-size:24px;cursor:pointer;margin-top:-330px}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}*{list-style:none;color:#fff;font-family:'Source Sans Pro',sans-serif;text-decoration:none}:root{--main:#e21221}.watch-movie{display:flex;flex-direction:column;padding:0 20px}.btn{display:block;text-align:center;font-weight:600;background:#006b95;padding:20px;border-radius:10px}.btn{margin-bottom:20px}.swiper-slide{align-items:flex-start}.iframe-box{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;z-index:9999;background:rgb(0 0 0 / .9);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;display:none}#cerrar{cursor:pointer}.fa-xmark{font-size:50px}#lightbox{aspect-ratio:16 / 9;width:100%;display:flex;flex-direction:column;align-items:flex-end}#lightbox-content{position:relative;overflow:hidden;width:100%;padding-top:36.25%;aspect-ratio:16 / 9}.responsive-iframe{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;aspect-ratio:16 / 9;z-index:9999}@media screen and (min-width:1000px){#lightbox{width:80%}}.btns{display:flex;width:99%;height:60px;background:#000;margin:0;align-items:center;justify-content:space-between}.btns a{display:grid;text-align:center;color:#ffffff;padding:10px;text-decoration:none}.btns a i{color:#fff}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}
                    @import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap);@import url(https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;600&display=swap);body{background:#000;color:#fff}#contenedor-general{width:100%;height:100%;margin:0 auto 0;padding:0}#cuerpo-entradas{width:100%;height:100%;padding:0}.popSc{position:fixed;z-index:99999;top:0;bottom:0;left:0;right:0;padding:20px;background:#000000eb;display:flex;justify-content:center;align-items:center}.popSc.hidden{display:none}.popSc .popBo{position:relative;background:#390000c4;max-width:400px;display:flex;justify-content:center;align-items:center;flex-direction:column;padding:30px;border-radius:30px}.popSc .popBo svg{display:block;width:50px;height:50px;fill:none!important;stroke:#f9ff00;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5}.popSc .popBo h2{margin:10px 0 15px 0;font-size:1.2rem;font-weight:800;color:red}.popSc .popBo p{margin:0;line-height:1.7em;font-size:.9rem;color:#fff}.darkMode .popSc{background:#1f1f1f}.darkMode .popSc .popBo{background:#2c2d31}.darkMode .popSc .popBo svg{stroke:#fefefe}.darkMode .popSc .popBo p,.darkMode .popSc .popBo h2{color:#fefefe}#offline-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgb(0 0 0 / .8);justify-content:center;align-items:center;text-align:center;z-index:1000}#offline-message{color:#fff;background-color:#333;padding:20px;border-radius:10px}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}*{list-style:none;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none}:root{--main:#e21221}img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}a,button,select,textarea{-webkit-tap-highlight-color:#fff0;tap-highlight-color:#fff0}*{list-style:none;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none}:root{--main:#e21221}*{list-style:none;margin:0;padding:0;box-sizing:border-box;color:#fff;font-family:"Source Sans Pro",sans-serif;text-decoration:none;-webkit-tap-highlight-color:#fff0}:root{--main:#950000}body{background:#000;font-family:"Source Sans Pro",sans-serif}
                    @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500;700&display=swap");
                    :root {
                    --bg-red: #e50914;
                    --bg-white: #f7f7f7;
                    --bg-black: #181919;
                    }.boton {color:black;font-size: 13px;padding: 0px 0px;margin: 0px;cursor: pointer;
                    }.boton:hover {background-color: transparent;
                    }
                    </style>
                    </head>
                    <body oncontextmenu='return false' ondragstart='return false' onselectstart='return false'>
                    <div class="menu">
                    <i id="flecha" class="fa-solid fa-arrow-left" style="cursor: pointer;"></i>
                    <button id="flag-button" style="position: fixed; top: px; right: 20px; background: transparent; border: none; color: white; font-size: 25px; cursor: pointer;">
                    </button>
                    </div>
                    <div class="image-container" style="background-image: url('https://image.tmdb.org/t/p/original/${datos.poster_path}');">
                    <img alt="" src="https://image.tmdb.org/t/p/w500/${datos.poster_path}" style="position:absolute;top:59%;width:110px;height:150px;left:10px;right:10px;border-radius:20px;border: 1.3px solid white;" />
                    <div class="inner-shadow">
                    <div class="texto-blanco">${datos.title}-${datos.release_date.substring(0, 4)}</div>
                    </div>
                    </div>
                    <div class="btns">
                    <a><i class="fa-solid fa-star "></i>${datos.genres.map(genre => genre.name).join(', ')}</a>
                    <a id="favoritoBtn" fav-id="${datos.title}"><i class="fa-solid fa-heart-circle-plus"></i><span id="favoritoText"></span></a>
                    <a href="go:reporte"><i class="fa-solid fa-font-awesome "></i>Reportar</a>
                    <a><i class="fa-brands fa-medium"></i>${datos.vote_average}</a></div>
                    </div>
                    <div class="watch-movie" id="watch-movie">
<a id="play-button" href="javascript:void(0)" class="btn">
<i class="fa fa-play" style="font-size:18px"></i> Reproducir
</a>
</div>
<div id="player-container" style="visibility: hidden; height: 0;">
<!-- Aquí va el reproductor de Video.js -->
<video id="player" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360">
<source src="${link2}" type="video/mp4">
</video>
                    <button class="boton-gris">PELICULA</button>
                    <div class="botones-transparentes">
                    <p>Duracion:<button>${convertMinutes(datos.runtime)}</button>
                    </div>
                    <div class="texto-largo">
                    <p>${datos.overview}</p>
                    </div>
                    <div id="mensaje" class="oculto">&#161;PelÃ­cula aÃ±adida a tu lista!</div>
<script src="https://cdn.jsdelivr.net/gh/Dan1ax/Vat@4fb7bc1750a9fb0e254d217175ebb4b6c1697644/video.js"></script>
                    <script>
                    document.getElementById('flecha').addEventListener('click',function(){redirigir()});function redirigir(){var ultimoIdentificador=localStorage.getItem("ultimaPagina");if(ultimoIdentificador){window.location.href="go:"+ultimoIdentificador}else{alert("No hay Ãºltima pÃ¡gina registrada")}}
                    document.getElementById("flag-button").addEventListener("click",function(){window.location.href=""});const favoritoBtn=document.getElementById("favoritoBtn");const favoritoText=document.getElementById("favoritoText");const elementoAgregado={id:favoritoBtn.getAttribute("fav-id"),src:"https://image.tmdb.org/t/p/w500/${datos.poster_path}",alt:"${datos.title}",url:"${link4}",};const favoritos=JSON.parse(localStorage.getItem("favoritos"))||[];const isAdded=favoritos.some(item=>item.id===elementoAgregado.id);updateButtonContent(isAdded);favoritoBtn.addEventListener("click",()=>{const index=favoritos.findIndex(item=>item.id===elementoAgregado.id);if(index===-1){favoritos.push(elementoAgregado);mostrarMensajeEmergente("AÃ±adida a tu lista!")}else{favoritos.splice(index,1);mostrarMensajeEmergente("Eliminada de tu lista")}
                    localStorage.setItem("favoritos",JSON.stringify(favoritos));updateButtonContent(index===-1)});function updateButtonContent(isAdded){if(isAdded){favoritoText.innerText="Eliminar";favoritoBtn.innerHTML='<i class="fa-solid fa-minus"></i><span id="favoritoText">Eliminar</span>'}else{favoritoText.innerText="Agregar";favoritoBtn.innerHTML='<i class="fa-solid fa-plus"></i><span id="favoritoText">Mis Favoritos</span>'}}
                    function mostrarMensajeEmergente(message){const mensaje=document.getElementById('mensaje');mensaje.innerText=message;mensaje.classList.add('mostrando');setTimeout(function(){mensaje.classList.add('ocultando');setTimeout(function(){mensaje.classList.remove('mostrando')},500);setTimeout(function(){mensaje.classList.remove('ocultando')},1000)},3000)}
                    window.addEventListener("scroll",function(){var menu=document.querySelector(".menu");var textoBlanco=document.querySelector(".texto-blanco");if(window.scrollY>=textoBlanco.offsetTop){menu.classList.add("scroll")}else{menu.classList.remove("scroll")}})
                    </script>
                    <script language='Javascript'>
                    document.oncontextmenu = function(){return false}
                    </script>
                     <script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
<script>document.getElementById("flag-button").addEventListener("click",function(){window.location.href="/p/categoria.html"});function stopPropagation(event){event.stopPropagation()}</script>
<script>
// Inicialización del reproductor de Video.js
// Inicialización del reproductor de Video.js
var player = videojs('player', {
controlBar: {
playToggle: false, // Eliminar el control de Play
volumePanel: false, // Eliminar el control de volumen
fullscreenToggle: false, // Eliminar el control de pantalla completa
pipToggle: true, // Eliminar el control Picture-in-Picture
progressControl: true, // Mantener la barra de progreso visible
remainingTimeDisplay: true, // Mostrar el tiempo restante
currentTimeDisplay: true // Mostrar el tiempo actual
},
userActions: {
doubleClick: false, // Desactivar el doble clic para pantalla completa
hotkeys: false, // Desactivar las teclas de acceso rápido para reproducción
}
});

// Agregar el título en la parte superior izquierda del reproductor
var titleDiv = document.createElement('div');
titleDiv.classList.add('vjs-title');
titleDiv.innerHTML = '${datos.title}-${datos.release_date.substring(0, 4)}';
document.querySelector('.vjs-control-bar').appendChild(titleDiv);

document.getElementById('play-button').addEventListener('click', function() {
var playerContainer = document.getElementById('player-container');
var player = videojs('player'); // Inicializa o referencia al reproductor

// Muestra el contenedor del reproductor
playerContainer.style.visibility = 'visible';
playerContainer.style.height = 'auto';
playerContainer.style.display = 'block'; // Asegúrate de que sea visible

// Reproduce el video
player.play();
});
</script>
<script disable-devtool-auto src='https://cdn.jsdelivr.net/npm/disable-devtool'></script>
<script src='https://cdn.jsdelivr.net/gh/Dan1ax/Vat@312829a1d00a3effd7360a6308fdcc888c78c70b/control1.0.js'></script>
    <script src="https://cdn.jsdelivr.net/gh/Dan1ax/Vat@a9095d6751cc0092a8860e7bcd697b7ace04043a/Dragon%20ball%20super%20super%20heroe.js"></script>
                    
                    </body>
                    </html>


`;                  
                    template.innerText = justHtml;
                    let templateHTML = template.innerText;
                    
                    const btnCopiar = document.getElementById('copiar');
                    
                    btnCopiar.addEventListener('click', () => {
                        navigator.clipboard.writeText(templateHTML);
                    })
    
    
                    let genPoster = document.getElementById('info-poster');
                    let genTitle = document.getElementById('info-title');
                    
                                   
                    
                    
                    let genSeasons = document.getElementById('info-seasons');
                    let genYear = document.getElementById('info-year');
    
                    genPoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${datos.poster_path}`)
                    genTitle.innerText = datos.title;
                    genSeasons.innerText = "";
                    genYear.innerText = datos.release_date.slice(0,4);
    
    
    
                } else if (respuesta.status === 401) {
                    console.log('Wrong key');
                } else if (respuesta.status === 404) {
                    console.log('No existe');
                }
    
            } catch (error) {
                console.log(error);
            }           
        }

    }

    cargarPeliculas();

}


generar();
