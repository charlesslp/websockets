
var socket = io.connect('http://charleslp.info:4000', {'forceNew': true});


var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "gamepad");


var btn_left, btn_right;

function press(key){
	var array = [key, id_juego]
	console.log(key);
	socket.emit('press_key', array);
}

var id_juego;

function comprobar_num(e){

	id_juego = document.getElementById("numero").value;

	socket.emit("comprueba", id_juego);

	return false;
}

socket.on("checked", function (correcto){

	if(correcto){
		document.getElementById("form_num").style.display = 'none';
		document.getElementById("div_btns").style.display = 'block';

		btn_left = document.getElementById("btn_left");

		btn_left.addEventListener("touchstart", function(){
		    press("left_down");
		});

		btn_left.addEventListener("touchend", function(){
		    press("left_up");
		});


		btn_right = document.getElementById("btn_right");

		btn_right.addEventListener("touchstart", function(){
		    press("right_down");
		});

		btn_right.addEventListener("touchend", function(){
		    press("right_up");
		});
	}
	else{
		id_juego = 0;
	}

});