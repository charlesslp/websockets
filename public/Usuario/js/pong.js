var play, up, down;

function press(key){
	var array = {key: key, id_juego: id_juego, userID: userID};
	console.log(key);
	socket.emit('press_key', array);
}


function ini_pong(){

	play = document.getElementById("btn_play_PG");
	up = document.getElementById("btn_up_PG");
	down = document.getElementById("btn_down_PG");

	socket_pong();

	window.addEventListener('resize', function() {
		resize_pong();
	});

	resize_pong();
}

function resize_pong(){
	if(play.style.display === 'none'){
		if($(window).width() >= $(window).height()){
			if(up.classList.contains('two_btn_v')){
				up.classList.remove('two_btn_v');
				down.classList.remove('two_btn_v');
			}
			if(!up.classList.contains('two_btn_h')){
				up.classList.add('two_btn_h');
				down.classList.add('two_btn_h');
			}
		}
		else {
			if(up.classList.contains('two_btn_h')){
				up.classList.remove('two_btn_h');
				down.classList.remove('two_btn_h');
			}
			if(!up.classList.contains('two_btn_v')){
				up.classList.add('two_btn_v');
				down.classList.add('two_btn_v');
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


function socket_pong(){

	//socket.on("checked", function (correcto){

		//if(correcto){
			document.getElementById("form_num").style.display = 'none';

			play.style.display = 'block';
			play.addEventListener("touchstart", function(){
				play.style.backgroundImage = "url(Usuario/assets/play_press.png)";
			}, false);
			play.addEventListener("touchend", function(){
				press("play_PG");
				play.style.display = 'none';
				up.style.display = 'block';
				down.style.display = 'block';
				resize_pong();
			}, false);

			up.addEventListener("touchstart", function(){
				up.style.backgroundImage = "url(Usuario/assets/left_press.png)";
				press("up_down_PG");
			}, false);
			up.addEventListener("touchend", function(){
				up.style.backgroundImage = "url(Usuario/assets/left.png)";
				press("up_up_PG");
			}, false);

			down.addEventListener("touchstart", function(){
				down.style.backgroundImage = "url(Usuario/assets/right_press.png)";
				press("down_down_PG");
			}, false);
			down.addEventListener("touchend", function(){
				down.style.backgroundImage = "url(Usuario/assets/right.png)";
				press("down_up_PG");
			}, false);

		/*}
		else{
			id_juego = 0;
		}

	});*/
}