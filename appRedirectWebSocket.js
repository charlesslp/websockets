"use strict"

var express = require("express");

var fs = require("fs");

var app = express();



var server = require("http").Server(app);

app.get("/", function(req, res){
	res.redirect("https://carlosmp.com:4001");
});

app.get("/u", function(req, res){
	res.redirect("https://carlosmp.com:4001/usuario.html");
});

//----------------------------------------------------------------------------------------------------------
server.listen(4000, function() {
	console.log("Servidor arrancado en el puerto 4000");
});
