"use strict"

var path = require("path");
var express = require("express");

var fs = require("fs");

var app = express();



var caBundle = fs.readFileSync("../../charleslp_info.ca-bundle");
var clavePrivada = fs.readFileSync("../../clave_charleslp_info.key");
var certificado = fs.readFileSync("../../charleslp_info.crt");




//var server = require("https").Server({ ca: caBundle, key: clavePrivada, cert: certificado },app);
var server = require("http").Server(app);

var io = require('socket.io')(server);


app.use(express.static("public"));


app.get("/", function(req, res){
	res.status(200).send("hello world");
});

app.get("/u", function(req, res){
	res.redirect("http://charleslp.info:4001/usuario.html");
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
	});

	socket.on("comprueba", function(n){
		esJuego = false;
		console.log("i'm an user, deleted game: " + rand);
		delete sockets_juego[rand]; //Este evento lo ha enviado un usuario, por lo tanto queda comprobado que este socket no es de un juego
		if(sockets_juego[n]){

			userID = nextUserID;
			id_juego = n;

			timesOutJuegos[id_juego] = setTimeout(function(){ refresh_page(id_juego) }, 30000);

			sockets_users[userID] = socket;

			if(!ids_users[id_juego])
				ids_users[id_juego] = [];
			ids_users[id_juego].push(userID);

			socket.emit("checked", userID, ids_users[id_juego].length);
			sockets_juego[id_juego].emit('checked_id');

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
			if(ids_users[id_juego].length === 0)
				sockets_juego[id_juego].emit('refresh_page');
			else{
				for (var i = 0; i < ids_users[id_juego].length; i++) {
					if(sockets_users[ids_users[id_juego][i]] !== undefined)
						sockets_users[ids_users[id_juego][i]].emit("change_order", ids_users[id_juego]);
				}
			}
		}
		else{
			console.log('deleted game: ' + rand);
			delete sockets_juego[rand];
		}
	});

	var resetTimeOut = function(juego){
		clearTimeout(timesOutJuegos[juego]);
		timesOutJuegos[juego] = setTimeout(function(){ refresh_page(juego) }, 30000);
	}

	var refresh_page = function(juego){
		if(sockets_users[juego] !== undefined)
			sockets_juego[juego].emit('refresh_page');
	}
});

//------------------------------------------------------------------------------------------------------------
server.listen(4001, function() {
	console.log("Servidor arrancado en el puerto 4001");
});
