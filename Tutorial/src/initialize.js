import globals from "./globals.js";
import {Game, SpriteID, State, FPS} from "./constants.js";
import Sprite from "./sprite.js";
import ImageSet from "./imageSet.js";
import Frames from "./frames.js";
import {Level, level1} from "./level.js";
//Funcion que inicializa los elementos HTML
function initHTMLelements()
{

    //Canvas, context Screen
    globals.canvas = document.getElementById('gameScreen');
    globals.ctx = globals.canvas.getContext('2d');

    //Canvas, context HUD
    globals.canvasHUD = document.getElementById('gameHUD');
    globals.ctxHUD = globals.canvasHUD.getContext('2d');
    //Eliminacion del Anti-Aliasing
    globals.ctx.imageSmoothingEnabled = false;

    //Caja de texto para pruebas
    globals.txtPruebas = document.getElementById('txtPruebas');

}

//Funcion que inicializa las variables del juego
function initVars()
{

    //Inicializamos las variables de gestion de tiempo 
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS; //Frame time in seconds

    //Inicializamos el estado del juego
    globals.gameState = Game.LOADING;

}

//Carga de activos: TIMEMAPS, IMAGES, SOUNDS
function loadAssets()
{
    let tileSet;

    //Load spriteSheet image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/spritesheet.png"; //Ojo que la ruta es relativa al HTLM, no al JS
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    //Load bricks image
    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/bricks.png"; //Ojo que la ruta es relativa al HTLM, no al JS
    globals.tileSets.push(tileSet);
    globals.assetsToLoad.push(tileSet);

}

//UPDATE. Funcion que se llama cada vez que se llama un archivo
function loadHandler()
{

    globals.assetsLoaded++;

    console.log(`gameState = ${globals.gameState}`);

    //Una vez se han cargado todos los archivos pasamos
    if(globals.assetsLoaded === globals.assetsToLoad.length)
    {

        //UPDATE. Remove the load event listener
        for(let i = 0; i < globals.tileSets.length; i++)
        {
            globals.tileSets[i].removeEventListener("load", loadHandler, false);
        }

        console.log("Assets finished loading");

        //Start the game 
        globals.gameState = Game.PLAYING;
    }
    console.log(`gameState = ${globals.gameState}`)
}

function initSprites()
{

    initPlayer();
    initPirate();
    initJoker();
    initKnight();

}

function initPlayer()
{

    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 44, 57, 64, 10, 6);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const player = new Sprite(SpriteID.PLAYER, State.UP, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(player);

}

function initPirate()
{

    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(5, 0, 32, 47, 64, 17, 16);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const pirate = new Sprite(SpriteID.PIRATE, State.RIGHT_2, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(pirate);

}

function initJoker()
{

    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(4, 0, 44, 57, 64, 10, 6);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const joker = new Sprite(SpriteID.JOKER, State.RIGHT_2, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(joker);

}

function initKnight()
{

    //Creamos las propiedades de las imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(4, 2, 44, 57, 64, 10, 6);

    //Creamos los datos de la animacion. 8 frames / state
    const frames = new Frames(8);
    //Creamos nuestro sprite
    const knight = new Sprite(SpriteID.KNIGHT, State.RIGHT_2, 100, 70, imageSet, frames);

    //Añadimos el player al array de sprites
    globals.sprites.push(knight);

}

function initLevel()
{
    //Creamos las propiedades de las imagenes del mapa: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
    const imageSet = new ImageSet(0, 0, 32, 32, 32, 0, 0);

    //Creamos y gurdamos nuestro nivel
    globals.level = new Level(level1, imageSet)
}
//Exportamos las funciones 
export 
{
    initHTMLelements,
    initVars,
    loadAssets,
    initSprites,
    initLevel
}