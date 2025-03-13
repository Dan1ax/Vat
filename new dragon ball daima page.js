



  // Prevenir gestos táctiles no deseados
  document.addEventListener('touchmove', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });


window.addEventListener('load', function () {
    const overlay = document.querySelector('.overlay');
    const loader = document.getElementById('loader');

    // Se mantiene el loader visible por 1 segundo
    setTimeout(() => {
        // Hacer que el loader desaparezca rápidamente
        loader.style.opacity = '0'; // Desvanecer loader
        setTimeout(() => {
            loader.style.display = 'none'; // Eliminarlo del flujo

            // Se añade clase "hidden" al overlay para que se desvanezca lentamente
            overlay.classList.add('hidden');
        }, 300); // Tiempo de transición de 300ms para el loader
    }, 1000); // Mantener el loader visible durante 1 segundo

});

        const player = videojs('my-video', {
    controlBar: {
        playToggle: false, // Eliminar el control de Play
        volumePanel: false,
        fullscreenToggle: false,
        pipToggle: false,
        progressControl: true,
        remainingTimeDisplay: true,
        currentTimeDisplay: true,
    },
    userActions: {
        doubleClick: false, // Desactivar doble clic para pantalla completa
        hotkeys: false // Desactivar hotkeys para reproducción
    }
});

// Función para forzar el modo Landscape
function forceLandscape() {
    // Verifica si el dispositivo soporta la API moderna de orientación de pantalla
    if (screen.orientation && screen.orientation.lock) {
        // Intenta bloquear la orientación en Landscape
        screen.orientation.lock('landscape').catch((err) => {
            console.error('No se pudo cambiar a landscape:', err.message);
            // Si la acción falla, intenta la compatibilidad con versiones antiguas
            fallbackToOldOrientationAPI('landscape');
        });
    } else {
        // Si la API moderna no está disponible, intenta con la API antigua
        fallbackToOldOrientationAPI('landscape');
    }
}

// Función para el modo Portrait (opcional)
function forcePortrait() {
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch((err) => {
            console.error('No se pudo cambiar a portrait:', err.message);
            // En caso de fallo, intenta con la API antigua
            fallbackToOldOrientationAPI('portrait');
        });
    } else {
        fallbackToOldOrientationAPI('portrait');
    }
}

// Función de compatibilidad con versiones antiguas de navegadores
function fallbackToOldOrientationAPI(mode) {
    // Verifica si el navegador soporta la API antigua
    if (window.screen.lockOrientation) {
        window.screen.lockOrientation(mode).catch((err) => {
            console.error(`No se pudo cambiar a ${mode}:`, err.message);
        });
    } else {
        console.warn('La API de orientación de pantalla no es compatible en este dispositivo.');
    }
}

// Puedes usar estas funciones en tu app, por ejemplo:
// forceLandscape(); para forzar landscape
// forcePortrait(); para regresar a portrait


// Detectar el evento de reproducción del video
const video = document.getElementById('my-video');
video.addEventListener('play', () => {
    forceLandscape(); // Forzar landscape al reproducir
});

// Detectar el evento de finalización del video (opcional)
video.addEventListener('ended', () => {
    forcePortrait(); // Regresar a portrait al finalizar
});




const favoritoBtn = document.getElementById('favoritoBtn');
const favoritoIcon = document.getElementById('favoritoIcon'); // Ícono
const favoritoText = document.getElementById('favoritoText'); // Texto del botón
const identificador = favoritoBtn.getAttribute('data-identificador');

// Función para manejar el favorito
function toggleFavorito() {
    const favoritoEnlace = document.getElementById('favoritoEnlace');
    const imagen = document.getElementById('favoritoImagen');
    const nombre = document.getElementById('nombre').textContent; // Obtener el texto del span
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const encontrado = favoritos.some(favorito => favorito.identificador === identificador);

    if (encontrado) {
        // Eliminar de favoritos
        const nuevosFavoritos = favoritos.filter(favorito => favorito.identificador !== identificador);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));

        // Actualizar ícono y texto
        favoritoIcon.innerText = 'add';
        favoritoText.innerText = 'Añadir a Favoritos';

        mostrarNotificacion('Se eliminó de favoritos');
    } else {
        // Agregar a favoritos
        favoritos.push({
            identificador: identificador,
            imagen: imagen.outerHTML,
            enlace: favoritoEnlace.href,
            nombre: nombre, // Agregar el nombre al objeto
        });
        localStorage.setItem('favoritos', JSON.stringify(favoritos));

        // Actualizar ícono y texto
        favoritoIcon.innerText = 'check';
        favoritoText.innerText = 'Se añadió a Favoritos';

        mostrarNotificacion('Se añadió a favoritos');
    }
}

