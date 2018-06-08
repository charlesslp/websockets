

var pressedMove = false;
var pressedDown = false;
var pressedTurn = false;
var time_token = 0;
var time_down = 0;
var time_down_after = 0;

var newTok = false;

var tokens_group;
var tokens_stopped;

var pos = 0;
var level = 1;
var scoreLevel = 0;

var stopedLines = {};

var limitLeft;
var limitRight;

var random;
var nextToken;

var totalLines = 0;
var score = 0;

function ini_token(){

    limitLeft = game.world.centerX-LONG*9;
    limitRight = game.world.centerX+LONG;

    tokens_group = game.add.group();
    tokens_group.enableBody = true;

    tokens_stopped = game.add.group();
    tokens_stopped.enableBody = true;

    nextToken = game.add.sprite(game.world.centerX+LONG*5, game.world.height-LONG*6-LONG/2, 'nextTok');
    nextToken.width = LONG*3;
    nextToken.height = LONG*4;
    iniScore();

    random = Math.floor((Math.random() * 7));
    createNewToken();

    var bottom_line = game.add.sprite(0, game.world.height-LONG, 'line');
    bottom_line.width = game.world.width;


    cursors = game.input.keyboard.createCursorKeys(); // entradas por teclado

    cursors.left = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    cursors.right = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
    cursors.down = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

    cursors.space = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    cursors.escape = game.input.keyboard.addKey(Phaser.KeyCode.ESC);
}

function createNewToken() {
    pressedMove = false;
    pressedDown = false;
    pressedTurn = false;
    time_token = 0;
    time_down = 0;
    time_down_after = 0;
    pos = 0;
    type = "";

    if(level<2) {
        level+=0.05;
    }
    else if (level < 5.5) {
        level+=0.025;
    } else {
        level+=0.02;
    }

    token = tokens_group.create(game.world.centerX-LONG*4, game.world.height, 'token');
    token2 = tokens_group.create(game.world.centerX-LONG*4, game.world.height, 'token');
    token3 = tokens_group.create(game.world.centerX-LONG*4, game.world.height, 'token');
    token4 = tokens_group.create(game.world.centerX-LONG*4, game.world.height, 'token');

    token.width = LONG;
    token2.width = LONG;
    token3.width = LONG;
    token4.width = LONG;
    token.height = LONG;
    token2.height = LONG;
    token3.height = LONG;
    token4.height = LONG;


    switch(random){
        case 1: s_builder(token, token2, token3, token4); type="s"; break;
        case 2: z_builder(token, token2, token3, token4); type="z"; break;
        case 4: o_builder(token, token2, token3, token4); type="o"; break;
        case 3: i_builder(token, token2, token3, token4); type="i"; break;
        case 0: t_builder(token, token2, token3, token4); type="t"; break;
        case 6: j_builder(token, token2, token3, token4); type="j"; break;
        case 5: l_builder(token, token2, token3, token4); type="l"; break;
        default: s_builder(token, token2, token3, token4); type="s"; break;
    }

    tokens_group.children.map(function (item, index){
        tokens_stopped.children.map(function (item2, index2){
            if(item.x === item2.x && item.y === item2.y){
                jugando = false;
            }
        });
    });

    var r = Math.floor((Math.random() * 7));

    while(r === random){
        r = Math.floor((Math.random() * 7));
    }
    random = r;
    nextToken.frame = random;

}

var stop_next;
var yBef = 0;
var yAft = 0;

