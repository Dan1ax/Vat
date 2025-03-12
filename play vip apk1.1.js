// Prevenir gestos táctiles no deseados
 document.addEventListener('touchmove', función (evento) {
    si (evento.toca.longitud > 1) {
        evento.preventDefault();
    }
}, { pasivo: falso });

función descargarPelicula(url) {
// Mostrar notificación personalizada (código de ejemplo)
notificación constante = nueva Notificación('Descarga iniciada', {
cuerpo: 'Tu película se está descargando',
icon: 'https://od.lk/s/M18zMDc1MjMzOTdf/DIGITAL%20KNIGHT2.png' // Reemplaza con la ruta de tu icono
});

// Redireccionar a la descarga real
ventana.ubicación.href = url;
}


var encabezado = document.querySelector(".encabezado");
var movieTitle = document.querySelector(".título-de-la-pelicula");

ventana.addEventListener("desplazarse", función () {
var scrollTop = ventana.scrollY || documento.documentElement.scrollTop;

// Ajusta la opacidad del header
var opacidad = Math.min(scrollTop / 100, 1); // Aseguramos que no sobrepase 1
encabezado.estilo.fondoColor = `rgba(0, 0, 0, ${opacidad})`;

// Muestra el título de la película cuando el encabezado se oscurece
if (scrollTop > 50) { // Cuando el desplazamiento es mayor a 50px
peliculaTitulo.estilo.opacidad = 1;
movieTitle.style.transform = "translateX(0)"; // El título vuelve a su lugar
} demás {
peliculaTitulo.estilo.opacidad = 0;
movieTitle.style.transform = "translateX(100%)"; // El título desaparece
}
});




ventana.addEventListener('cargar', función () {
const superposición = document.querySelector('.overlay');
const cargador = document.getElementById('cargador');

// Se mantiene el cargador visible por 1 segundo
establecerTiempo de espera(() => {
// Hacer que el cargador desaparezca rápidamente
loader.style.opacity = '0'; // Desactivar loader
establecerTiempo de espera(() => {
    loader.style.display = 'ninguno'; // eliminarlo del flujo

    // Se añade clase "hidden" al overlay para que se desvanezca lentamente
    superposición.classList.add('oculto');
}, 300); // Tiempo de transición de 300ms para el cargador
}, 1000); // Mantener el cargador visible durante 1 segundo

});




función abrirApp() {
ventana.ubicación.href = "wvc-x-callback://open?url=https://od.lk/s/M18zMDEwNDU1NzJf/Dragon.Ball.Super.Super.Hero.2022.1080P-Dual-Lat.mp4";
}

// Asignar un identificador único para cada película
var movieId = 'Dragon Ball Super: Superhéroe'; // Cambia esto dinámicamente según la película