// Función para cargar el estado inicial del botón de favoritos
function cargarEstadoFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const encontrado = favoritos.some(favorito => favorito.identificador === identificador);

    if (encontrado) {
        // Si está en favoritos, actualiza ícono y texto
        favoritoIcon.innerText = 'check';
        favoritoText.innerText = 'Se añadió a Favoritos';
    } else {
        // Si no está en favoritos, deja el ícono y texto por defecto
        favoritoIcon.innerText = 'add';
        favoritoText.innerText = 'Añadir a Favoritos';
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarEstadoFavorito);

// Función para cargar el estado inicial del botón de favoritos
function cargarEstadoFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const encontrado = favoritos.some(favorito => favorito.identificador === identificador);

    if (encontrado) {
        // Si está en favoritos, actualiza ícono y texto
        favoritoIcon.innerText = 'check';
        favoritoText.innerText = 'Se añadió a Favoritos';
    } else {
        // Si no está en favoritos, deja el ícono y texto por defecto
        favoritoIcon.innerText = 'add';
        favoritoText.innerText = 'Añadir a Favoritos';
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarEstadoFavorito);


// Selección de los elementos relevantes
const overlayVertical = document.querySelector('.portrait-overlay');
const overlayHorizontal = document.querySelector('.horizontal-overlay');
const header = document.getElementById('header');
const pageTitle = document.querySelector('.page-title');

// Manejar el evento de scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY; // Obtener la posición del scroll
    const maxScroll = 300; // Distancia máxima para el efecto completo

    // Calcular la opacidad para el overlay
    const opacity = Math.max(0, 1 - scrollY / maxScroll); // Rango de 1 a 0
    const titleOpacity = Math.min(scrollY / maxScroll, 1); // Rango de 0 a 1

    // Oscurecer el overlay
    if (overlayVertical) overlayVertical.style.opacity = opacity;
    if (overlayHorizontal) overlayHorizontal.style.opacity = opacity;

    // Oscurecer el header gradualmente
    header.style.backgroundColor = `rgba(0, 0, 0, ${1 - opacity})`;

    // Hacer visible el título gradualmente
    pageTitle.style.opacity = titleOpacity;
});




// Función para cambiar de tab
function switchTab(tab) {
    const episodesTab = document.getElementById("episodes-tab");
    const otherTab = document.getElementById("other-tab");
    const episodesContent = document.getElementById("episodes-content");
    const otherContent = document.getElementById("other-content");

    // Cambiar el estado de las tabs y el contenido correspondiente
    if (tab === 'episodes') {
        episodesTab.classList.add("active");
        otherTab.classList.remove("active");
        episodesContent.classList.add("active");
        otherContent.classList.remove("active");
    } else {
        episodesTab.classList.remove("active");
        otherTab.classList.add("active");
        episodesContent.classList.remove("active");
        otherContent.classList.add("active");
    }
}

// Función para cargar temporadas
function loadSeasons() {
    const seasonList = document.getElementById("season-list");
    seasonList.innerHTML = ''; // Limpiar la lista de temporadas cada vez que se cargue

    playlist.seasons.forEach(season => {
        const seasonItem = document.createElement("li");
        seasonItem.textContent = season.season_title;
        seasonItem.classList.add("season-item");
        seasonItem.addEventListener("click", () => loadEpisodes(season)); // Cargar episodios al seleccionar temporada
        seasonList.appendChild(seasonItem);
    });
}




// Función para cambiar de tab al hacer clic en la tab
document.getElementById("episodes-tab").addEventListener("click", () => switchTab('episodes'));
document.getElementById("other-tab").addEventListener("click", () => switchTab('other'));

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadSeasons(); // Cargar temporadas
    switchTab('episodes'); // Mostrar la tab de episodios por defecto
    document.getElementById("toggle-season-list").addEventListener("click", () => {
        document.getElementById("season-list").classList.toggle("show");
    });
});


// Crear el botón flotante de "Siguiente episodio"
const nextEpisodeButton = document.createElement('button');
nextEpisodeButton.classList.add('vjs-custom-button', 'vjs-next-episode');
nextEpisodeButton.textContent = 'Siguiente episodio';
nextEpisodeButton.style.display = 'none'; // Inicia oculto

// Temporizador de cuenta atrás
let countdownTimer;
let countdownTime = 20; // 10 segundos de cuenta atrás
let isCountdownActive = false; // Flag para saber si la cuenta atrás está activa

