var socket = io.connect('http://charleslp.info:4000', {'forceNew': true});

var id_juego;


socket.on('ID', function(id){
	id_juego = id;
	document.getElementById("rand_num").innerHTML = id_juego;
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
	console.log(data.userdata.key)
	if(data.userdata.userID === data.ids_users[0]){
		switch(data.userdata.key){
			case "A_on": {
				window.location.href = '/spaceinvaders.html?id=' + id_juego;
				break;
			}
			case "B_on": {
				window.location.href = '/pong.html?id=' + id_juego;
				break;
			}
		}
	}

});