// Inicializamos el reproductor de Video.js
var player = videojs('mi-video', {
    barra de control: {
      playToggle: falso,        
      VolumePanel: falso,       
      pantalla completaAlternar: falso,  
      pipToggle: falso,         
      progresoControl: verdadero,    
      tiempo restante de visualización: verdadero,
      currentTimeDisplay: verdadero,   
    },
    Acciones del usuario: {
      doble clic: falso,      
      Teclas de acceso rápido: falso           
    }
  });
  
  // Recuperar el tiempo guardado y continuar desde ahí
  var saveTime = localStorage.getItem(movieId + 'HoraActual');
  si (tiempoguardado) {
      jugador.currentTime(savedTime); // Reanudar desde el tiempo guardado
  }
  
  // Recuperar el progreso guardado de la barra y restaurar su visibilidad
  var saveProgress = localStorage.getItem(movieId + 'Progreso');
  si (progresoguardado) {
      var progressBar = document.getElementById('progressBar');
      ProgressBar.style.width = Progreso guardado + '%'; // Restaurar el progreso visual de la barra
      document.getElementById('progressContainer').style.display = 'bloque'; // Asegurarse de que la barra esté visible
  }
  
  // Guardar el tiempo de reproducción y actualizar la barra de progreso
  jugador.on('actualizaciondetiempo', funcion() {
      var currentTime = jugador.currentTime();
      var duración = jugador.duration();
      var progreso = (tiempoactual / duración) * 100;
  
      // Actualizar la barra de progreso
      var progressBar = document.getElementById('progressBar');
      ProgressBar.style.width = progreso + '%'; // Cambiar el ancho según el progreso
  
      // Guardar el tiempo y el progreso en localStorage
      localStorage.setItem(movieId + 'HoraActual', horaActual);
      localStorage.setItem(movieId + 'Progreso', progreso); // Guardar el progreso de la barra
  
      // Guardar la información de la película para la página principal
      si (progreso < 100) {
          var movieTitle = document.getElementById('nombre').innerText;
          var moviePoster = document.getElementById('favoritoImagen').src;
          var movieLink = document.getElementById('favoritoEnlace').href;
  
          var movieData = {
              Título: Título de la película,
              cartel: cartel de pelicula,
              enlace: movieLink,
              progreso: progreso,
              horaActual: horaActual
          };
          localStorage.setItem(títulodepelícula, JSON.stringify(datosdepelícula));
      }
  });
  
  // Limpiar el tiempo guardado cuando termine el video
  jugador.on('finalizado', función() {
      localStorage.removeItem(movieId + 'HoraActual');
      localStorage.removeItem(movieId + 'Progreso'); // Limpiar el progreso guardado
      document.getElementById('progressContainer').style.display = 'none'; // Ocultar la barra cuando el video termine
  
      // Elimina la información de la película al terminar
      var movieTitle = document.getElementById('nombre').innerText;
      localStorage.removeItem(títulodepelícula);
  });
  
  // Agregar el título en la parte superior izquierda del reproductor
  var titleDiv = document.createElement('div');
  títuloDiv.classList.add('vjs-title');
  titleDiv.innerHTML = movieId; // Usamos el identificador único de la película para el título
  documento.querySelector('.vjs-control-bar').appendChild(titleDiv);
  
  // Recuperar el estado del botón y el tiempo guardado
  var buttonState = localStorage.getItem(movieId + 'ButtonState') || 'Ver ahora'; // Estado del botón, por defecto es 'Ver ahora'
  
  // Cambiar el texto del botón según el estado guardado
  var playButton = document.getElementById('playButton');
  playButton.innerHTML = `<i class="material-icons play-icon">flecha_de_reproducción</i> ${buttonState}`;
  playButton.style.textAlign = 'centro'; // Centrar el texto
  
  // Funcionalidad del botón "Ver ahora"
  document.getElementById('playButton').addEventListener('clic', función (e) {
      e.preventDefault(); // Evitar el comportamiento por defecto del botón
      document.querySelector('.main').style.display = 'none'; // Ocultar la imagen principal
      document.getElementById('player').style.display = 'bloque'; // Mostrar el reproductor
      jugador.play(); // Iniciar el vídeo
  
      // Cambiar el texto del botón a "Continuar viendo" cuando el video comienza
      playButton.innerHTML = '<i class="material-icons play-icon">play_arrow</i> Continuar viendo';
      localStorage.setItem(movieId + 'ButtonState', 'Continuar viendo'); // Guardar el estado como "Continuar viendo"
  
      // Mostrar la barra de progreso
      documento.getElementById('progressContainer').style.display = 'bloque';
  
      // Entrar en pantalla completa
      si (jugador.solicitudPantallaCompleta) {
          jugador.requestFullscreen();
      } de lo contrario si (jugador.webkitRequestFullscreen) {
          reproductor.webkitRequestFullscreen(); // Safari
      } de lo contrario si (jugador.mozRequestFullScreen) {
          reproductor.mozRequestFullScreen(); // Firefox
      }
  });
  
  // Cuando el video termine, restablezca el texto del botón a "Ver ahora"
  jugador.on('finalizado', función() {
      playButton.innerHTML = '<i class="material-icons play-icon">play_arrow</i> Ver ahora';
      localStorage.setItem(movieId + 'ButtonState', 'Ver ahora'); // Guardar el estado como "Ver ahora"
      localStorage.removeItem(movieId + 'CurrentTime'); // Limpiar el tiempo guardado
      localStorage.removeItem(movieId + 'Progreso'); // Limpiar el progreso guardado
      document.getElementById('progressContainer').style.display = 'none'; // Ocultar la barra cuando el video termine
  
      // Restablecer orientación al finalizar el vídeo
      si (pantalla.orientación && pantalla.orientación.desbloqueo) {
          pantalla.orientacion.desbloquear();
      }
  });
  
  // Cuando el video sale de pantalla completa, pausamos y ocultamos el reproductor
  jugador.on('cambio de pantalla completa', función () {
      si (!jugador.isFullscreen()) {
          jugador.pausa(); // Pausar el vídeo
          document.getElementById('player').style.display = 'none'; // Ocultar el reproductor
          document.querySelector('.main').style.display = 'bloque'; // Mostrar la imagen principal
  
          // Restablecer la orientación al salir de pantalla completa
          si (pantalla.orientación && pantalla.orientación.desbloqueo) {
              pantalla.orientacion.desbloquear();
          }
      }
  });
  
  // Crear la superposición oscura
  var superposición = document.createElement('div');
  superposición.classList.add('vjs-dark-overlay');
  jugador.el().appendChild(superposición);
  
  // Mostrar/ocultar la superposición al tocar
  deje que hideOverlayTimeout;
  
  función showOverlay() {
      superposición.estilo.opacidad = '0,5'; // Oscurecer la pantalla
      clearTimeout(ocultarTimeout de superposición);
  }
  
  función hideOverlay() {
      superposición.estilo.opacidad = '0'; // Volver a la normalidad
  }
  
  // Eventos para oscurecer temporalmente al tocar
  jugador.el().addEventListener('touchstart', () => {
      mostrarSuperposición();
      hideOverlayTimeout = setTimeout(() => {
          si (!player.paused()) ocultarOverlay();
      }, 2000); // Oscurecer temporalmente durante 2 segundos
  });
  
  // Mantener la pantalla oscura al pausar
  jugador.on('pausa', () => {
      mostrarSuperposición();
  });
  
  // Volver a la normalidad al reproducir
  jugador.on('jugar', () => {
      ocultarSuperposición();
  
      // Poner la pantalla en modo horizontal cuando comienza la reproducción
      si (pantalla.orientación && pantalla.orientación.bloqueo) {
          pantalla.orientacion.lock('paisaje').catch(funcion(error) {
              console.error('Error al intentar bloquear la orientación:', error);
          });
      }
  });
  
  // Crear contenedor para los controles personalizados
  var customControls = document.createElement('div');
  customControls.classList.add('vjs-controles-personalizados');
  
  var topControls = document.createElement('div');
  topControls.classList.add('vjs-top-controls');
  
  // Botón para ajustar pantalla (solo funcional en pantalla completa en móviles)
  var screenAdjustButton = document.createElement('botón');
  screenAdjustButton.classList.add('boton-personalizado-vjs', 'boton-de-ajuste-de-pantalla-vjs');
  screenAdjustButton.innerHTML = '<span class="material-icons">relación_de_aspecto</span>';
  customControls.appendChild(botonAjustePantalla);
  
  // Opciones de ajuste disponibles
  deje que currentAdjustmentIndex = 0;
  var ajustes = ['cubierta', 'relleno', 'ajustar-altura', 'ajustar-ancho', 'reducir', 'contener'];
  
  // Mostrar el nombre del ajuste al centro de la pantalla
  función showAdjustmentLabel(etiqueta) {
      const labelDiv = document.createElement('div');
      labelDiv.classList.add('vjs-ajuste-etiqueta');
      labelDiv.textContent = etiqueta;
      document.querySelector('.video-js').appendChild(labelDiv);
  
      establecerTiempo de espera(() => {
          etiquetaDiv.eliminar();
      }, 1500); // Mostrar por 1,5 segundos
  }
  
  // Lógica para cambiar los ajustes
  screenAdjustButton.addEventListener('clic', () => {
      si (!jugador.isFullscreen()) {
          console.log("El control de ajuste es funcional solo en pantalla completa.");
          devolver;
      }
  
      currentAdjustmentIndex = (currentAdjustmentIndex + 1) % ajustes.longitud;
      var selectedAdjustment = ajustes[índiceDeAjusteActual];
  
      var videoElement = player.el().querySelector('vídeo');
      var videoContainer = player.el();
  
      interruptor (ajuste seleccionado) {
          caso 'cubierta':
              videoElement.style.objectFit = 'portada';
              romper;
          caso 'rellenar':
              videoElement.style.objectFit = 'relleno';
              romper;
          caso 'fit-height':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.height = '100%';
              videoElement.style.width = 'automático';
              romper;
          caso 'ancho de ajuste':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.width = '100%';
              videoElement.style.height = 'auto';
              romper;
          caso 'scaledown':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.width = 'automático';
              videoElement.style.height = 'auto';
              videoContainer.style.display = 'flex';
              videoContainer.style.justifyContent = 'centro';
              videoContainer.style.alignItems = 'centro';
              romper;
          caso 'contiene':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.width = '100%';
              videoElement.style.height = '100%';
              romper;
      }
  
      // Mostrar el nombre del ajuste
      showAdjustmentLabel(ajuste seleccionado);
  });
  
  // Crear el botón de regreso con chevron
  var backButton = document.createElement('a');
  backButton.classList.add('boton-personalizado-vjs', 'boton-atrás-vjs');
  botón_atrás.innerHTML = '<span class="material-icons">chevron_left</span>';
  
  // Agregar funcionalidad al botón
  backButton.addEventListener('clic', función () {
      // Pausar el video
      jugador.pause();
  
      // Salir del modo pantalla completa si está activado
      si (jugador.isFullscreen()) {
          jugador.exitFullscreen();
      }
  
      // Ocultar o cerrar el reproductor (opcional, dependiendo de cómo esté configurado tu reproductor)
      var playerContainer = document.getElementById('jugador');
      si (contenedorJugador) {
          playerContainer.style.display = 'ninguno'; // Ocultar el reproductor
      }
  
      // Restablecer orientación al salir
      si (pantalla.orientación && pantalla.orientación.desbloqueo) {
          pantalla.orientacion.desbloquear();
      }
  });
  
  customControls.appendChild(botonAtrás);
  
  // Controles de Buscar y Reproducir/Pausa
  var seekBackButton = document.createElement('botón');
  El botón de búsqueda posterior se llama botón personalizado y se llama botón de búsqueda posterior.
  seekBackButton.innerHTML = '<span class="material-icons">replay_10</span>';
  topControls.appendChild(seekBackButton);
  
  var playPauseButton = document.createElement('botón');
  playPauseButton.classList.add('vjs-boton-personalizado', 'vjs-play-pause');
  playPauseButton.innerHTML = '<span class="material-icons">pause</span>'; // Mostrar pausa inicialmente
  topControls.appendChild(botonReproducirPausa);
  
  var seekForwardButton = document.createElement('botón');
  seekForwardButton.classList.add('vjs-boton-personalizado', 'vjs-seek-forward');
  seekForwardButton.innerHTML = '<span class="material-icons">adelante_10</span>';
  topControls.appendChild(seekForwardButton);
  
  customControls.appendChild(topControls);
  
  // Controles de Reiniciar y Next (debajo de los controles anteriores)
  var bottomControls = document.createElement('div');
  bottomControls.classList.add('vjs-bottom-controls');
  
  var restartButton = document.createElement('botón');
  boton-reinicio.classList.add('vjs-custom-button', 'vjs-restart');
  restartButton.innerHTML = '<span class="material-icons">skip_previous</span> Reiniciar';
  bottomControls.appendChild(botonReinicio);
  
  controlespersonalizados.appendChild(controlesinferiores);
  
  // Agregar los controles al reproductor
  jugador.el().appendChild(customControls);
  
  // Lógica de visibilidad de controles
  deje que hideControlsTimeout;
  
  función showControls() {
      jugador.controlBar.el().style.opacity = '1';
      customControls.style.opacity = '1';
      borrarTimeout(ocultarTimeoutControls);
  }
  
  función hideControls() {
      si (!jugador.pausado()) {
          jugador.controlBar.el().style.opacity = '0';
          controles personalizados.estilo.opacidad = '0';
      }
  }
  
  
  función isMobileDevice() {
      devolver /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
  
  jugador.el().addEventListener(isMobileDevice() ? 'touchstart' : 'mousemove', () => {
      mostrarControles();
      hideControlsTimeout = setTimeout(hideControls, 5000); // Ocultar controles después de 2 segundos
  });
  
  jugador.on('pausa', () => {
      mostrarControles();
      borrarTimeout(ocultarTimeoutControls);
  });
  
  jugador.on('jugar', () => {
      playPauseButton.innerHTML = '<span class="material-icons">pausa</span>';
      hideControlsTimeout = setTimeout(hideControls, 2000); // Ocultar controles después de 2 segundos
  });
  
  jugador.on('pausa', () => {
      playPauseButton.innerHTML = '<span class="material-icons">flecha_de_reproducción</span>';
  });
  
  // Botones personalizados
  seekBackButton.addEventListener('clic', función () {
      var currentTime = jugador.currentTime();
      jugador.tiempoActual(Math.max(0, TiempoActual - 10));
  });
  
  playPauseButton.addEventListener('clic', función () {
      si (jugador.pausado()) {
          jugador.jugar();
          playPauseButton.innerHTML = '<span class="material-icons">pausa</span>';
      } demás {
          jugador.pause();
          playPauseButton.innerHTML = '<span class="material-icons">flecha_de_reproducción</span>';
      }
  });
  
  seekForwardButton.addEventListener('clic', función () {
      var currentTime = jugador.currentTime();
      jugador.currentTime(currentTime + 10);
  });
  
  restartButton.addEventListener('clic', función () {
      jugador.currentTime(0); // Reiniciar el vídeo
      jugador.play(); // Reproducir desde el principio
  });
  
  
  
  
  // Comportamiento de pantalla completa y pausa
  jugador.on('jugar', () => {
      si (!jugador.isFullscreen()) {
          jugador.requestFullscreen();
      }
  });
  
  jugador.on('cambio de pantalla completa', () => {
      si (!jugador.isFullscreen()) {
          jugador.pause();
      }
  });
  
  // Restringir reproducción/pausa a controles personalizados
  jugador.el().addEventListener('clic', (e) => {
      si (!isMobileDevice()) {
          e.stopPropagation();
      }
  });
  
  var estilo = document.createElement('estilo');
  estilo.innerHTML = `
      /* Contenedores de los controles personalizados */
      .controles personalizados de vjs {
          pantalla:flexible;
          flexión-dirección: columna;
          justificar-contenido: centro;
          alinear-elementos: centro;
          posición: absoluta;
          abajo: 10px; /* Mantener los controles Seek/Play en su lugar */
          ancho: 100%;
          índice z: 10;
      }
  
      /* Contenedor de los controles Seek y Play (en el centro de la pantalla) */
      .vjs-top-controls {
          pantalla:flexible;
          justificar-contenido: centro;
          alinear-elementos: centro;
          margen inferior: 10px; /* Espacio entre los controles Seek/Play y los controles de Reiniciar/Next */
          espacio: 30px; /* Añadir separación entre los controles Seek y Play */
      }
  
      /* Estilos para los botones de Buscar y Reproducir/Pausa (más grandes) */
      .vjs-controles-superiores .vjs-botón-personalizado {
          color de fondo: rgba(0, 0, 0, 0,);
          color: blanco;
          borde: ninguno;
          tamaño de fuente: 60px; /* Iconos más grandes */
          relleno: 20px; /* Botones más grandes */
          margen: 0 15px;
          radio del borde: 50%;
          cursor: puntero;
          transición: transformar 0,2 s;
      }
  
      .vjs-top-controls .vjs-custom-button:hover {
          transformar: escala (1.1); /* Efecto al pasar el mouse */
      }
  
      .vjs-top-controls .iconos-de-material {
          tamaño de fuente: 60px; /* Iconos más grandes */
      }
  
      /* Contenedor de los controles de Reiniciar y Next (debajo de los Seek/Play) */
      .vjs-controles-inferiores {
          pantalla:flexible;
          justificar-contenido: centro;
          alinear-elementos: centro;
          posición: absoluta;
          abajo: -90px; /* Mover los controles Reiniciar/Next hacia abajo */
          ancho: 100%;
          espacio: 50px; /* Añadir separación entre los controles Reiniciar y Next */
      }
  
      /* Estilos para los botones de Reiniciar y Next (más pequeños) */
      .vjs-controles-inferiores .vjs-botón-personalizado {
          color de fondo: rgba(0, 0, 0, 0,);
          color: blanco;
          borde: ninguno;
          tamaño de fuente: 10px; /* Iconos más pequeños */
          relleno: 8px; /* Botones más pequeños */
          margen: 0 10px;
          radio del borde: 50%;
          cursor: puntero;
          transición: transformar 0,2 s;
      }
  
      .vjs-botton-personalizado-boton:hover {
          transformar: escala (1.1); /* Efecto al pasar el mouse */
      }
  
      .vjs-controles-inferiores .iconos-de-material {
          tamaño de fuente: 20px; /* Iconos más pequeños */
      }
  
      /* Texto pequeño al lado de los iconos */
      .vjs-reinicio, .vjs-siguiente {
          tamaño de fuente: 10px; /* Texto más pequeño */
          margen izquierdo: 8px; /* Separación del texto respecto al icono */
      }
  
      /* Estilo del título */
      .título vjs {
          posición: absoluta;
          arriba: 10px;
          izquierda: 50%;
          transformar: translateX(-50%);
          tamaño de fuente: 24px;
          color: blanco;
          peso de fuente: negrita;
          sombra de texto: 2px 2px 4px rgba(0, 0, 0, 0.7);
          índice z: 9999;
      }
  `;
  documento.head.appendChild(estilo);
  
  
  // Gestión de favoritos
  const favoritoBtn = document.getElementById('favoritoBtn');
  const favoritoText = document.getElementById('favoritoText');
  const favoritoEnlace = document.getElementById('favoritoEnlace');
  const imagen = document.getElementById('favoritoImagen'); // Asegúrate de que haya una imagen con id "favoritoImagen"
  const nombre = document.getElementById('nombrePelicula').textContent; // Nombre de la película
  const identificador = favoritoBtn.getAttribute('identificador-datos');
  
  // Notificación flotante
  const favoritoNotification = document.getElementById('favoritoNotification');
  const notificationText = document.getElementById('notificationText');
  const notificaciónIcono = document.getElementById('notificaciónIcono');
  
  // Función para alternar el estado de favorito
  función alternarFavorito() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const encontrado = favoritos.some(favorito => favorito.identificador === identificador);
  
    si (encontrado) {
      // Eliminar favoritos
      const nuevosFavoritos = favoritos.filter(favorito => favorito.identificador !== identificador);
      favoritoBtn.innerHTML = '<i class="material-icons nav__icon">añadir</i>'; // Icono de "añadir a favoritos"
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      mostrarNotificacion('Eliminado de Favoritos', 'check_circle'); // Mostrar notificación con ícono de círculo de verificación
    } demás {
      // Agregar a favoritos
      favoritos.push({
        identificador: identificador,
        imagen: imagen.outerHTML,
        enlace: favoritoEnlace.href,
        nombre: nombre,
      });
      favoritoBtn.innerHTML = '<i class="material-icons nav__icon">comprobar</i>'; // Icono de "favorito añadido"
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      mostrarNotificacion('Añadido a Favoritos', 'check_circle'); // Mostrar notificación con el ícono de check-circle
    }
  }
  
  // Comprobar estado inicial de favoritos (sin cambiar el texto)
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const encontradoInicial = favoritos.some(favorito => favorito.identificador === identificador);
  
  si (encontradoInicial) {
    favoritoBtn.innerHTML = '<i class="material-icons nav__icon">comprobar</i>'; // El icono de "añadido a favoritos"
  } demás {
    favoritoBtn.innerHTML = '<i class="material-icons nav__icon">añadir</i>'; // El icono de "añadir a favoritos"
  }
  
  // Mantener constante el texto de "Favoritos"
  favoritoText.textContent = 'Favoritos'; // Este texto no cambia
  
  // Función para mostrar notificaciones (con la animación y el icono)
  function mostrarNotificacion(mensaje, icono) {
    // Actualizar texto y el icono de la notificación
    notificacionTexto.textContenido = mensaje;
    notificaciónIcon.textContent = icono;
  
    // Mostrar la notificación
    favoritoNotification.classList.add('mostrar');
  
    // Ocultar la notificación después de 3 segundos
    setTimeout(función() {
      favoritoNotification.classList.remove('mostrar');
    }, 3000);
  }
  
  
  // Gestión de imágenes de perfil
  const footerProfileIcon = document.getElementById("footerIconImg");
  const imagenPerfil = document.getElementById("imagenPerfil");
  const perfilPageImage = document.getElementById("perfilPageImage");
  
  const defaultProfileIcon = document.getElementById("defaultProfileIcon"); // Icono de perfil en el pie de página
  const defaultProfileIconAlt = document.getElementById("defaultProfileIconAlt"); // Icono de perfil alternativo
  
  // Función para cambiar todas las imágenes de perfil
  función updateProfileImage(src) {
    perfilImagen.src = src;
    perfilPageImage.src = src;
    pie de páginaIconoPerfil.src = src;
    defaultProfileIcon.style.display = 'ninguno'; // Ocultar el icono de perfil
    defaultProfileIconAlt.style.display = 'ninguno'; // Ocultar el icono alternativo
    localStorage.setItem('profileImage', src); // Guardar la imagen en el almacenamiento local
  }
  
  // Restaurar la imagen de perfil guardada al cargar la página
  ventana.addEventListener('cargar', función () {
    const storedProfileImage = localStorage.getItem('imagenDePerfil');
    si (imagenPerfilAlmacenada) {
      footerProfileIcon.src = imagenPerfilAlmacenada;
      perfilImagen.src = imagenPerfilAlmacenada;
      perfilPageImage.src = imagenPerfilAlmacenada;
      defaultProfileIcon.style.display = 'ninguno'; // Ocultar el icono de perfil
      defaultProfileIconAlt.style.display = 'ninguno'; // Ocultar el icono alternativo
    }
  });

