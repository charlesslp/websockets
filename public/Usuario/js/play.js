
var X;
var Y;

var gamepad;
var pad;
var botonA;
var botonB;

var up = false;
var right = false;
var down = false;
var left = false;
var A = false;
var B = false;
var start = false;

var playState = {

	preload: function(){
        game.load.image('gamepad', 'Usuario/assets/gamepad.png');
        game.load.image('pad', 'Usuario/assets/pad.png');
        game.load.image('boton', 'Usuario/assets/button.png');
        game.load.image('start', 'Usuario/assets/start.png');
	},
    create: function() {

        X = game.global.x;
        Y = game.global.y;

        gamepad = game.add.sprite(0, 0, 'gamepad');
        gamepad.width = gamepad.width*X;
        gamepad.height = gamepad.height*Y;


        pad = game.add.sprite(7*X, 0, 'pad');
        pad.width = 220*X;
        pad.height = 220*X;
        pad.y = game.world.height-230*Y;

        pad.inputEnabled = true;
        pad.events.onInputDown.add(onDown, this);
        pad.events.onInputUp.add(onUp, this);


        botonA = game.add.sprite(448*X, 113*Y, 'boton');
        botonA.width = 100*X;
        botonA.height = 100*Y;

        botonA.inputEnabled = true;
        botonA.events.onInputDown.add(onDownA, this);
        botonA.events.onInputUp.add(onUpA, this);

        botonB = game.add.sprite(350*X, 204*Y, 'boton');
        botonB.width = 100*X;
        botonB.height = 100*Y;

        botonB.inputEnabled = true;
        botonB.events.onInputDown.add(onDownB, this);
        botonB.events.onInputUp.add(onUpB, this);

        startImg = game.add.sprite(238*X, 173*Y, 'start');
        startImg.width = 100*X;
        startImg.height = 50*Y;

        startImg.inputEnabled = true;
        startImg.events.onInputDown.add(onDownStart, this);
        startImg.events.onInputUp.add(onUpStart, this);

        if(player_num === undefined)
            player_num = -1;
        textPlayer = game.add.text(game.world.centerX, 70*Y, 'Player '+player_num, { fontSize: '20px', fill: '#ffffff' });
        textPlayer.width = 100*X;
        textPlayer.height = 50*Y;
        textPlayer.anchor.setTo(0.5, 1);
    }
};

function onDown(sprite, pointer) {

    var xPad = pointer.x-Math.round(X*5)-sprite.width/2;
    var yPad = -(pointer.y-Math.round(Y*110)-sprite.height/2);

    if(yPad > 0 && yPad > xPad && yPad > -xPad){
        up = true;
        press("up_on");
    }
    else if(xPad > 0 && xPad > yPad && xPad > -yPad){
        right = true;
        press("right_on");
    }
    else if(yPad < 0 && yPad < xPad && yPad < -xPad){
        down = true;
        press("down_on");
    }
    else if(xPad < 0 && xPad < yPad && xPad < -yPad){
        left = true;
        press("left_on");
    }
}

function onUp() {

    if(up){
        up = false;
        press("up_off");
    }
    if(right){
        right = false;
        press("right_off");
    }
    if(down){
        down = false;
        press("down_off");
    }
    if(left){
        left = false;
        press("left_off");
    }

}

function onDownA() {
    A = true;
    press("A_on");
}

function onUpA() {
    if(A){
        A = false;
        press("A_off");
    }
}

function onDownB() {
    B = true;
    press("B_on");
}

function onUpB() {
    if(B){
        B = false;
        press("B_off");
    }
}

function onDownStart() {
    start = true;
    press("start_on");
}

function onUpStart() {
    if(start){
        start = false;
        press("start_off");
    }
}

