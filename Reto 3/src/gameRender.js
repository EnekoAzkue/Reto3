import globals from "./globals.js";
import {Game, Tile} from "./constants.js";

//Funcion que renderiza los graficos 
export default function render()
{

    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case Game.LOADING:
            //Draw loading spinner
            break;

        case Game.PLAYING:
            drawGame();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}

function drawGame()
{

    //Borramos la pantalla entera 
    globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);

    //Pintamos los FPS en pantalla
    //globals.ctx.fillText("FPS: " + 1 / globals.deltaTime, 30, 30);

    //Dibujamos el mapa(nivel)
    renderMap();

    //Dibujamos los elementos
    drawSprites();

    //Dibujamos el HUD
    renderHUD();
}

function renderSprite(sprite)
{
    //Calculamos la posicion del tile de inicio
    const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize; 
    const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

    //Calculamos ña posicion en el tilemap a dibujar
    const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset;
    const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset;

    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);

    //Dibujamos el nuevo fotograma del sprite en la posicion adecuada
    globals.ctx.drawImage(                              
        globals.tileSets[Tile.SIZE_64],                 // The image file
        xTile, yTile,                                   // The source x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize,   // The source heignt and width
        xPos, yPos,                                     // The destinaton x and y position
        sprite.imageSet.xSize, sprite.imageSet.ySize    // The destinaton heignt and width
    );

}

function drawSprites()
{

    for(let i = 0; i < globals.sprites.length; i++)
    {
        const sprite = globals.sprites[i];

        //TEST: Dibuja un rectangulo alrededor del sprite(hitbox)
        drawSpriteRectangle(sprite);

        renderSprite(sprite);
    }

}

function drawSpriteRectangle(sprite)
{
    //Datos del sprinte
    const x1 = Math.floor(sprite.xPos);
    const y1 = Math.floor(sprite.yPos);
    const w1 = sprite.imageSet.xSize;
    const h1 = sprite.imageSet.ySize;

    globals.ctx.fillStyle = "green";
    globals.ctx.fillRect(x1, y1, w1, h1);
}

//Funcion que dibuja el mapa
function renderMap()
{
    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    //Dibujamos el mapa
    const num_fil = levelData.length;
    const num_col = levelData[0].length;

    for(let i = 0; i < num_fil; i++)
    {
        for(let j = 0; j < num_col; j++)
        {
            const xTile = (levelData[i][j] - 1 ) * brickSize;
            const yTile = 0;
            const xPos = j * brickSize;
            const yPos = i * brickSize;

            //Dibujamos el nuevo fotograma del sprite en la posicion adecuada
            globals.ctx.drawImage(
                globals.tileSets[Tile.SIZE_32], //The image file
                xTile, yTile,                   //The source x and y position
                brickSize, brickSize,           //The source  height and width
                xPos, yPos,                     //The destination x and y position
                brickSize, brickSize,           //The destination height and width
            );
        }
    }
}

function renderHUD()
{
    //TEST: datos metidos en bruto
    const score = 1500;
    const highscore = 130000;
    const life = 40;
    const time = 3000;

    //Draw score
    globals.ctxHUD.font = '8px emulogic';
    globals.ctxHUD.fillStyle = 'lightblue';
    globals.ctxHUD.fillText("SCORE", 8, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText("" + score, 8, 16);

    //Draw Highscore
    globals.ctxHUD.fillStyle = 'lightblue';
    globals.ctxHUD.fillText("HIGHSCORE", 72, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText("" + highscore, 72, 16);

    //Draw life
    globals.ctxHUD.fillStyle = 'lightblue';
    globals.ctxHUD.fillText("LIFE", 168, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillRect(168, 9, life, 8);

    //Round corners. (remove 1 pixel per corner)
    globals.ctxHUD.fillStyle = 'black';
    globals.ctxHUD.fillRect(168, 9, 1, 1);
    globals.ctxHUD.fillRect(168, 15, 1, 1);
    globals.ctxHUD.fillRect(168 + life - 1, 9, 1, 1);
    globals.ctxHUD.fillRect(168 + life - 1, 15, 1, 1);

    //Draw time
    globals.ctxHUD.fillStyle = 'lightblue';
    globals.ctxHUD.fillText("TIME", 224, 8);
    globals.ctxHUD.fillStyle = 'lightgrey';
    globals.ctxHUD.fillText(time, 224, 16);

}