// Crear contenedor para los controles personalizados
var customControls = document.createElement('div');
customControls.classList.add('vjs-custom-controls');

var topControls = document.createElement('div');
topControls.classList.add('vjs-top-controls');

// Aquí puedes añadir más lógica para configurar los controles personalizados

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

// Botón de Cast
var castButton = document.createElement('button');
castButton.classList.add('vjs-custom-button', 'vjs-cast');
castButton.innerHTML = '<span class="material-icons" style="font-size: 30px;">cast</span>'; // Reducir el tamaño del ícono
castButton.style.position = 'absolute'; // Posicionar en la parte superior derecha
castButton.style.top = '-90px';
castButton.style.right = '10px';
castButton.style.padding = '5px'; // Reducir el espacio interno del botón
castButton.style.borderRadius = '50%'; // Hacerlo circular si deseas
topControls.appendChild(castButton);

customControls.appendChild(topControls);

// Controles de Reiniciar y Next (debajo de los controles anteriores)
var bottomControls = document.createElement('div');
bottomControls.classList.add('vjs-bottom-controls');

var restartButton = document.createElement('button');
restartButton.classList.add('vjs-custom-button', 'vjs-restart');
restartButton.innerHTML = '<span class="material-icons">skip_previous</span> Reiniciar';
bottomControls.appendChild(restartButton);

