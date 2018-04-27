
function gameDescription(gameName){

	switch(gameName){
		case "spaceinvaders": return "El mítico juego de plataformas que provocó en Japón una crisis por falta de monedas."; break;
		case "pong": return "Uno de los primeros juegos de la historia. Disponible para 2 jugadores."; break;
		case "tetris": return "De los más grandes juegos jamás creados por Nintendo, una compañía que a día de hoy nos sigue impresionando cada año."; break;
		default: return "Bienvenido al museo del videojuego. Para empezar, selecciona el juego que quieras jugar y disfruta."
	}

}


function gameImage(gameName){
	
	switch(gameName){
		case "spaceinvaders": return "./assets/imagenes/spaceInvadersLogo.png"; break;
		case "pong": return "./assets/imagenes/pongLogo.png"; break;
		case "tetris": return "./assets/imagenes/tetrisLogo.png"; break;
		default: return "./assets/imagenes/spaceinvadersLogo.png"; break;
	}

}


function gamePlay(gameName){
	
	switch(gameName){
		case "spaceinvaders": window.location.href = "/spaceinvaders.html"; break;
		case "pong": window.location.href = "/pong.html"; break;
		case "tetris": window.location.href = "/tetris.html"; break;
	}

}