function step_token(){

    stop_next = false;
    newTok = false;

    tokens_group.children.map(function (item, index){
        tokens_stopped.children.map(function (item2, index2){
            if(item.y+LONG === item2.y && item.x === item2.x){
                stop_next = true;
            }
        });
    });

    tokens_group.children.map(function (item, index){
        if(item.y >= game.world.height-LONG*2){
            stop_next = true;
        }
    });

    time_token+=level;

    var can_move;

    if(!game.device.desktop){
        checkTouch();
    }

    if(!pressedMove && cursors.left.isDown){

        can_move = true;

        tokens_group.children.map(function (item, index){
            tokens_stopped.children.map(function (item2, index2){
                if(item.x-LONG === item2.x && item.y === item2.y){
                    can_move = false;
                }
            });
        });
        if(can_move){

            tokens_group.children.map(function (item, index){
                if(item.x <= limitLeft)
                    can_move = false;
            });

            if(can_move){
                tokens_group.children.map(function (item, index){
                    item.x -= LONG;
                });
            }
        }
        pressedMove = true;
    }
    else if(!pressedMove && cursors.right.isDown){

        can_move = true;

        tokens_group.children.map(function (item, index){
            tokens_stopped.children.map(function (item2, index2){
                if(item.x+LONG === item2.x && item.y === item2.y){
                    can_move = false;
                }
            });
        });

        if(can_move){

            tokens_group.children.map(function (item, index){
                if(item.x >= limitRight)
                    can_move = false;
            });

            if(can_move){

                tokens_group.children.map(function (item, index){
                    item.x += LONG;
                });
            }
        }
        pressedMove = true;
    }

    if(cursors.down.isDown){
        if(yBef === 0)
            yBef = token.y;
        time_token = 0;
        time_down+=level;
        if(time_down >= 40) {

            if(stop_next){
                newTok = true;
                yAft = token.y;
                score += (yAft-yBef)/LONG;
                yBef = 0;
                yAft = 0;
            }
            else {
                time_down_after++;

                tokens_group.children.map(function (item, index){
                    if(time_down_after > 1){
                        item.y += LONG;
                    }
                });

                if(!newTok && time_down_after > 1)
                    time_down_after = 0;
            }
        }
        else {
            yBef = 0;
            yAft = 0;
            if(!pressedDown && tokens_group.children[0]){
                if(stop_next){
                    newTok = true;
                }
                else {
                    tokens_group.children.map(function (item, index){
                        item.y += LONG;
                    });
                    pressedDown = true;
                }
            }
        }
    }

    if(!pressedTurn && cursors.space.isDown){
        pressedTurn = true;
        var tok1 = {x: tokens_group.children[0].x, y:tokens_group.children[0].y};
        var tok2 = {x: tokens_group.children[1].x, y:tokens_group.children[1].y};
        var tok3 = {x: tokens_group.children[2].x, y:tokens_group.children[2].y};
        var tok4 = {x: tokens_group.children[3].x, y:tokens_group.children[3].y};

        var moved;
        switch(type){
            case "s": moved = s_turn(tok1, tok2, tok3, tok4); break;
            case "z": moved = z_turn(tok1, tok2, tok3, tok4); break;
            case "o": break;
            case "i": moved = i_turn(tok1, tok2, tok3, tok4); break;
            case "t": moved = t_turn(tok1, tok2, tok3, tok4); break;
            case "j": moved = j_turn(tok1, tok2, tok3, tok4); break;
            case "l": moved = l_turn(tok1, tok2, tok3, tok4); break;
            default: break;
        }

        if(moved){
            tokens_group.children[0].x = moved.token.x;
            tokens_group.children[0].y = moved.token.y;
            tokens_group.children[1].x = moved.token2.x;
            tokens_group.children[1].y = moved.token2.y;
            tokens_group.children[2].x = moved.token3.x;
            tokens_group.children[2].y = moved.token3.y;
            tokens_group.children[3].x = moved.token4.x;
            tokens_group.children[3].y = moved.token4.y;
        }
    }

    if(!cursors.left.isDown && !cursors.right.isDown){
        pressedMove = false;
    }

    if(!cursors.down.isDown){
        if(time_token >= 70){
            time_token = 0;
            if(stop_next){
                newTok = true;
            }
            else {
                tokens_group.children.map(function (item, index){
                    item.y += LONG;
                });
            }
        }
        time_down = 0;
        if(pressedDown){
            pressedDown = false;
        }
    }

    if(!cursors.space.isDown){
        pressedTurn = false;
    }

    if(newTok){
        newTok = false;

        var children_length = tokens_group.children.length;

        for (var i = 0; i < children_length; i++) {

            var stopped_token = tokens_stopped.create(tokens_group.children[0].x, tokens_group.children[0].y, 'token');
            stopped_token.width = LONG;
            stopped_token.height = LONG;
            stopped_token.frame = tokens_group.children[0].frame;
            tokens_group.children[0].destroy();
        }

        children_length = tokens_stopped.children.length;

        for (var i = 0; i < children_length; i++) {
            stopedLines[tokens_stopped.children[i].y] = 0;
        }

        var lines = [];

        for (var i = 0; i < children_length; i++) {
            stopedLines[tokens_stopped.children[i].y]++;
            if(stopedLines[tokens_stopped.children[i].y] >= 11 && lines.indexOf(tokens_stopped.children[i].y) === -1){
                lines.push(tokens_stopped.children[i].y);
            }
        }

        var k = 0;

        for (var i = 0; i < lines.length; i++) {
            k = 0;
            for (var j = 0; j < children_length; j++) {
                if(tokens_stopped.children[k] !== undefined && tokens_stopped.children[k].y === lines[i]){
                    tokens_stopped.children[k].destroy();
                    k--;
                }
                k++;
            }
        }

        children_length = tokens_stopped.children.length;

        var toMove = [];

        for(var i = 0; i < lines.length; i++){
            for (var j = 0; j < children_length; j++) {
                if(tokens_stopped.children[j] !== undefined && tokens_stopped.children[j].y < lines[i]){
                    toMove.push(j);
                }
            }
        }

        for(var i = 0; i < toMove.length; i++){
            tokens_stopped.children[toMove[i]].y += LONG;
        }

        updateScore(lines.length);

        createNewToken();

    }

}

