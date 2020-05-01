import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dog-game');
    const canvasCtx = canvas.getContext('2d');

    const backgroundCanvas = document.getElementById('background-canvas');
    const backgroundCanvasCtx = backgroundCanvas.getContext('2d');

    new Game(
        canvasCtx,
        canvas,
        backgroundCanvasCtx
    );
});