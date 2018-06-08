
function s_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token.x = token.x-LONG;
    token2.y = token2.y-LONG*(HIGH-1);
    token2.x = token2.x-LONG;
    token3.y = token3.y-LONG*(HIGH-1);
    token4.y = token4.y-LONG*(HIGH-2);

    token.frame = 1;
    token2.frame = 1;
    token3.frame = 1;
    token4.frame = 1;
}

function s_turn(token, token2, token3, token4){

    var x1=0, y1=0, x4=0;

    if(pos === 0){
        x1 = -LONG;
        y1 = LONG*2;
        x4 = -LONG;
    }
    else {
        x1 = LONG;
        y1 = -LONG*2;
        x4 = LONG;
    }

    token.x +=x1;
    token.y +=y1;
    token4.x +=x4;

    var moved = canIMove(token, token2, token3, token4);
    
    if(moved){

        pos++;
        if(pos > 1)
            pos = 0;

        return moved;
    }

}

function z_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token2.y = token2.y-LONG*(HIGH-1);
    token3.y = token3.y-LONG*(HIGH-1);
    token3.x = token3.x-LONG;
    token4.y = token4.y-LONG*(HIGH-2);
    token4.x = token4.x-LONG;

    token.frame = 2;
    token2.frame = 2;
    token3.frame = 2;
    token4.frame = 2;
}

function z_turn(token, token2, token3, token4){

    var x1=0, y1=0, x4=0;

    if(pos === 0){
        x1 = LONG;
        y1 = LONG*2;
        x4 = LONG;
    }
    else {
        x1 = -LONG;
        y1 = -LONG*2;
        x4 = -LONG;
    }

    token.x +=x1;
    token.y +=y1;
    token4.x +=x4;

    var moved = canIMove(token, token2, token3, token4);
    
    if(moved){

        pos++;
        if(pos > 1)
            pos = 0;

        return moved;
    }

}

function o_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token2.y = token2.y-LONG*(HIGH-1);
    token3.y = token3.y-LONG*HIGH;
    token3.x = token3.x-LONG;
    token4.y = token4.y-LONG*(HIGH-1);
    token4.x = token4.x-LONG;

    token.frame = 4;
    token2.frame = 4;
    token3.frame = 4;
    token4.frame = 4;
}

function i_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token2.y = token2.y-LONG*(HIGH-1);
    token3.y = token3.y-LONG*(HIGH-2);
    token4.y = token4.y-LONG*(HIGH-3);

    token.frame = 3;
    token2.frame = 3;
    token3.frame = 3;
    token4.frame = 3;
}

function i_turn(token, token2, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    if(pos === 0){
        x1 = -LONG;
        y1 = LONG;
        x3 = LONG;
        y3 = -LONG;
        x4 = LONG*2;
        y4 = -LONG*2;
    }
    else {
        x1 = LONG;
        y1 = -LONG;
        x3 = -LONG;
        y3 = LONG;
        x4 = -LONG*2;
        y4 = LONG*2;
    }
    
    token.x +=x1;
    token.y +=y1;
    token3.x +=x3;
    token3.y +=y3;
    token4.x +=x4;
    token4.y +=y4;


    var moved = canIMove(token, token2, token3, token4);
    
    if(moved){

        pos++;
        if(pos > 1)
            pos = 0;

        return moved;
    }

}

function t_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token2.y = token2.y-LONG*(HIGH-1);
    token3.y = token3.y-LONG*(HIGH-2);
    token4.y = token4.y-LONG*(HIGH-1);
    token4.x = token4.x-LONG;

    token.frame = 0;
    token2.frame = 0;
    token3.frame = 0;
    token4.frame = 0;
}

function t_turn(token, token2, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    switch(pos){
        case 0: 
            x3 = LONG;
            y3 = -LONG;
            break;
        case 1:
            x4 = LONG;
            y4 = LONG;
            break;
        case 2:
            x1 = -LONG;
            y1 = LONG;
            break;
        case 3:
            x1 = LONG;
            y1 = -LONG;
            x3 = -LONG;
            y3 = LONG;
            x4 = -LONG;
            y4 = -LONG;
            break;
    }

    
    token.x +=x1;
    token.y +=y1;
    token3.x +=x3;
    token3.y +=y3;
    token4.x +=x4;
    token4.y +=y4;

    var moved = canIMove(token, token2, token3, token4);
    
    if(moved){

        pos++;
        if(pos > 3)
            pos = 0;

        return moved;
    }
        
}