// Función para mostrar el temporizador
function startCountdown() {
    nextEpisodeButton.style.display = 'block'; // Muestra el botón
    countdownTime = 20; // Resetear la cuenta atrás a 10 segundos
    updateCountdownDisplay(); // Actualizar el texto del temporizador

    isCountdownActive = true; // Marca la cuenta atrás como activa

    // Actualizar el temporizador cada segundo
    countdownTimer = setInterval(() => {
        countdownTime--;
        updateCountdownDisplay();

        if (countdownTime <= 0) {
            clearInterval(countdownTimer);
            isCountdownActive = false; // Desactiva la cuenta atrás
            nextEpisodeButton.style.display = 'none'; // El botón desaparece después de 10 segundos
            changeEpisode(); // Cambiar al siguiente episodio automáticamente
        }
    }, 1000); // Cada segundo
}

// Actualizar el texto del temporizador en el botón
function updateCountdownDisplay() {
    nextEpisodeButton.textContent = `Siguiente episodio (${countdownTime}s)`;
}

// Función para cambiar al siguiente episodio
function changeEpisode() {
    // Lógica para cambiar al siguiente episodio (ajustar según tu estructura)
    if (currentEpisodeIndex < playlist.seasons[currentSeasonIndex].episodes.length - 1) {
        currentEpisodeIndex++;
        const nextEpisode = playlist.seasons[currentSeasonIndex].episodes[currentEpisodeIndex];
        player.src({ type: 'video/mp4', src: nextEpisode.video_url });
        player.play();
        updateTitle(nextEpisode); // Actualizar el título del episodio
    }
}

// Mostrar el botón "Siguiente episodio" unos minutos antes de acabar
player.on('timeupdate', () => {
    const totalDuration = player.duration();
    const currentTime = player.currentTime();
    const timeBeforeEnd = 60 * 1; // 2 minutos antes de terminar

    if (totalDuration - currentTime <= timeBeforeEnd && !isCountdownActive) {
        startCountdown(); // Comienza la cuenta atrás solo si no está activa
    }
});

// Manejo del click en el botón para cambiar el episodio manualmente
nextEpisodeButton.addEventListener('click', () => {
    if (isCountdownActive) {
        clearInterval(countdownTimer); // Detener la cuenta atrás
    }
    changeEpisode(); // Cambiar al siguiente episodio
    nextEpisodeButton.style.display = 'none'; // Ocultar el botón después de hacer clic
});

// Agregar el botón de "Siguiente episodio" al reproductor
player.el().appendChild(nextEpisodeButton);

// Resetear el botón al inicio de cada nuevo episodio
player.on('loadeddata', () => {
    // Cuando se cargue un nuevo episodio, reiniciar el botón
    nextEpisodeButton.style.display = 'none'; // Asegurarse de que el botón esté oculto al principio
    isCountdownActive = false; // Restablecer la bandera
    clearInterval(countdownTimer); // Detener cualquier temporizador activo
});




// Crear la superposición oscura
const overlay = document.createElement('div');
overlay.classList.add('vjs-dark-overlay');
player.el().appendChild(overlay);

// Mostrar/ocultar la superposición al tocar
let hideOverlayTimeout;

function showOverlay() {
    overlay.style.opacity = '0.5'; // Oscurecer la pantalla
    clearTimeout(hideOverlayTimeout);
}

function hideOverlay() {
    overlay.style.opacity = '0'; // Volver a la normalidad
}

// Eventos para oscurecer temporalmente al tocar
player.el().addEventListener('touchstart', () => {
    showOverlay();
    hideOverlayTimeout = setTimeout(() => {
        if (!player.paused()) hideOverlay();
    }, 2000); // Oscurecer temporalmente durante 2 segundos
});

// Mantener la pantalla oscura al pausar
player.on('pause', () => {
    showOverlay();
});

// Volver a la normalidad al reproducir
player.on('play', () => {
    hideOverlay();
});


const customControls = document.createElement('div');
customControls.classList.add('vjs-custom-controls');

const topControls = document.createElement('div');
topControls.classList.add('vjs-top-controls');

// Botón para ajustar pantalla (solo funcional en fullscreen en móviles)
const screenAdjustButton = document.createElement('button');
screenAdjustButton.classList.add('vjs-custom-button', 'vjs-screen-adjust-button');
screenAdjustButton.innerHTML = '<span class="material-icons">aspect_ratio</span>';
customControls.appendChild(screenAdjustButton);

// Opciones de ajuste disponibles
let currentAdjustmentIndex = 0;
const adjustments = ['cover', 'fill', 'fit-height', 'fit-width', 'scaledown', 'contain'];

