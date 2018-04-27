

function handleFlip(element){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

		element.classList.toggle('hover');
		element.classList.toggle('unflip');

		var elementsHover = document.getElementsByClassName("hover");

		for (var i = 0; i < elementsHover.length; i++) {
			var myElement = elementsHover[i];
			if(myElement !== element){
				myElement.classList.toggle('hover');
				myElement.classList.toggle('unflip');
			}
		}
	}
}

window.onload = function(){

	var main = document.getElementById("main");

	$.getJSON( "./json/games.json", function( data ) {

		data.map(function(item){
			main.innerHTML += ''
			+'<div class="col-6 col-sm-6 col-md-6 col-lg-4 no-padding">'
				+'<div class="image-flip unflip" onclick="handleFlip(this);">'
					+'<div class="mainflip no-padding">'

						+'<div class="frontside">'
							+'<div class="card">'
								+'<div class="card-body text-center no-padding">'
									+'<p><img class="" src="'+item.logo+'" alt="card image"></p>'
									+'<p class="card-title h4">'+item.title+'</p>'
									+'<p class="card-text">'+item.short_desc+'</p>'
									+'<div class="button-play blue" onclick="window.location.href=`'+item.url+'`">Jugar</div>'
						        +'</div>'
							+'</div>'
						+'</div>'

						+'<div class="backside">'
							+'<div class="card">'
								+'<div class="card-body text-center no-padding">'
									+'<img class="" src="'+item.info_img+'" alt="card image">'
									+'<p class="card-text">'+item.long_desc+'</p>'
									+'<div class="button-play blue" onclick="window.location.href=`'+item.url+'`">Jugar</div>'
								+'</div>'
							+'</div>'
						+'</div>'

					+'</div>'
				+'</div>'
			+'</div>';
		});
	});
}