function resetGame() {

    gameOverText.destroy();
    transparente.destroy();
    gameOverText = "";
    transparente = "";

    var children_length = tokens_group.children.length

    for (var i = 0; i < children_length; i++) {
        tokens_group.children[0].destroy();
    }

    children_length = tokens_stopped.children.length

    for (var i = 0; i < children_length; i++) {
        tokens_stopped.children[0].destroy();
    }

    random = Math.floor((Math.random() * 7));
    createNewToken();

    jugando = true;
    pressedTurn = true;
}

function iniScore(){
    var text = game.add.text(game.world.centerX+LONG*4+LONG/2, game.world.height-LONG*11-LONG/2, 'Level', { fontSize: '30px'});
    text.width = 2.4*LONG;
    text.height = 1.25*LONG;
    text = game.add.text(game.world.centerX+LONG*4+LONG/2, game.world.height-LONG*14-LONG/2, 'Lines', { fontSize: '30px'});
    text.width = 2.4*LONG;
    text.height = 1.25*LONG;
    text = game.add.text(game.world.centerX+LONG*4.8, game.world.height-LONG*19.8, 'Score', { fontSize: '35px'});
    text.width = 2.4*LONG;
    text.height = 1.25*LONG;


    levelText = game.add.text(game.world.centerX+LONG*7, game.world.height-LONG*10-LONG/2, '0', { fontSize: '30px'});
    levelText.width = 0.5*LONG;
    levelText.height = 1.25*LONG;
    linesText = game.add.text(game.world.centerX+LONG*7, game.world.height-LONG*13-LONG/2, '0', { fontSize: '30px'});
    linesText.width = 0.5*LONG;
    linesText.height = 1.25*LONG;
    scoreText = game.add.text(game.world.centerX+LONG*4.8, game.world.height-LONG*18, '0', { fontSize: '35px'});
    scoreText.width = 0.5*LONG;
    scoreText.height = 1.25*LONG;

    totalLines = 0;
    score = 0;
}

function updateScore(newLines){
    totalLines += newLines;

    switch(newLines){
        case 1: score += 40*(scoreLevel+1); break;
        case 2: score += 100*(scoreLevel+1); break;
        case 3: score += 300*(scoreLevel+1); break;
        case 4: score += 1200*(scoreLevel+1); break;
    }

    scoreLevel = Math.floor(parseInt(totalLines)/10);

    linesText.text = totalLines;
    scoreText.text = score;
    levelText.text = scoreLevel;
}

var fakeTouch;
var realTouch;
var touchDown;
var touchUp;
var touching = false;

var touchTime = 0;

function checkTouch(){

    if(game.input.pointer1.x < game.world.width-45*X && game.input.pointer1.y > 45*Y) {
        cursors.left.isDown = false;
        cursors.right.isDown = false;
        cursors.down.isDown = false;
        cursors.space.isDown = false;
        if (game.input.pointer1.isDown && !touching) {
            touchTime = 0;
            touching = true;
            touchDown = {x: game.input.pointer1.x, y: game.input.pointer1.y};
            fakeTouch = token.x;
            realTouch = game.input.pointer1.x;
        }
        if (game.input.pointer1.isUp && touching) {
            touching = false;
            touchUp = {x: game.input.pointer1.x, y: game.input.pointer1.y};

            if (touchTime < 20) {
                if (touchDown.y > touchUp.y - LONG && touchDown.y < touchUp.y + LONG && touchDown.x > touchUp.x - LONG && touchDown.x < touchUp.x + LONG) {
                    cursors.space.isDown = true;
                }
                else if (touchDown.y < touchUp.y - LONG * 5) {
                    time_down = 100;
                    yBef = token.y;
                    allDown();
                    yAft = token.y;
                    score += (yAft - yBef) / LONG;
                }
            }

            touchTime = 0;
        }

        if (game.input.pointer1.isDown) {
            touchTime++;
            pressedMove = false;

            var finalTouch = fakeTouch + game.input.pointer1.x - realTouch;

            if (finalTouch < token.x - LONG && finalTouch < token2.x - LONG && finalTouch < token3.x - LONG && finalTouch < token4.x - LONG) {
                cursors.left.isDown = true;
            }
            else if (finalTouch > token.x + LONG * 2 && finalTouch > token2.x + LONG * 2 && finalTouch > token3.x + LONG * 2 && finalTouch > token4.x + LONG * 2) {
                cursors.right.isDown = true;
            }
        }
    }
}

function allDown(){

    while(!stop_next) {

        tokens_group.children.map(function (item, index){
            item.y += LONG;
        });

        tokens_group.children.map(function (item, index) {
            tokens_stopped.children.map(function (item2, index2) {
                if (item.y + LONG === item2.y && item.x === item2.x) {
                    stop_next = true;
                }
            });
        });

        tokens_group.children.map(function (item, index) {
            if (item.y >= game.world.height - LONG * 2) {
                stop_next = true;
            }
        });

    }
}











