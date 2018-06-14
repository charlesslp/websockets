"use strict"

var path = require("path");
var express = require("express");

var fs = require("fs");

var app = express();



var caBundle = fs.readFileSync("../../carlosmp_com.ca-bundle");
var clavePrivada = fs.readFileSync("../../clave_carlosmp_com.key");
var certificado = fs.readFileSync("../../carlosmp_com.crt");



/*
var config = require("./public/config/configuration");

if(config.URL_CONFIG.protocol === "https") {

    var caBundle = fs.readFileSync(config.CERTIFICATE_PATH.caBundle);
    var clavePrivada = fs.readFileSync(config.CERTIFICATE_PATH.clavePrivada);
    var certificado = fs.readFileSync(config.CERTIFICATE_PATH.certificado);

    server = require("https").createServer({ca: caBundle, key: clavePrivada, cert: certificado}, app);
}
else {
    server = require("http").Server(app);
}
*/

var server = require("https").createServer({ ca: caBundle, key: clavePrivada, cert: certificado },app);
//var server = require("http").Server(app);

var io = require('socket.io')(server);


app.use(express.static("public"));


app.get("/", function(req, res){
	res.status(200).send("hello world");
});

app.get("/u", function(req, res){
	res.redirect("https://carlosmp.com:4001/usuario.html");
});

//----------------------------------------------------------------------------------------------------------


var sockets_juego = [];
var sockets_users = [];
var ids_users = [];
var nextUserID = 0;

var timesOutJuegos = [];

io.on('connection', function(socket){

	var rand;
	var id_juego = -1;
	var userID = -1;

	var esJuego = true;
	//var timeOut = setTimeout(function(){ refresh_page() }, 10000);


	do{
		rand = Math.floor((Math.random() * 8999)+1000);
	} while(sockets_juego[rand]);

	console.log(rand);

	sockets_juego[rand] = socket;

	socket.emit("ID", rand);

	socket.emit("conectado");

	socket.on("recibida_conn", function(id_nuevo){
		sockets_juego[id_nuevo] = socket;
		delete sockets_juego[rand];
		rand = id_nuevo;
		if(ids_users[id_nuevo] && ids_users[id_nuevo].length)
			socket.emit("num_usuarios_partida", ids_users[id_nuevo].length);
		else
			socket.emit("num_usuarios_partida", 1);

		console.log("connected", rand);
	});

	socket.on("comprueba", function(n){
		esJuego = false;
		console.log("i'm an user, deleted game: " + rand);
		delete sockets_juego[rand]; //Este evento lo ha enviado un usuario, por lo tanto queda comprobado que este socket no es de un juego
		if(sockets_juego[n]){

			userID = nextUserID;
			id_juego = n;

			console.log("ini", id_juego, timesOutJuegos[id_juego] !== undefined);
			if(timesOutJuegos[id_juego] !== undefined)
				clearTimeout(timesOutJuegos[id_juego]);

			timesOutJuegos[id_juego] = setTimeout(function(){ refresh_page(id_juego) }, 120000);
			sockets_users[userID] = socket;

			if(!ids_users[id_juego])
				ids_users[id_juego] = [];
			ids_users[id_juego].push(userID);

			socket.emit("checked", userID, ids_users[id_juego].length);
			sockets_juego[id_juego].emit('checked_id', ids_users[id_juego].indexOf(userID));

			do{
				nextUserID = Math.floor((Math.random() * 9999));
			} while(sockets_users[nextUserID]);
		}
		else
			socket.emit("checked", -1);

	});

	socket.on("press_key", function(array){
		resetTimeOut(array.id_juego);
		if(sockets_juego[array.id_juego]){
			var array_data = {userdata: array, ids_users: ids_users[array.id_juego]};
			sockets_juego[array.id_juego].emit('press', array_data);
		}
	});


	socket.on('disconnect', function () {

		var x = -1;

		if(id_juego !== -1){
			for (var i = 0; i < ids_users[id_juego].length; i++) {
				if(ids_users[id_juego][i] === userID){
					x = i;
				}
			}
		}

		if(x !== -1){
			console.log('deleted user: ' + userID);
			ids_users[id_juego].splice(x,1);
			delete sockets_users[userID];
			if(ids_users[id_juego].length === 0){
				if(sockets_juego[id_juego] !== undefined){
					sockets_juego[id_juego].emit('refresh_page');
				}
			}
			else{
				for (var i = 0; i < ids_users[id_juego].length; i++) {
					if(sockets_users[ids_users[id_juego][i]] !== undefined){
						sockets_users[ids_users[id_juego][i]].emit("change_order", ids_users[id_juego]);
					}
				}
				if(sockets_juego[id_juego] !== undefined){
					sockets_juego[id_juego].emit("delete_last", ids_users[id_juego].length);
				}
			}
		}
		else{
			console.log('deleted game: ' + rand);
			delete sockets_juego[rand];
		}
	});

	var resetTimeOut = function(juego){
		console.log("reset", juego, timesOutJuegos.length);
		clearTimeout(timesOutJuegos[juego]);
		timesOutJuegos[juego] = setTimeout(function(){ refresh_page(juego) }, 120000);
	}

	var refresh_page = function(juego){
		console.log("refresssh", juego);
		if(sockets_juego[juego] !== undefined)
			sockets_juego[juego].emit('refresh_page');

		if(ids_users[id_juego] !== undefined){
			for (var i = 0; i < ids_users[id_juego].length; i++) {
				if(sockets_users[ids_users[id_juego][i]] !== undefined){
					sockets_users[ids_users[id_juego][i]].emit("refresh_user");
				}
			}
		}
	}
});

//------------------------------------------------------------------------------------------------------------
server.listen(4001, function() {
	console.log("Servidor arrancado en el puerto 4001");
});