customControls.appendChild(bottomControls);

// Agregar los controles personalizados al reproductor
player.el().appendChild(customControls);

// Función para manejar la transmisión con Web Video Caster
function transmitWithWebVideoCaster() {
    // Obtener la URL del video en reproducción desde el reproductor
    var videoUrl = player.currentSrc(); // Enlace del video actualmente en reproducción

    if (!videoUrl) {
        alert('No se puede obtener el enlace del video actual.');
        return;
    }

    // Crear el enlace seguro con el esquema de Web Video Caster
    var secureURL = encodeURIComponent(videoUrl) + "&secure_uri=true";
    var wvcUrl = `wvc-x-callback://open?url=${secureURL}`;

    // Redirigir al enlace generado
    window.location.href = wvcUrl;

    // Si no funciona, redirigir al usuario al mercado para descargar Web Video Caster
    setTimeout(function() {
        window.location.href = "market://launch?id=com.instantbits.cast.webvideo";
    }, ); // Esperar 1 segundo antes de redirigir al mercado

    // Intentar abrir la aplicación Web Video Caster
    var timeout = setTimeout(function () {
        // Si no se pudo abrir la app, redirigir al usuario a la tienda de aplicaciones
        var isAndroid = /android/i.test(navigator.userAgent);
        var isIOS = /iphone|ipod|ipad/i.test(navigator.userAgent);

        if (isAndroid) {
            // Redirigir a Google Play Store (Android)
            window.location.href = 'market://launch?id=com.instantbits.cast.webvideo';
        } else if (isIOS) {
            // Redirigir a la App Store (iOS)
            window.location.href = 'https://apps.apple.com/us/app/web-video-caster/id1047520391';
        }
    }, ); // Esperar 2 segundos para ver si se puede abrir la app

    // Limpiar el tiempo de espera si la app se abre
    clearTimeout(timeout);
}

