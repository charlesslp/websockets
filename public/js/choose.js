

$(document).ready(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		document.getElementById("computerScreen").style.display = "none";
		document.getElementById("mobileScreen").style.display = "flex";
	}
	else {
		document.getElementById("computerScreen").style.display = "flex";
		document.getElementById("mobileScreen").style.display = "none";
	}
})

function goToCatalogo (href) {

	window.location.href = href;
}