// Mostrar el nombre del ajuste al centro de la pantalla
function showAdjustmentLabel(label) {
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('vjs-adjustment-label');
    labelDiv.textContent = label;
    document.querySelector('.video-js').appendChild(labelDiv);

    setTimeout(() => {
        labelDiv.remove();
    }, 1500); // Mostrar por 1.5 segundos
}

// Lógica para cambiar los ajustes
screenAdjustButton.addEventListener('click', () => {
    if (!player.isFullscreen()) {
        console.log("El control de ajuste es funcional solo en pantalla completa.");
        return;
    }

    currentAdjustmentIndex = (currentAdjustmentIndex + 1) % adjustments.length;
    const selectedAdjustment = adjustments[currentAdjustmentIndex];

    const videoElement = player.el().querySelector('video');
    const videoContainer = player.el();

    switch (selectedAdjustment) {
        case 'cover':
            videoElement.style.objectFit = 'cover';
            break;
        case 'fill':
            videoElement.style.objectFit = 'fill';
            break;
        case 'fit-height':
            videoElement.style.objectFit = 'contain';
            videoElement.style.height = '100%';
            videoElement.style.width = 'auto';
            break;
        case 'fit-width':
            videoElement.style.objectFit = 'contain';
            videoElement.style.width = '100%';
            videoElement.style.height = 'auto';
            break;
        case 'scaledown':
            videoElement.style.objectFit = 'contain';
            videoElement.style.width = 'auto';
            videoElement.style.height = 'auto';
            videoContainer.style.display = 'flex';
            videoContainer.style.justifyContent = 'center';
            videoContainer.style.alignItems = 'center';
            break;
        case 'contain':
            videoElement.style.objectFit = 'contain';
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            break;
    }

    // Mostrar el nombre del ajuste
    showAdjustmentLabel(selectedAdjustment);
});




// Crear el botón de regreso con chevron
var backButton = document.createElement('a');
backButton.classList.add('vjs-custom-button', 'vjs-back-button');
backButton.innerHTML = '<span class="material-icons">chevron_left</span>';

// Agregar funcionalidad al botón
backButton.addEventListener('click', function () {
// Pausar el video
player.pause();

// Salir del modo pantalla completa si está activado
if (player.isFullscreen()) {
player.exitFullscreen();
}

// Ocultar o cerrar el reproductor (opcional, dependiendo de cómo esté configurado tu reproductor)
var playerContainer = document.getElementById('player');
if (playerContainer) {
playerContainer.style.display = 'none'; // Ocultar el reproductor
}

// Restablecer orientación al salir
if (screen.orientation && screen.orientation.unlock) {
screen.orientation.unlock();
}
});

    customControls.appendChild(backButton);

// Controles de Seek y Play/Pause
const seekBackButton = document.createElement('button');
seekBackButton.classList.add('vjs-custom-button', 'vjs-seek-back');
seekBackButton.innerHTML = '<span class="material-icons">replay_10</span>';
topControls.appendChild(seekBackButton);

const playPauseButton = document.createElement('button');
playPauseButton.classList.add('vjs-custom-button', 'vjs-play-pause');
playPauseButton.innerHTML = '<span class="material-icons">pause</span>'; // Mostrar pausa inicialmente
topControls.appendChild(playPauseButton);

const seekForwardButton = document.createElement('button');
seekForwardButton.classList.add('vjs-custom-button', 'vjs-seek-forward');
seekForwardButton.innerHTML = '<span class="material-icons">forward_10</span>';
topControls.appendChild(seekForwardButton);

customControls.appendChild(topControls);

// Controles de Reiniciar y Next (debajo de los controles anteriores)
const bottomControls = document.createElement('div');
bottomControls.classList.add('vjs-bottom-controls');

// Botón de Descargar
const downloadButton = document.createElement('button');
downloadButton.classList.add('vjs-custom-button', 'vjs-download');
downloadButton.innerHTML = '<span class="material-icons">file_download</span> Descargar';
bottomControls.appendChild(downloadButton);

// Botón de Reiniciar
const restartButton = document.createElement('button');
restartButton.classList.add('vjs-custom-button', 'vjs-restart');
restartButton.innerHTML = '<span class="material-icons">skip_previous</span> Reiniciar';
bottomControls.appendChild(restartButton);

/// Botón de Siguiente
const nextButton = document.createElement('button');
nextButton.classList.add('vjs-custom-button', 'vjs-next');
nextButton.innerHTML = '<span class="material-icons">skip_next</span> Siguiente';

