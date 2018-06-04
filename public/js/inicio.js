var socket = io.connect(HOME_URL, {'forceNew': true});

var id_juego;
var url = "";

window.onload = function(){
	url = new URL(document.URL)
    if(url.searchParams.get("mode") === "hybrid"){
		document.getElementById("inicio").style.display = "block";
		document.getElementById("QR").style.display = "block";
		document.getElementById("menu").style.display = "none";
	}
	else{
		document.getElementById("inicio").style.display = "none";
		document.getElementById("QR").style.display = "none";
		document.getElementById("QR2").style.display = "none";
		document.getElementById("menu").style.display = "block";
	}
}

socket.on('ID', function(id){
	id_juego = id;
	document.getElementById("rand_num").innerHTML = id_juego;
	makeCode();
});

socket.on("conectado", function(){

    url = new URL(document.URL)
    if(url.searchParams.get("id")){
	    id_juego = url.searchParams.get("id");
	    socket.emit("recibida_conn", url.searchParams.get("id"));
	    makeCode();
	    mostrar_menu();
	}

});

socket.on('press', function(data){

	/*
	data {
		ids_users: [1,2,65],
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

socket.on('checked_id', function(pos){
	mostrar_menu(pos);
});

function mostrar_menu(pos){

	if(juego_seleccionado === undefined){
		document.getElementById("inicio").style.display = "none";
		document.getElementById("QR").style.display = "none";
		document.getElementById("menu").style.display = "block";

		juego_seleccionado = 0;

		juegos[0] = "spaceinvaders";
		juegos[1] = "pong";
		juegos[2] = "tetris";

		document.getElementById(juegos[juego_seleccionado]+'Logo').style.width = "170px";
		document.getElementById(juegos[juego_seleccionado]+'Logo').style.height = "170px";
		document.getElementById(juegos[juego_seleccionado]+'Logo').style.border = "thick solid #28ff48";

	}
	else {

	    var newItem = document.createElement("TD");
	    pos++;
	    newItem.id = 'p_'+pos;
	    var textnode = document.createTextNode("Player " + pos);
	    newItem.appendChild(textnode);

	    var list = document.getElementById("players_connected");
	    list.appendChild(newItem);
	}
}

socket.on('delete_last', function(pos){
	console.log(pos);
	pos++;
	var parent = document.getElementById("players_connected");
	var child = document.getElementById("p_"+pos);
	parent.removeChild(child);
});

var qrcode = new QRCode(document.getElementById("QR"), {
	width : 100,
	height : 100
});

var qrcode2 = new QRCode(document.getElementById("QR2"), {
	width : 100,
	height : 100
});

function makeCode () {
	qrcode.makeCode(HOME_URL+"/usuario.html?id="+id_juego);
	qrcode2.makeCode(HOME_URL+"/usuario.html?id="+id_juego);
}

socket.on('refresh_page', function(){
	window.location.replace(HOME_URL+"/catalogue.html");
});

