

function step_npc(){

    if(ball.x < players[0].x || ball.x > players[1].x){
        if(game.world.centerY+players[1].height*3 > players[1].y && game.world.centerY+players[1].height*3 < players[1].y + players[1].height) {
            players[1].body.velocity.y = 0;
        }
        if (game.world.centerY+players[1].height*3 < players[1].y) {//pelota por encima
            players[1].body.velocity.y = -150 * Y;
        }
        else if (game.world.centerY+players[1].height*3 > players[1].y + players[1].height) {
            players[1].body.velocity.y = 150 * Y;
        }
    }
    else {
        if(ball.y > players[1].y && ball.y < players[1].y + players[1].height) {
            players[1].body.velocity.y = 0;
        }
        else {
            if (ball.y < players[1].y + players[1].height/4 && ball.x < players[1].x) {//pelota por encima
                players[1].body.velocity.y = -150 * Y;
            }
            else if (ball.y > players[1].y + players[1].height/2 - players[1].height/4 && ball.x < players[1].x) {
                players[1].body.velocity.y = 150 * Y;
            }
        }
    }
}