// Lógica para cambiar al siguiente episodio
nextButton.addEventListener('click', () => {
    const currentEpisodeIndex = player.currentEpisodeIndex || 0; // Índice del episodio actual
    const currentSeason = playlist.seasons[0]; // Por ahora, asumimos la primera temporada

    if (currentSeason && currentSeason.episodes[currentEpisodeIndex + 1]) {
        // Actualizar el índice del episodio actual
        const newEpisodeIndex = currentEpisodeIndex + 1;
        player.currentEpisodeIndex = newEpisodeIndex;

        // Cambiar la fuente del video al siguiente episodio
        const nextEpisode = currentSeason.episodes[newEpisodeIndex];
        player.src(nextEpisode.video_url);

        // Emitir un evento personalizado para actualizar otros elementos
        player.trigger('episodechange', { newEpisodeIndex });
    } else {
        alert('No hay más episodios disponibles.');
    }
});

bottomControls.appendChild(nextButton);

customControls.appendChild(bottomControls);

// Agregar los controles al reproductor
player.el().appendChild(customControls);

// Función para obtener el enlace de descarga del episodio actual
function getCurrentDownloadLink() {
    const currentEpisodeIndex = player.currentEpisodeIndex || 0; // Índice del episodio actual
    const currentSeason = playlist.seasons[0]; // Por ahora, asumimos la primera temporada
    if (currentSeason && currentSeason.episodes[currentEpisodeIndex]) {
        return currentSeason.episodes[currentEpisodeIndex].download_link;
    }
    return null;
}

// Lógica para el botón de Descargar
downloadButton.addEventListener('click', () => {
    const downloadLink = getCurrentDownloadLink();
    if (downloadLink) {
        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert('No se pudo encontrar el enlace de descarga para este episodio.');
    }
});

// Actualizar el índice del episodio actual cuando cambie
player.on('episodechange', (e, data) => {
    player.currentEpisodeIndex = data.newEpisodeIndex;
});



// Lógica de visibilidad de controles
let hideControlsTimeout;

function showControls() {
    player.controlBar.el().style.opacity = '1';
    customControls.style.opacity = '1';
    clearTimeout(hideControlsTimeout);
}

function hideControls() {
    if (!player.paused()) {
        player.controlBar.el().style.opacity = '0';
        customControls.style.opacity = '0';
    }
}

function isMobileDevice() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

player.el().addEventListener(isMobileDevice() ? 'touchstart' : 'mousemove', () => {
    showControls();
    hideControlsTimeout = setTimeout(hideControls, 5000); // Ocultar controles después de 2 segundos
});

player.on('pause', () => {
    showControls();
    clearTimeout(hideControlsTimeout);
});

player.on('play', () => {
    playPauseButton.innerHTML = '<span class="material-icons">pause</span>';
    hideControlsTimeout = setTimeout(hideControls, 2000); // Ocultar controles después de 2 segundos
});

player.on('pause', () => {
    playPauseButton.innerHTML = '<span class="material-icons">play_arrow</span>';
});

// Botones personalizados
seekBackButton.addEventListener('click', function () {
    const currentTime = player.currentTime();
    player.currentTime(Math.max(0, currentTime - 10));
});

playPauseButton.addEventListener('click', function () {
    if (player.paused()) {
        player.play();
        playPauseButton.innerHTML = '<span class="material-icons">pause</span>';
    } else {
        player.pause();
        playPauseButton.innerHTML = '<span class="material-icons">play_arrow</span>';
    }
});

seekForwardButton.addEventListener('click', function () {
    const currentTime = player.currentTime();
    player.currentTime(currentTime + 10);
});

restartButton.addEventListener('click', function () {
    player.currentTime(0); // Reiniciar el video
    player.play(); // Reproducir desde el principio
});

nextButton.addEventListener('click', function () {
    // Verificar si hay un siguiente episodio
    if (currentEpisodeIndex < playlist.seasons[currentSeasonIndex].episodes.length - 1) {
        // Si hay un siguiente episodio, avanzamos al siguiente episodio
        currentEpisodeIndex++;
        const nextEpisode = playlist.seasons[currentSeasonIndex].episodes[currentEpisodeIndex];
        player.src({ type: 'video/mp4', src: nextEpisode.video_url });
        player.play();
        updateTitle(nextEpisode); // Actualizar el título con el nuevo episodio
    } else if (currentSeasonIndex < playlist.seasons.length - 1) {
        // Si no hay más episodios en la temporada actual, avanzamos a la siguiente temporada
        currentSeasonIndex++;
        currentEpisodeIndex = 0; // Comenzamos desde el primer episodio de la nueva temporada
        const nextSeason = playlist.seasons[currentSeasonIndex];
        updateSeasonButton(nextSeason.season_title); // Actualizamos el título de la temporada
        loadEpisodes(nextSeason); // Cargamos los episodios de la siguiente temporada
        const nextEpisode = nextSeason.episodes[currentEpisodeIndex];
        player.src({ type: 'video/mp4', src: nextEpisode.video_url });
        player.play();
        updateTitle(nextEpisode); // Actualizar el título con el nuevo episodio
    }
});