// Asociar el evento de clic al botón de "Cast"
castButton.addEventListener('click', transmitWithWebVideoCaster);


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
    var playerContainer = document.getElementById('player-container');

    if (!player.isFullscreen()) {
        player.pause(); // Pausa el video

        // Oculta completamente el contenedor del reproductor
        playerContainer.style.visibility = 'hidden';
        playerContainer.style.height = '0';
        playerContainer.style.display = 'none'; // Ocultar completamente
    }
});


// Restringir reproducción/pausa a controles personalizados
player.el().addEventListener('click', (e) => {
    if (!isMobileDevice()) {
        e.stopPropagation();
    }
});

  


  // Función para manejar el progreso del video
  function manageVideoProgress(player) {
    const videoKey = `videoProgress_${player.currentSrc()}`; // Clave única para el progreso basado en la URL del video

    // Restaurar el progreso guardado
    const savedTime = localStorage.getItem(videoKey);
    if (savedTime) {
      player.ready(() => {
        player.currentTime(parseFloat(savedTime));
      });
    }

    // Guardar el progreso cada vez que cambie el tiempo de reproducción
    player.on("timeupdate", () => {
      const currentTime = player.currentTime();
      localStorage.setItem(videoKey, currentTime);
    });

    // Limpiar el progreso al finalizar el video
    player.on("ended", () => {
      localStorage.removeItem(videoKey);
    });
  }

  // Inicializar la función para manejar el progreso del video
  manageVideoProgress(player);

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
  
      currentAdjustmentIndex = (currentAdjustmentIndex + 1) % ajustes.longitud;
      var selectedAdjustment = ajustes[índiceDeAjusteActual];
  
      var videoElement = player.el().querySelector('vídeo');
      var videoContainer = player.el();
  
      interruptor (ajuste seleccionado) {
          caso 'cubierta':
              videoElement.style.objectFit = 'portada';
              romper;
          caso 'rellenar':
              videoElement.style.objectFit = 'relleno';
              romper;
          caso 'fit-height':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.height = '100%';
              videoElement.style.width = 'automático';
              romper;
          caso 'ancho de ajuste':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.width = '100%';
              videoElement.style.height = 'auto';
              romper;
          caso 'scaledown':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.width = 'automático';
              videoElement.style.height = 'auto';
              videoContainer.style.display = 'flex';
              videoContainer.style.justifyContent = 'centro';
              videoContainer.style.alignItems = 'centro';
              romper;
          caso 'contiene':
              videoElement.style.objectFit = 'contiene';
              videoElement.style.width = '100%';
              videoElement.style.height = '100%';
              romper;
      }
  
      // Mostrar el nombre del ajuste
      showAdjustmentLabel(ajuste seleccionado);
  });
  
