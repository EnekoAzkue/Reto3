import globals from "./globals.js";
import {Game, State, SpriteID} from "./constants.js";

export default function update()
{

    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            console.log("Loading assets...");
            break;

        case Game.PLAYING:
            playGame();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}

function playGame()
{

    updateSprites();

}

function updateSprites()
{
    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}

function updateSprite(sprite)
{
    const type = sprite.id
    switch(type)
    {
        //Caso del jugador
        case SpriteID.PLAYER:
            updatePlayer(sprite);
            break;
        
        //Caso del pirate
        case SpriteID.PIRATE:
            updatePirate(sprite);
            break;
        //Caso del joker
        case SpriteID.JOKER:
            updateJoker(sprite);
            break;
        
        //Caso del knight
        case SpriteID.KNIGHT:
            updateKnight(sprite);
            break;

        //Caso del enemigo
        default:

            break;
    }
}

//Funcion que actualiza el presonaje
function updatePlayer(sprite)
{
    //Aqui actualizariamos el estado de las variables del player

    sprite.xPos = 10;
    sprite.yPos = 50;

    sprite.frames.frameCounter = 2;

    sprite.state = State.LEFT;
}

function updatePirate(sprite)
{
    //Aqui actualizariamos el estado de las variables del pirate

    sprite.xPos = 150;
    sprite.yPos = 130;

    sprite.frames.frameCounter = 3;

    sprite.state = State.LEFT_2;
}

function updateJoker(sprite)
{
    //Aqui actualizariamos el estado de las variables del joker

    sprite.xPos = 100;
    sprite.yPos = 30;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
}

function updateKnight(sprite)
{
    //Aqui actualizariamos el estado de las variables del knight

    sprite.xPos = 150;
    sprite.yPos = 30;

    sprite.frames.frameCounter = 0;

    sprite.state = State.STILL;
}