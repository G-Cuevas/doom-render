import { calculateAngles, sin } from "./js/math/angles";
import { Player } from "./js/player";

const screenWidth = 640;
const screenHeight = 480;
const FPS = 60;

let screen;
let ctx;

let player;


const start = () => {
    screen = document.getElementById("screen");
    ctx = screen.getContext("2d");
    
    screen.width = screenWidth;
    screen.height = screenHeight;
    
    calculateAngles();
    
    player = new Player({ x: 70, y: -110, z: 20, rotationH: 0, rotationV: 0, ctx })
    
    
    setInterval(mainLoop, 1000 / FPS);
}


const clearScreen = () => {
    screen.width = screen.width;
    screen.height = screen.height;
}


const mainLoop = () => {
    clearScreen();
    
    player.update();
    player.render();
}


start();