// Comportamiento de pantalla completa y pausa
player.on('play', () => {
    if (!player.isFullscreen()) {
        player.requestFullscreen();
    }
});

player.on('fullscreenchange', () => {
    if (!player.isFullscreen()) {
        player.pause();
    }
});

// Restringir reproducción/pausa a controles personalizados
player.el().addEventListener('click', (e) => {
    if (!isMobileDevice()) {
        e.stopPropagation();
    }
});

const style = document.createElement('style');
style.innerHTML = `
    /* Contenedores de los controles personalizados */
    .vjs-custom-controls {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 10px; /* Mantener los controles Seek/Play en su lugar */
        width: 100%;
        z-index: 10;
    }

    /* Contenedor de los controles Seek y Play (en el centro de la pantalla) */
    .vjs-top-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px; /* Espacio entre los controles Seek/Play y los controles de Reiniciar/Next */
        gap: 30px; /* Añadir separación entre los controles Seek y Play */
    }

    /* Estilos para los botones de Seek y Play/Pause (más grandes) */
    .vjs-top-controls .vjs-custom-button {
        background-color: rgba(0, 0, 0, 0,);
        color: white;
        border: none;
        font-size: 60px; /* Iconos más grandes */
        padding: 20px; /* Botones más grandes */
        margin: 0 15px;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .vjs-top-controls .vjs-custom-button:hover {
        transform: scale(1.1); /* Efecto al pasar el mouse */
    }

    .vjs-top-controls .material-icons {
        font-size: 60px; /* Iconos más grandes */
    }

    /* Contenedor de los controles de Reiniciar y Next (debajo de los Seek/Play) */
    .vjs-bottom-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -90px; /* Mover los controles Reiniciar/Next hacia abajo */
        width: 100%;
        gap: 50px; /* Añadir separación entre los controles Reiniciar y Next */
    }

    /* Estilos para los botones de Reiniciar y Next (más pequeños) */
    .vjs-bottom-controls .vjs-custom-button {
        background-color: rgba(0, 0, 0, 0,);
        color: white;
        border: none;
        font-size: 10px; /* Iconos más pequeños */
        padding: 8px; /* Botones más pequeños */
        margin: 0 10px;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .vjs-bottom-controls .vjs-custom-button:hover {
        transform: scale(1.1); /* Efecto al pasar el mouse */
    }

    .vjs-bottom-controls .material-icons {
        font-size: 20px; /* Iconos más pequeños */
    }

    /* Texto pequeño al lado de los iconos */
    .vjs-restart, .vjs-next {
        font-size: 10px; /* Texto más pequeño */
        margin-left: 8px; /* Separación del texto respecto al icono */
    }

    /* Estilo del título */
    .vjs-title {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 24px;
        color: white;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        z-index: 9999;
    }
`;
document.head.appendChild(style);




let currentSeasonIndex = 0;
let currentEpisodeIndex = 0;
let currentTitleElement = null; // Referencia al título actual