function j_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token2.y = token2.y-LONG*(HIGH-1);
    token3.y = token3.y-LONG*(HIGH-2);
    token4.y = token4.y-LONG*(HIGH-2);
    token4.x = token4.x-LONG;

    token.frame = 6;
    token2.frame = 6;
    token3.frame = 6;
    token4.frame = 6;
}

function j_turn(token, token2, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    switch(pos){
        case 0:
            x1 = LONG;
            y1 = LONG;
            x3 = -LONG;
            y3 = -LONG;
            y4 = -LONG*2;
            break;
        case 1:
            x1 = -LONG;
            y1 = LONG;
            x3 = LONG;
            y3 = -LONG;
            x4 = LONG*2;
            break;
        case 2:
            x1 = -LONG;
            y1 = -LONG;
            x3 = LONG;
            y3 = LONG;
            y4 = LONG*2;
            break;
        case 3:
            x1 = LONG;
            y1 = -LONG;
            x3 = -LONG;
            y3 = LONG;
            x4 = -LONG*2;
            break;
    }

    
    token.x +=x1;
    token.y +=y1;
    token3.x +=x3;
    token3.y +=y3;
    token4.x +=x4;
    token4.y +=y4;
    
    var moved = canIMove(token, token2, token3, token4);
    
    if(moved){

        pos++;
        if(pos > 3)
            pos = 0;

        return moved;
    }
        
}

function l_builder(token, token2, token3, token4){
    token.y = token.y-LONG*HIGH;
    token.x = token.x-LONG;
    token2.y = token2.y-LONG*(HIGH-1);
    token2.x = token2.x-LONG;
    token3.y = token3.y-LONG*(HIGH-2);
    token3.x = token3.x-LONG;
    token4.y = token4.y-LONG*(HIGH-2);

    token.frame = 5;
    token2.frame = 5;
    token3.frame = 5;
    token4.frame = 5;
}


function l_turn(token, token2, token3, token4){

    var x1=0, y1=0, x3=0, y3=0, x4=0, y4=0;

    switch(pos){
        case 0:
            x1 = LONG;
            y1 = LONG;
            x3 = -LONG;
            y3 = -LONG;
            x4 = -LONG*2;
            break;
        case 1:
            x1 = -LONG;
            y1 = LONG;
            x3 = LONG;
            y3 = -LONG;
            y4 = -LONG*2;
            break;
        case 2:
            x1 = -LONG;
            y1 = -LONG;
            x3 = LONG;
            y3 = LONG;
            x4 = LONG*2;
            break;
        case 3:
            x1 = LONG;
            y1 = -LONG;
            x3 = -LONG;
            y3 = LONG;
            y4 = LONG*2;
            break;
    }

    
    token.x +=x1;
    token.y +=y1;
    token3.x +=x3;
    token3.y +=y3;
    token4.x +=x4;
    token4.y +=y4;
    
    var moved = canIMove(token, token2, token3, token4);
    
    if(moved){

        pos++;
        if(pos > 3)
            pos = 0;

        return moved;
    }
}

function canIMove (token, token2, token3, token4) {
    
    var can_move = true;

     while((token && token.x < limitLeft) || (token2 && token2.x < limitLeft) || (token3 && token3.x < limitLeft) || (token4 && token4.x < limitLeft)){
        token.x += LONG;
        token2.x += LONG;
        token3.x += LONG;
        token4.x += LONG;
    }

    while((token && token.x > limitRight) || (token2 && token2.x > limitRight) || (token3 && token3.x > limitRight) || (token4 && token4.x > limitRight)){
        token.x -= LONG;
        token2.x -= LONG;
        token3.x -= LONG;
        token4.x -= LONG;
    }

    tokens_stopped.children.map(function (item, index){
        if(token.x === item.x && token.y === item.y){
            can_move = false;
        }
        else if(token2.x === item.x && token2.y === item.y){
            can_move = false;
        }
        else if(token3.x === item.x && token3.y === item.y){
            can_move = false;
        }
        else if(token4.x === item.x && token4.y === item.y){
            can_move = false;
        }
    });

    if(token.y > game.world.height-LONG*2 || token2.y > game.world.height-LONG*2 || token3.y > game.world.height-LONG*2 || token4.y > game.world.height-LONG*2){
        can_move = false;
    }

    if(can_move){
        return {token, token2, token3, token4};
    }
    else
        return false;
}