 // Prevenir gestos táctiles no deseados
 document.addEventListener('touchmove', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

function descargarPelicula(url) {
// Mostrar notificación personalizada (código de ejemplo)
const notification = new Notification('Descarga iniciada', {
body: 'Tu película se está descargando',
icon: 'https://od.lk/s/M18zMDc1MjMzOTdf/DIGITAL%20KNIGHT2.png' // Reemplaza con la ruta de tu icono
});

// Redireccionar a la descarga real
window.location.href = url;
}


var header = document.querySelector(".header");
var movieTitle = document.querySelector(".movie-title");

window.addEventListener("scroll", function () {
var scrollTop = window.scrollY || document.documentElement.scrollTop;

// Ajusta la opacidad del header
var opacity = Math.min(scrollTop / 100, 1); // Aseguramos que no sobrepase 1
header.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

// Muestra el título de la película cuando el header se oscurece
if (scrollTop > 50) { // Cuando el desplazamiento es mayor a 50px
movieTitle.style.opacity = 1;
movieTitle.style.transform = "translateX(0)"; // El título vuelve a su lugar
} else {
movieTitle.style.opacity = 0;
movieTitle.style.transform = "translateX(100%)"; // El título desaparece
}
});




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




function abrirApp() {
window.location.href = "wvc-x-callback://open?url=https://od.lk/s/M18zMDEwNDU1NzJf/Dragon.Ball.Super.Super.Hero.2022.1080P-Dual-Lat.mp4";
}

// Asignar un identificador único para cada película
var movieId = 'Dragon Ball Super: Super Hero';  // Cambia esto dinámicamente según la película

// Inicializamos el reproductor de Video.js
var player = videojs('my-video', {
    controlBar: {
      playToggle: false,        
      volumePanel: false,       
      fullscreenToggle: false,  
      pipToggle: false,         
      progressControl: true,    
      remainingTimeDisplay: true,
      currentTimeDisplay: true,   
    },
    userActions: {
      doubleClick: false,      
      hotkeys: false           
    }
  });
  
  // Recuperar el tiempo guardado y continuar desde ahí
  var savedTime = localStorage.getItem(movieId + 'CurrentTime');
  if (savedTime) {
      player.currentTime(savedTime); // Reanudar desde el tiempo guardado
  }
  
  // Recuperar el progreso guardado de la barra y restaurar su visibilidad
  var savedProgress = localStorage.getItem(movieId + 'Progress');
  if (savedProgress) {
      var progressBar = document.getElementById('progressBar');
      progressBar.style.width = savedProgress + '%'; // Restaurar el progreso visual de la barra
      document.getElementById('progressContainer').style.display = 'block'; // Asegurarse de que la barra esté visible
  }
  
  // Guardar el tiempo de reproducción y actualizar la barra de progreso
  player.on('timeupdate', function() {
      var currentTime = player.currentTime();
      var duration = player.duration();
      var progress = (currentTime / duration) * 100;
  
      // Actualizar la barra de progreso
      var progressBar = document.getElementById('progressBar');
      progressBar.style.width = progress + '%'; // Cambiar el ancho según el progreso
  
      // Guardar el tiempo y el progreso en localStorage
      localStorage.setItem(movieId + 'CurrentTime', currentTime);
      localStorage.setItem(movieId + 'Progress', progress); // Guardar el progreso de la barra
  
      // Guardar la información de la película para la página principal
      if (progress < 100) {
          var movieTitle = document.getElementById('nombre').innerText;
          var moviePoster = document.getElementById('favoritoImagen').src;
          var movieLink = document.getElementById('favoritoEnlace').href;
  
          var movieData = {
              title: movieTitle,
              poster: moviePoster,
              link: movieLink,
              progress: progress,
              currentTime: currentTime
          };
          localStorage.setItem(movieTitle, JSON.stringify(movieData));
      }
  });
  
  // Limpiar el tiempo guardado cuando el video termine
  player.on('ended', function() {
      localStorage.removeItem(movieId + 'CurrentTime');
      localStorage.removeItem(movieId + 'Progress'); // Limpiar el progreso guardado
      document.getElementById('progressContainer').style.display = 'none'; // Ocultar la barra cuando el video termine
  
      // Remover la información de la película al terminar
      var movieTitle = document.getElementById('nombre').innerText;
      localStorage.removeItem(movieTitle);
  });
  
  // Agregar el título en la parte superior izquierda del reproductor
  var titleDiv = document.createElement('div');
  titleDiv.classList.add('vjs-title');
  titleDiv.innerHTML = movieId;  // Usamos el identificador único de la película para el título
  document.querySelector('.vjs-control-bar').appendChild(titleDiv);
  
  // Recuperar el estado del botón y el tiempo guardado
  var buttonState = localStorage.getItem(movieId + 'ButtonState') || 'Ver ahora'; // Estado del botón, por defecto es 'Ver ahora'
  
  // Cambiar el texto del botón según el estado guardado
  var playButton = document.getElementById('playButton');
  playButton.innerHTML = `<i class="material-icons play-icon">play_arrow</i> ${buttonState}`;
  playButton.style.textAlign = 'center'; // Centrar el texto
  
  // Funcionalidad del botón "Ver ahora"
  document.getElementById('playButton').addEventListener('click', function (e) {
      e.preventDefault(); // Evitar el comportamiento por defecto del botón
      document.querySelector('.main').style.display = 'none'; // Ocultar la imagen principal
      document.getElementById('player').style.display = 'block'; // Mostrar el reproductor
      player.play(); // Iniciar el video
  
      // Cambiar el texto del botón a "Continuar viendo" cuando el video comienza
      playButton.innerHTML = '<i class="material-icons play-icon">play_arrow</i> Continuar viendo';
      localStorage.setItem(movieId + 'ButtonState', 'Continuar viendo'); // Guardar el estado como "Continuar viendo"
  
      // Mostrar la barra de progreso
      document.getElementById('progressContainer').style.display = 'block';
  
      // Entrar en pantalla completa
      if (player.requestFullscreen) {
          player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen(); // Safari
      } else if (player.mozRequestFullScreen) {
          player.mozRequestFullScreen(); // Firefox
      }
  });
  
  // Cuando el video termine, restablecer el texto del botón a "Ver ahora"
  player.on('ended', function() {
      playButton.innerHTML = '<i class="material-icons play-icon">play_arrow</i> Ver ahora';
      localStorage.setItem(movieId + 'ButtonState', 'Ver ahora'); // Guardar el estado como "Ver ahora"
      localStorage.removeItem(movieId + 'CurrentTime'); // Limpiar el tiempo guardado
      localStorage.removeItem(movieId + 'Progress'); // Limpiar el progreso guardado
      document.getElementById('progressContainer').style.display = 'none'; // Ocultar la barra cuando el video termine
  
      // Restablecer orientación al finalizar el video
      if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
      }
  });
  
  // Cuando el video sale de pantalla completa, pausamos y ocultamos el reproductor
  player.on('fullscreenchange', function () {
      if (!player.isFullscreen()) {
          player.pause(); // Pausar el video
          document.getElementById('player').style.display = 'none'; // Ocultar el reproductor
          document.querySelector('.main').style.display = 'block'; // Mostrar la imagen principal
  
          // Restablecer la orientación al salir de pantalla completa
          if (screen.orientation && screen.orientation.unlock) {
              screen.orientation.unlock();
          }
      }
  });
  
  // Crear la superposición oscura
  var overlay = document.createElement('div');
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
  
      // Poner la pantalla en modo landscape cuando comienza la reproducción
      if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(function(error) {
              console.error('Error al intentar bloquear la orientación:', error);
          });
      }
  });
  
  // Crear contenedor para los controles personalizados
  var customControls = document.createElement('div');
  customControls.classList.add('vjs-custom-controls');
  
  var topControls = document.createElement('div');
  topControls.classList.add('vjs-top-controls');
  
  // Botón para ajustar pantalla (solo funcional en fullscreen en móviles)
  var screenAdjustButton = document.createElement('button');
  screenAdjustButton.classList.add('vjs-custom-button', 'vjs-screen-adjust-button');
  screenAdjustButton.innerHTML = '<span class="material-icons">aspect_ratio</span>';
  customControls.appendChild(screenAdjustButton);
  
  // Opciones de ajuste disponibles
  let currentAdjustmentIndex = 0;
  var adjustments = ['cover', 'fill', 'fit-height', 'fit-width', 'scaledown', 'contain'];
  
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
      var selectedAdjustment = adjustments[currentAdjustmentIndex];
  
      var videoElement = player.el().querySelector('video');
      var videoContainer = player.el();
  
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
  var seekBackButton = document.createElement('button');
  seekBackButton.classList.add('vjs-custom-button', 'vjs-seek-back');
  seekBackButton.innerHTML = '<span class="material-icons">replay_10</span>';
  topControls.appendChild(seekBackButton);
  
  var playPauseButton = document.createElement('button');
  playPauseButton.classList.add('vjs-custom-button', 'vjs-play-pause');
  playPauseButton.innerHTML = '<span class="material-icons">pause</span>'; // Mostrar pausa inicialmente
  topControls.appendChild(playPauseButton);
  
  var seekForwardButton = document.createElement('button');
  seekForwardButton.classList.add('vjs-custom-button', 'vjs-seek-forward');
  seekForwardButton.innerHTML = '<span class="material-icons">forward_10</span>';
  topControls.appendChild(seekForwardButton);
  
  customControls.appendChild(topControls);
  
  // Controles de Reiniciar y Next (debajo de los controles anteriores)
  var bottomControls = document.createElement('div');
  bottomControls.classList.add('vjs-bottom-controls');
  
  var restartButton = document.createElement('button');
  restartButton.classList.add('vjs-custom-button', 'vjs-restart');
  restartButton.innerHTML = '<span class="material-icons">skip_previous</span> Reiniciar';
  bottomControls.appendChild(restartButton);
  
  customControls.appendChild(bottomControls);
  
  // Agregar los controles al reproductor
  player.el().appendChild(customControls);
  
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
      var currentTime = player.currentTime();
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
      var currentTime = player.currentTime();
      player.currentTime(currentTime + 10);
  });
  
  restartButton.addEventListener('click', function () {
      player.currentTime(0); // Reiniciar el video
      player.play(); // Reproducir desde el principio
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
  
  var style = document.createElement('style');
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
  
  
  // Gestión de favoritos
  const favoritoBtn = document.getElementById('favoritoBtn');
  const favoritoText = document.getElementById('favoritoText');
  const favoritoEnlace = document.getElementById('favoritoEnlace');
  const imagen = document.getElementById('favoritoImagen'); // Asegúrate de que haya una imagen con id "favoritoImagen"
  const nombre = document.getElementById('nombrePelicula').textContent; // Nombre de la película
  const identificador = favoritoBtn.getAttribute('data-identificador');
  
  // Notificación flotante
  const favoritoNotification = document.getElementById('favoritoNotification');
  const notificationText = document.getElementById('notificationText');
  const notificationIcon = document.getElementById('notificationIcon');
  
  // Función para alternar el estado de favorito
  function toggleFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const encontrado = favoritos.some(favorito => favorito.identificador === identificador);
  
    if (encontrado) {
      // Eliminar de favoritos
      const nuevosFavoritos = favoritos.filter(favorito => favorito.identificador !== identificador);
      favoritoBtn.innerHTML = '<i class="material-icons nav__icon">add</i>'; // Icono de "añadir a favoritos"
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      mostrarNotificacion('Eliminado de Favoritos', 'check_circle'); // Mostrar notificación con ícono de check-circle
    } else {
      // Agregar a favoritos
      favoritos.push({
        identificador: identificador,
        imagen: imagen.outerHTML,
        enlace: favoritoEnlace.href,
        nombre: nombre,
      });
      favoritoBtn.innerHTML = '<i class="material-icons nav__icon">check</i>'; // Icono de "favorito añadido"
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      mostrarNotificacion('Añadido a Favoritos', 'check_circle'); // Mostrar notificación con el ícono de check-circle
    }
  }
  
  // Comprobar estado inicial de favoritos (sin cambiar el texto)
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const encontradoInicial = favoritos.some(favorito => favorito.identificador === identificador);
  
  if (encontradoInicial) {
    favoritoBtn.innerHTML = '<i class="material-icons nav__icon">check</i>'; // El icono de "añadido a favoritos"
  } else {
    favoritoBtn.innerHTML = '<i class="material-icons nav__icon">add</i>'; // El icono de "añadir a favoritos"
  }
  
  // Mantener el texto de "Favoritos" constante
  favoritoText.textContent = 'Favoritos'; // Este texto no cambia
  
  // Función para mostrar notificaciones (con la animación y el icono)
  function mostrarNotificacion(mensaje, icono) {
    // Actualizar texto y el icono de la notificación
    notificationText.textContent = mensaje;
    notificationIcon.textContent = icono;
  
    // Mostrar la notificación
    favoritoNotification.classList.add('show');
  
    // Ocultar la notificación después de 3 segundos
    setTimeout(function() {
      favoritoNotification.classList.remove('show');
    }, 3000);
  }
  
  
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