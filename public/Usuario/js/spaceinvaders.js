
var id_juego;
var play, shoot, left, right;

function press(key){
	var array = [key, id_juego]
	console.log(key);
	socket.emit('press_key', array);
}


function ini_spaceinvaders(){

	play = document.getElementById("btn_play");
	shoot = document.getElementById("btn_shoot");
	left = document.getElementById("btn_left");
	right = document.getElementById("btn_right");

	socket_spaceinvaders();

	window.addEventListener('resize', function() {
		resize();
	});

	resize();
}

function resize(){
	if(play.style.display === 'none'){
		if($(window).width() >= $(window).height()){
			if(shoot.classList.contains('three_btn_v')){
				shoot.classList.remove('three_btn_v');
				left.classList.remove('three_btn_v');
				right.classList.remove('three_btn_v');
			}
			if(!shoot.classList.contains('three_btn_h')){
				shoot.classList.add('three_btn_h');
				left.classList.add('three_btn_h');
				right.classList.add('three_btn_h');
			}
		}
		else {
			if(shoot.classList.contains('three_btn_h')){
				shoot.classList.remove('three_btn_h');
				left.classList.remove('three_btn_h');
				right.classList.remove('three_btn_h');
			}
			if(!shoot.classList.contains('three_btn_v')){
				shoot.classList.add('three_btn_v');
				left.classList.add('three_btn_v');
				right.classList.add('three_btn_v');
			}
		}
	}
	else {
		if($(window).width() >= $(window).height()){
			if(play.classList.contains('one_btn_v')){
				play.classList.remove('one_btn_v');
			}
			if(!play.classList.contains('one_btn_h')){
				play.classList.add('one_btn_h');
			}
		}
		else {
			if(play.classList.contains('one_btn_h')){
				play.classList.remove('one_btn_h');
			}
			if(!play.classList.contains('one_btn_v')){
				play.classList.add('one_btn_v');
			}
		}
	}
}


function socket_spaceinvaders(){

	socket.on("checked", function (correcto){

		if(correcto){
			document.getElementById("form_num").style.display = 'none';

			play.style.display = 'block';
			play.addEventListener("touchstart", function(){
				play.style.backgroundImage = "url(Usuario/assets/play_press.png)";
			}, false);
			play.addEventListener("touchend", function(){
				press("play");
				play.style.display = 'none';
				shoot.style.display = 'block';
				left.style.display = 'block';
				right.style.display = 'block';
				resize();
			}, false);

			shoot.addEventListener("touchstart", function(){
				shoot.style.backgroundImage = "url(Usuario/assets/shoot_press.png)";
				press("shoot");
			}, false);

			shoot.addEventListener("touchend", function(){
				shoot.style.backgroundImage = "url(Usuario/assets/shoot.png)";
			}, false);

			left.addEventListener("touchstart", function(){
				left.style.backgroundImage = "url(Usuario/assets/left_press.png)";
				press("left_down");
			}, false);
			left.addEventListener("touchend", function(){
				left.style.backgroundImage = "url(Usuario/assets/left.png)";
				press("left_up");
			}, false);

			right.addEventListener("touchstart", function(){
				right.style.backgroundImage = "url(Usuario/assets/right_press.png)";
				press("right_down");
			}, false);
			right.addEventListener("touchend", function(){
				right.style.backgroundImage = "url(Usuario/assets/right.png)";
				press("right_up");
			}, false);

		}
		else{
			id_juego = 0;
		}

	});
}