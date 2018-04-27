
function s_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token.x = game.world.centerX-token.width;
    token2.y = game.world.height-token.height*28;
    token2.x = game.world.centerX-token.width;
    token3.y = game.world.height-token.height*28;
    token4.y = game.world.height-token.height*27;

    token.frame = 1;
    token2.frame = 1;
    token3.frame = 1;
    token4.frame = 1;
}

function s_turn(token, token4){

    var x1=0, y1=0, x4=0;

    if(pos === 0){
        x1 = -token.width;
        y1 = token.height*2;
        x4 = -token.width;
    }
    else {
        x1 = token.width;
        y1 = -token.height*2;
        x4 = token.width;
    }
    
    var can_move = true;

    tokens_stopped.children.map(function (item, index){
        if(token.x+x1 === item.x && token.y+y1 === item.y){
            can_move = false;
        }
        else if(token4.x+x4 === item.x && token4.y === item.y){
            can_move = false;
        }
    });

    if(can_move){
        pos++;
        if(pos > 1)
            pos = 0;
        token.x +=x1;
        token.y +=y1;
        token4.x +=x4;
    }
}

function z_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token2.y = game.world.height-token.height*28;
    token3.y = game.world.height-token.height*28;
    token3.x = game.world.centerX-token.width;
    token4.y = game.world.height-token.height*27;
    token4.x = game.world.centerX-token.width;

    token.frame = 2;
    token2.frame = 2;
    token3.frame = 2;
    token4.frame = 2;
}

function z_turn(token, token4){

    var x1=0, y1=0, x4=0;

    if(pos === 0){
        x1 = token.width;
        y1 = token.height*2;
        x4 = token.width;
    }
    else {
        x1 = -token.width;
        y1 = -token.height*2;
        x4 = -token.width;
    }
    
    var can_move = true;

    tokens_stopped.children.map(function (item, index){
        if(token.x+x1 === item.x && token.y+y1 === item.y){
            can_move = false;
        }
        else if(token4.x+x4 === item.x && token4.y === item.y){
            can_move = false;
        }
    });

    if(can_move){
        pos++;
        if(pos > 1)
            pos = 0;
        token.x +=x1;
        token.y +=y1;
        token4.x +=x4;
    }
}

function o_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token2.y = game.world.height-token.height*28;
    token3.y = game.world.height-token.height*29;
    token3.x = game.world.centerX-token.width;
    token4.y = game.world.height-token.height*28;
    token4.x = game.world.centerX-token.width;

    token.frame = 4;
    token2.frame = 4;
    token3.frame = 4;
    token4.frame = 4;
}

function i_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token2.y = game.world.height-token.height*28;
    token3.y = game.world.height-token.height*27;
    token4.y = game.world.height-token.height*26;

    token.frame = 3;
    token2.frame = 3;
    token3.frame = 3;
    token4.frame = 3;
}

function i_turn(token, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    if(pos === 0){
        x1 = -token.width;
        y1 = token.height;
        x3 = token.width;
        y3 = -token.height;
        x4 = token.width*2;
        y4 = -token.height*2;
    }
    else {
        x1 = token.width;
        y1 = -token.height;
        x3 = -token.width;
        y3 = token.height;
        x4 = -token.width*2;
        y4 = token.height*2;
    }
    
    var can_move = true;

    tokens_stopped.children.map(function (item, index){
        if(token.x+x1 === item.x && token.y+y1 === item.y){
            can_move = false;
        }
        else if(token3.x+x3 === item.x && token3.y+y3 === item.y){
            can_move = false;
        }
        else if(token4.x+x4 === item.x && token4.y+y4 === item.y){
            can_move = false;
        }
    });

    if(can_move){
        pos++;
        if(pos > 1)
            pos = 0;
        token.x +=x1;
        token.y +=y1;
        token3.x +=x3;
        token3.y +=y3;
        token4.x +=x4;
        token4.y +=y4;
    }
}

function t_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token2.y = game.world.height-token.height*28;
    token3.y = game.world.height-token.height*27;
    token4.y = game.world.height-token.height*28;
    token4.x = game.world.centerX-token.width;

    token.frame = 0;
    token2.frame = 0;
    token3.frame = 0;
    token4.frame = 0;
}

