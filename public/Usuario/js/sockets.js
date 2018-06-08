
var numero = 0;

$(document).ready(function () {

    $('.num').click(function () {
        var num = $(this);
        var text = $.trim(num.find('.txt').clone().children().remove().end().text());
        var telNumber = $('#telNumber');

        if(text === "<"){
            var texto = telNumber.val();
            $(telNumber).val(texto.substring(0, texto.length-1));
        }
        else {
            $(telNumber).val(telNumber.val() + text);
        }
        numero = parseInt(telNumber.val());
    });

});

var socket = io.connect(HOME_URL, {'forceNew': true});
var id_juego;
var userID;
var player_num;


var url = new URL(document.URL)
var mi_id = url.searchParams.get("id");

if(mi_id !== null){
	comprobar_num(mi_id);
}

function goToComprobar_num(e){

    window.location.href = HOME_URL+'/usuario.html?id='+numero;
    return false
}

function comprobar_num(e){

	if(mi_id === null)
		id_juego = document.getElementById("numero").value;
	else
		id_juego = mi_id;

	socket.emit("comprueba", id_juego);

	return false;
}

function empezar(){

	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

	if(!isSafari){
		var doc = window.document;
		var docEl = doc.documentElement;

		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		}
		else {
			cancelFullScreen.call(doc);
		}
	}
	
	textPlayer.text = "Player " + player_num;

	document.getElementById("bienvenido_usuario").style.display = 'none';
	document.getElementById("game").style.display = 'block';
}

function press(key){
	var array = {key: key, id_juego: id_juego, userID: userID};
	console.log(id_juego);
	socket.emit('press_key', array);
}

socket.on("checked", function (id, num){

	if(id >= 0){
		userID = id;
		player_num = num;

		document.getElementById("form_num").style.display = 'none';
		document.getElementById("bienvenido_usuario").style.display = 'block';
	}
	else{
		id_juego = 0;
		console.log("mal")
	}

});

socket.on("change_order", function (data){

	for (var i = 0; i < data.length; i++) {
		if(data[i] === userID){
			player_num = i+1;
			textPlayer.text = "Player " + player_num;
			i = data.length;
		}
	}

});

socket.on("refresh_user", function (){

	window.location.replace(HOME_URL+"/usuario.html");

});