import Background from './background';
import Player from './player';

export default class Game {

    constructor(ctx, canvas, backgroundCtx) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.backgroundCtx = backgroundCtx;
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.click = this.click.bind(this);
        this.multiplier = 0.5;
        this.registerEvents();
        this.restart();
    }

    play() {
        this.running = true;
        this.animate();
    }

    restart() {
        this.running = false;
        this.score = 0;
        this.player = new Player(this.dimensions);

        const sceneryBackground = new Image();
        sceneryBackground.src = 'http://shyeyez.com/zoomies/assets/scrolling_background_dusk.png';
        this.background = new Background(this.dimensions, this.backgroundCtx, sceneryBackground, -30, 1438, 1.2);

        this.animate();
    }

    registerEvents() {
        this.canvas.addEventListener('mousedown', this.click);
    }

    click(e) {
        if (!this.running) {
            this.play();
        }
        this.player.jump();
    }

    gameOver() {
        return (
            this.background.collidesWith(this.player.bounds()) || this.player.outOfBounds(this.height)
        );
    }

    animate() {
        this.background.animate(this.ctx);
        this.player.animate(this.ctx);
        this.drawScore(this.ctx);

        if (this.gameOver()) {
            alert(this.score);
            this.restart();
        }

        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    drawScore(ctx) {
        let roundedScore = Math.floor(this.score);
        const text = `Score: ${roundedScore}`;
        ctx.font = '40px VT323';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';

        if (this.running) {
            ctx.strokeText(text, 600, 40);
            ctx.fillText(text, 600, 40);
        }

        this.incrementScore();
    }

    incrementScore() {
        this.score += this.multiplier;
    }

}