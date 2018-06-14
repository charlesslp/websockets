
var socket = io.connect(HOME_URL, {'forceNew': true});

var id_juego;
var url = "";

socket.on('ID', function(id){
	id_juego = id;
	document.getElementById("rand_num").innerHTML = id_juego;
	document.getElementById("rand_num2").innerHTML = id_juego;
	makeCode();
});

socket.on("conectado", function(){

    url = new URL(document.URL)
    if(url.searchParams.get("id")){
	    id_juego = url.searchParams.get("id");
	    socket.emit("recibida_conn", url.searchParams.get("id"));
		document.getElementById("rand_num").innerHTML = id_juego;
		document.getElementById("rand_num2").innerHTML = id_juego;
	    makeCode();
	    mostrar_menu();
	}

});

socket.on("num_usuarios_partida", function(numUsers){

	for (var i = 2; i <= numUsers; i++) {
		
		var myHeader = document.getElementById("player_list");
		myHeader.innerHTML += '<h5 id="p_'+i+'" class="player">Player '+i+'</h5>';
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
				window.location.href = juegos[juego_seleccionado].url+'?id=' + id_juego + '&mode=exposition';
				break;
			}
			case "right_off": {
				if(juego_seleccionado < juegos.length-1){
					juego_seleccionado++;
					handleFlip(juegos[juego_seleccionado].id);
				}
				break;
			}
			case "left_off": {
				if(juego_seleccionado > 0){
					juego_seleccionado--;
					handleFlip(juegos[juego_seleccionado].id);
				}
				break;
			}
			case "up_off": {
				var jump = getJump();
				if(juego_seleccionado-jump >= 0){
					juego_seleccionado -= jump;
					handleFlip(juegos[juego_seleccionado].id);
				}
				break;
			}
			case "down_off": {
				var jump = getJump();
				if(juego_seleccionado+jump <= juegos.length-1){
					juego_seleccionado += jump;
					handleFlip(juegos[juego_seleccionado].id);
				}
				break;
			}
		}
	}

});

function getJump(){
	var w = window.innerWidth;

    if (w < 910) {
        return 1;
    } else if (w < 1180) {
        return 2;
    } else if (w < 1200) {
        return 3;
    } else {
        return 3;
    }
}

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

	}
	else {

	    pos++;
		var myHeader = document.getElementById("player_list");
		myHeader.innerHTML += '<h5 id="p_'+pos+'" class="player">Player '+pos+'</h5>';
	}
}

socket.on('delete_last', function(pos){
	console.log(pos);
	pos++;
	var parent = document.getElementById("player_list");
	var child = document.getElementById("p_"+pos);
	parent.removeChild(child);
});

var qrcode = new QRCode(document.getElementById("QR"), {
	width : 150,
	height : 150
});

var qrcode2 = new QRCode(document.getElementById("QR2"), {
	width : 150,
	height : 150
});

function makeCode () {
	qrcode.makeCode(HOME_URL+"/usuario.html?id="+id_juego);
	qrcode2.makeCode(HOME_URL+"/usuario.html?id="+id_juego);
}

socket.on('refresh_page', function(){
	window.location.replace(HOME_URL+"/catalogue.html");
});



function handleFlip(id_selected){

	var element = document.getElementById(id_selected);

	var offset = 100;

	if(getJump() === 1 && element.dataset.index === "0"){
        offset = 450;
    }
    else if(getJump() === 2 && (element.dataset.index === "0" || element.dataset.index === "1")){
        offset = 450;
    }
    else if(getJump() === 3 && (element.dataset.index === "0" || element.dataset.index === "1" || element.dataset.index === "2")){
        offset = 450;
    }

    $('html, body').stop();
    
	$('html, body').animate({
        scrollTop: $('#'+id_selected).offset().top - offset
    }, 1000);

	element.classList.toggle('selected');
	element.classList.toggle('unflip');

	var elementsHover = document.getElementsByClassName("selected");

	for (var i = 0; i < elementsHover.length; i++) {
		var myElement = elementsHover[i];
		if(myElement !== element){
			myElement.classList.toggle('selected');
			myElement.classList.toggle('unflip');
		}
	}
}

window.onload = function(){

	var main = document.getElementById("main");

	$.getJSON( "./conf/games.json", function( data ) {

		data.map(function(item, index){
            if(item.exposition_allow){
                var selected = juegos.length === 0 ? "selected":"unflip";
                juegos.push(item);
                main.innerHTML += ''
                +'<div class="col-12 col-xs-12 my-md col-md-4 col-lg-4 no-padding">'
                    +'<div id="'+item.id+'" class="image-flip '+selected+'" data-index="'+index+'">'
                        +'<div class="mainflip no-padding">'

                            +'<div class="frontside">'
                                +'<div class="card">'
                                    +'<div class="card-body text-center no-padding">'
                                        +'<p><img class="" src="'+item.logo+'" alt="card image"></p>'
                                        +'<p class="card-title h4">'+item.title+'</p>'
                                        +'<p class="card-text">'+item.short_desc+'</p>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'

                            +'<div class="backside">'
                                +'<div class="card">'
                                    +'<div class="card-body text-center no-padding">'
                                        +'<img class="" src="'+item.info_img+'" alt="card image">'
                                        +'<p class="card-text">'+item.long_desc+'</p>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'

                        +'</div>'
                    +'</div>'
                +'</div>';
            }
		});
	});

}