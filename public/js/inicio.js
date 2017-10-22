var socket = io.connect('http://charleslp.info:4001', {'forceNew': true});

var id_juego;
var url = "";

socket.on('ID', function(id){
	id_juego = id;
	document.getElementById("rand_num").innerHTML = id_juego;
});

socket.on("conectado", function(){

    url = new URL(document.URL)
    if(url.searchParams.get("id")){
	    id_juego = url.searchParams.get("id");
	    socket.emit("recibida_conn", url.searchParams.get("id"));
	    mostrar_menu();
	}

});

socket.on('press', function(data){

	/*
	data {
		ids_users: [],
		userdata: {
			id_juego: "0000",
			key: "up_on",
			userID: 1
		}
	}
	*/
	if(data.userdata.userID === data.ids_users[0]){
		switch(data.userdata.key){
			case "A_on": {
				window.location.href = '/'+juegos[juego_seleccionado]+'.html?id=' + id_juego;
				break;
			}
			case "right_off": {
				if(juego_seleccionado < juegos.length-1){
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.width = "150px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.height = "150px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.border = "0px";
					juego_seleccionado++;
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.width = "170px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.height = "170px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.border = "thick solid #28ff48";
				}
				break;
			}
			case "left_off": {
				if(juego_seleccionado > 0){
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.width = "150px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.height = "150px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.border = "0px";
					juego_seleccionado--;
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.width = "170px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.height = "170px";
					document.getElementById(juegos[juego_seleccionado]+'Logo').style.border = "thick solid #28ff48";
				}
				break;
			}
		}
	}

});

var juegos = [];
var juego_seleccionado;

socket.on('checked_id', function(){
	mostrar_menu();
});

function mostrar_menu(){

	document.getElementById("inicio").style.display = "none";
	document.getElementById("menu").style.display = "block";

	juego_seleccionado = 0;

	juegos[0] = "spaceinvaders";
	juegos[1] = "pong";

	document.getElementById(juegos[juego_seleccionado]+'Logo').style.width = "170px";
	document.getElementById(juegos[juego_seleccionado]+'Logo').style.height = "170px";
	document.getElementById(juegos[juego_seleccionado]+'Logo').style.border = "thick solid #28ff48";
}