function t_turn(token, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    switch(pos){
        case 0: 
            x3 = token.width;
            y3 = -token.height;
            break;
        case 1:
            x4 = token.width;
            y4 = token.height;
            break;
        case 2:
            x1 = -token.width;
            y1 = token.height;
            break;
        case 3:
            x1 = token.width;
            y1 = -token.height;
            x3 = -token.width;
            y3 = token.height;
            x4 = -token.width;
            y4 = -token.height;
            break;
    }

    var can_move = true;

    tokens_stopped.children.map(function (item, index){
        if(token.x+x1 === item.x && token.y+y1 === item.y){
            can_move = false;
        }
        else if(token3.x+x3 === item.x && token3.y+y3 === item.y){
            can_move = false;
        }
        else if(token4.x+x4 === item.x && token4.y+y4 === item.y){
            can_move = false;
        }
    });

    if(can_move){
        pos++;
        if(pos > 3)
            pos = 0;
        token.x +=x1;
        token.y +=y1;
        token3.x +=x3;
        token3.y +=y3;
        token4.x +=x4;
        token4.y +=y4;
    }
}

function j_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token2.y = game.world.height-token.height*28;
    token3.y = game.world.height-token.height*27;
    token4.y = game.world.height-token.height*27;
    token4.x = game.world.centerX-token.width;

    token.frame = 6;
    token2.frame = 6;
    token3.frame = 6;
    token4.frame = 6;
}

function j_turn(token, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    switch(pos){
        case 0:
            x1 = token.width;
            y1 = token.height;
            x3 = -token.width;
            y3 = -token.height;
            y4 = -token.height*2;
            break;
        case 1:
            x1 = -token.width;
            y1 = token.height;
            x3 = token.width;
            y3 = -token.height;
            x4 = token.width*2;
            break;
        case 2:
            x1 = -token.width;
            y1 = -token.height;
            x3 = token.width;
            y3 = token.height;
            y4 = token.height*2;
            break;
        case 3:
            x1 = token.width;
            y1 = -token.height;
            x3 = -token.width;
            y3 = token.height;
            x4 = -token.width*2;
            break;
    }

    var can_move = true;

    tokens_stopped.children.map(function (item, index){
        if(token.x+x1 === item.x && token.y+y1 === item.y){
            can_move = false;
        }
        else if(token3.x+x3 === item.x && token3.y+y3 === item.y){
            can_move = false;
        }
        else if(token4.x+x4 === item.x && token4.y+y4 === item.y){
            can_move = false;
        }
    });

    if(can_move){
        pos++;
        if(pos > 3)
            pos = 0;
        token.x +=x1;
        token.y +=y1;
        token3.x +=x3;
        token3.y +=y3;
        token4.x +=x4;
        token4.y +=y4;
    }
}

function l_builder(token, token2, token3, token4){
    token.y = game.world.height-token.height*29;
    token.x = game.world.centerX-token.width;
    token2.y = game.world.height-token.height*28;
    token2.x = game.world.centerX-token.width;
    token3.y = game.world.height-token.height*27;
    token3.x = game.world.centerX-token.width;
    token4.y = game.world.height-token.height*27;

    token.frame = 5;
    token2.frame = 5;
    token3.frame = 5;
    token4.frame = 5;
}


function l_turn(token, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    switch(pos){
        case 0:
            x1 = token.width;
            y1 = token.height;
            x3 = -token.width;
            y3 = -token.height;
            x4 = -token.height*2;
            break;
        case 1:
            x1 = -token.width;
            y1 = token.height;
            x3 = token.width;
            y3 = -token.height;
            y4 = -token.width*2;
            break;
        case 2:
            x1 = -token.width;
            y1 = -token.height;
            x3 = token.width;
            y3 = token.height;
            x4 = token.height*2;
            break;
        case 3:
            x1 = token.width;
            y1 = -token.height;
            x3 = -token.width;
            y3 = token.height;
            y4 = token.width*2;
            break;
    }

    var can_move = true;

    tokens_stopped.children.map(function (item, index){
        if(token.x+x1 === item.x && token.y+y1 === item.y){
            can_move = false;
        }
        else if(token3.x+x3 === item.x && token3.y+y3 === item.y){
            can_move = false;
        }
        else if(token4.x+x4 === item.x && token4.y+y4 === item.y){
            can_move = false;
        }
    });

    if(can_move){
        pos++;
        if(pos > 3)
            pos = 0;
        token.x +=x1;
        token.y +=y1;
        token3.x +=x3;
        token3.y +=y3;
        token4.x +=x4;
        token4.y +=y4;
    }
}