function updateTitle(episode) {
    if (currentTitleElement) {
        currentTitleElement.remove();
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('vjs-title'); // Usar clase CSS
    titleDiv.textContent = episode.title;

    document.querySelector('.vjs-control-bar').appendChild(titleDiv);
    currentTitleElement = titleDiv;
}

function loadSeasons() {
    const seasonList = document.getElementById('season-list');
    seasonList.innerHTML = ''; // Limpiar la lista de temporadas

    playlist.seasons.forEach((season, index) => {
        const seasonItem = document.createElement('li');
        seasonItem.textContent = season.season_title;
        seasonItem.classList.add('season-item'); // Clase para estilos

        seasonItem.onclick = () => {
            // Actualizar temporada seleccionada
            currentSeasonIndex = index;
            currentEpisodeIndex = 0;
            renderEpisodes(season); // Renderizar episodios de la temporada seleccionada
            updateSeasonButton(season.season_title); // Actualizar el botón con el título de la temporada
            seasonList.style.display = 'none'; // Ocultar lista de temporadas
        };

        seasonList.appendChild(seasonItem);
    });
}

function updateSeasonButton(seasonTitle) {
    const seasonButton = document.getElementById('toggle-season-list');
    seasonButton.innerHTML = `<span class="material-icons">arrow_drop_down</span> ${seasonTitle}`;
}

function renderEpisodes(season) {
    const episodeList = document.getElementById('episode-list');
    episodeList.innerHTML = ''; // Limpiar episodios previos

    // Obtener episodios reproducidos desde localStorage
    const watchedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes')) || {};

    season.episodes.forEach((episode, index) => {
        const episodeItem = document.createElement('li');
        episodeItem.classList.add('episode-item');

        // Marcar episodios reproducidos
        if (watchedEpisodes[episode.video_url]?.watched) {
            episodeItem.classList.add('watched');
        }

        // Estructura del episodio con barra de progreso
        episodeItem.innerHTML = `
            <div class="episode">
                <div class="episode-thumbnail">
                    <img src="${episode.image}" alt="${episode.title}" class="episode-image">
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                </div>
                <div class="episode-info">
                    <h3 class="episode-title">${episode.title}</h3>
                    <p class="episode-duration">${episode.duration}</p>
                    <a href="${episode.download_link}" class="download_link" download="${episode.title}.mp4">
                        <span class="material-icons">arrow_downward</span>
                    </a>
                </div>
            </div>
        `;

        // Actualizar barra de progreso al cargar
        const progressBar = episodeItem.querySelector('.progress-bar');
        const savedTime = watchedEpisodes[episode.video_url]?.time || 0;
        const durationInSeconds = parseInt(episode.duration.split('m')[0]) * 60;
        const progressPercentage = (savedTime / durationInSeconds) * 100;

        progressBar.style.width = `${progressPercentage}%`;

        // Reproducir episodio al hacer clic en el episodio (pero no en el botón de descarga)
        episodeItem.addEventListener('click', (event) => {
            if (event.target.closest('.download_link')) {
                return; // No hacer nada si se hizo clic en el enlace de descarga
            }

            // Solo reproducir cuando se hace clic en el episodio
            playEpisode(episode, episodeItem, progressBar, durationInSeconds, index);
        });

        episodeList.appendChild(episodeItem);
    });

    // Cargar y mostrar el título del primer episodio por defecto
    updateTitle(season.episodes[0]);
}

function playEpisode(episode, episodeItem, progressBar, durationInSeconds, episodeIndex) {
    // Establecer el video
    player.src({ type: 'video/mp4', src: episode.video_url });

    // Obtener el progreso guardado de localStorage
    const watchedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes')) || {};
    const savedTime = watchedEpisodes[episode.video_url]?.time || 0;
    const watched = watchedEpisodes[episode.video_url]?.watched || false;

    // Si el episodio ya fue completado, la barra de progreso se establece al 100%
    if (watched) {
        progressBar.style.width = '100%';
    } else {
        // Si no ha sido completado, usar el tiempo guardado para mostrar el progreso
        progressBar.style.width = `${(savedTime / durationInSeconds) * 100}%`;
    }

    // Establecer el tiempo de inicio del video (para que empiece desde donde se dejó)
    player.currentTime(savedTime);

    // Reproducir el episodio
    player.play();
    currentEpisodeIndex = episodeIndex;
    updateTitle(episode); // Actualizar título del episodio

    // Escuchar evento de 'timeupdate' para actualizar el progreso
    player.on('timeupdate', function () {
        const currentTime = player.currentTime();
        const progressPercentage = (currentTime / durationInSeconds) * 100;

        // Actualizar visualmente la barra de progreso
        progressBar.style.width = `${progressPercentage}%`;

        // Guardar el progreso actual de este episodio en localStorage
        watchedEpisodes[episode.video_url] = {
            time: currentTime,
            watched: false, // Por ahora, el episodio no está marcado como visto
        };
        localStorage.setItem('watchedEpisodes', JSON.stringify(watchedEpisodes));
    });

    // Marcar como reproducido al finalizar el video
    player.on('ended', function () {
        const watchedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes')) || {};
        watchedEpisodes[episode.video_url] = {
            time: durationInSeconds, // Marcar como completado (100%)
            watched: true, // Marcar el episodio como visto
        };
        localStorage.setItem('watchedEpisodes', JSON.stringify(watchedEpisodes));

        // Llenar la barra de progreso al 100% al terminar el episodio
        progressBar.style.width = '100%';

        // Marcar visualmente el episodio como visto
        episodeItem.classList.add('watched'); 

        // Reproducir automáticamente el siguiente episodio
        autoPlayNextEpisode();
    });
}


function autoPlayNextEpisode() {
    const currentSeason = playlist.seasons[currentSeasonIndex];
    if (currentEpisodeIndex < currentSeason.episodes.length - 1) {
        // Avanzar al siguiente episodio
        currentEpisodeIndex++;
        const nextEpisode = currentSeason.episodes[currentEpisodeIndex];

        // Obtener elementos del siguiente episodio
        const episodeList = document.getElementById('episode-list');
        const nextEpisodeItem = episodeList.children[currentEpisodeIndex];
        const nextProgressBar = nextEpisodeItem.querySelector('.progress-bar');
        const nextDurationInSeconds = parseInt(nextEpisode.duration.split('m')[0]) * 60;

        // Reproducir el siguiente episodio
        playEpisode(nextEpisode, nextEpisodeItem, nextProgressBar, nextDurationInSeconds, currentEpisodeIndex);
    } else if (currentSeasonIndex < playlist.seasons.length - 1) {
        // Avanzar a la siguiente temporada
        currentSeasonIndex++;
        currentEpisodeIndex = 0;
        const nextSeason = playlist.seasons[currentSeasonIndex];
        updateSeasonButton(nextSeason.season_title);
        renderEpisodes(nextSeason);
        const nextEpisode = nextSeason.episodes[currentEpisodeIndex];

        // Obtener elementos del siguiente episodio
        const episodeList = document.getElementById('episode-list');
        const nextEpisodeItem = episodeList.children[currentEpisodeIndex];
        const nextProgressBar = nextEpisodeItem.querySelector('.progress-bar');
        const nextDurationInSeconds = parseInt(nextEpisode.duration.split('m')[0]) * 60;

        // Reproducir el siguiente episodio
        playEpisode(nextEpisode, nextEpisodeItem, nextProgressBar, nextDurationInSeconds, currentEpisodeIndex);
    }
}

// Inicializar la lista de temporadas
loadSeasons();

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadSeasons(); // Cargar temporadas en la lista
    renderEpisodes(playlist.seasons[0]); // Cargar episodios de la primera temporada
    updateSeasonButton(playlist.seasons[0].season_title); // Botón con la primera temporada
    // No reproducir automáticamente al cargar la página
});

