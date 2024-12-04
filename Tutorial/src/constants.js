//Constants

//Estados del juego
export const Game = 
{
    INVALID: -1,
    LOADING: 0,
    PLAYING: 1,
    OVER:    2,
};

//Velocidad del juego
export const FPS = 30;

export const SpriteID =
{
    PLAYER: 0,
    PIRATE: 1,
    JOKER: 2,
    KNIGHT: 3
}

//Identificador de estado de sprite(direccion)
export const State =
{
    //Estados de PLAYER
    UP:     0,
    LEFT:   1,
    DOWN:   2,
    RIGHT:  3,

    //Estados de PIRATE
    LEFT_2: 0,
    RIGHT_2: 1,

    //Estados de JOKER, KNIGHT
    STILL: 0
}

//Diferentes TileSets
export const Tile = 
{
    SIZE_64: 0, //Sprites de 64*64
    SIZE_32: 1  //Tiles del mapa 32*32
}

export const Block =
{
    EMPTY:      0,
    VINES:      1,
    BROWN_1:    2,
    BROWN_2:    3,
    DARK_1:     4,
    GRAY:       5,
    CRYSTAL_1:  6,
    CRYSTAL_2:  7
}