
function clickGame(gameName){

	document.getElementById("descriptionParagraph").innerHTML = gameDescription(gameName);
	
	document.getElementById("descriptionImage").style.display = "block";
	document.getElementById("descriptionImage").src = gameImage(gameName);

	document.getElementById("buttonPlayGame").style.display = "block";
	document.getElementById("buttonPlayGame").onclick = function(){gamePlay(gameName);};
}