// Cargar el progreso de cada episodio desde localStorage cuando se recarga la página
document.addEventListener('DOMContentLoaded', function () {
    const watchedEpisodes = JSON.parse(localStorage.getItem('watchedEpisodes')) || {};

    // Recorre todos los episodios y actualiza la barra de progreso según el tiempo guardado
    const episodeList = document.getElementById('episode-list');
    Array.from(episodeList.children).forEach((episodeItem, index) => {
        const episode = playlist.seasons[currentSeasonIndex].episodes[index];
        const progressBar = episodeItem.querySelector('.progress-bar');
        const savedTime = watchedEpisodes[episode.video_url]?.time || 0;
        const durationInSeconds = parseInt(episode.duration.split('m')[0]) * 60;

        // Si el episodio está marcado como visto, la barra debe estar al 100%
        if (watchedEpisodes[episode.video_url]?.watched) {
            progressBar.style.width = '100%';
        } else {
            progressBar.style.width = `${(savedTime / durationInSeconds) * 100}%`;
        }
    });
});




// Gestión de imágenes de perfil
const footerProfileIcon = document.getElementById("footerIconImg");
const profileImage = document.getElementById("profileImage");
const profilePageImage = document.getElementById("profilePageImage");

const defaultProfileIcon = document.getElementById("defaultProfileIcon"); // Icono de perfil en el footer
const defaultProfileIconAlt = document.getElementById("defaultProfileIconAlt"); // Icono alternativo de perfil

// Función para cambiar todas las imágenes de perfil
function updateProfileImage(src) {
  profileImage.src = src;
  profilePageImage.src = src;
  footerProfileIcon.src = src;
  defaultProfileIcon.style.display = 'none'; // Ocultar el icono de perfil
  defaultProfileIconAlt.style.display = 'none'; // Ocultar el icono alternativo
  localStorage.setItem('profileImage', src); // Guardar la imagen en el almacenamiento local
}

// Restaurar la imagen de perfil guardada al cargar la página
window.addEventListener('load', function () {
  const storedProfileImage = localStorage.getItem('profileImage');
  if (storedProfileImage) {
    footerProfileIcon.src = storedProfileImage;
    profileImage.src = storedProfileImage;
    profilePageImage.src = storedProfileImage;
    defaultProfileIcon.style.display = 'none'; // Ocultar el icono de perfil
    defaultProfileIconAlt.style.display = 'none'; // Ocultar el icono alternativo
  }
});