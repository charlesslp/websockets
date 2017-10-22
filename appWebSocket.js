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
var userID = 0;

io.on('connection', function(socket){

	var rand;

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
		delete sockets_juego[rand]; //Este evento lo ha enviado un usuario, por lo tanto queda comprobado que este socket no es de un juego
		if(sockets_juego[n]){
			sockets_users[userID] = socket;
			if(!ids_users[n])
				ids_users[n] = [];
			ids_users[n].push(userID);
			socket.emit("checked", userID);
			userID++;
		}
		else
			socket.emit("checked", -1);
	});

	socket.on("press_key", function(array){
		if(sockets_juego[array.id_juego]){
			var array_data = {userdata: array, ids_users: ids_users[array.id_juego]};
			sockets_juego[array.id_juego].emit('press', array_data);
		}
	});


	socket.on('disconnect', function () {
		console.log('deleted: ' + rand);
		delete sockets_juego[rand];
	});
});






//------------------------------------------------------------------------------------------------------------
server.listen(4001, function() {
	console.log("Servidor arrancado en el puerto 4001");
});
