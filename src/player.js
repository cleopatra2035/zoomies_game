const CONSTANTS = {
    GRAVITY: 0.4,
    JUMP_SPEED: 8,
    TERMINAL_VEL: 12,
    PLAYER_WIDTH: 55,
    PLAYER_HEIGHT: 65
};

export default class Player {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = this.dimensions.height / 2;
        this.vel = 0;
        this.smiley = new Image();
        this.smiley.src = 'http://shyeyez.com/zoomies/assets/coki.png';
    }

    jump() {
        this.vel = -1 * CONSTANTS.JUMP_SPEED;
    }

    movePlayer() {
        this.y += this.vel;
        this.vel += CONSTANTS.GRAVITY;
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

    animate(ctx) {
        this.movePlayer();
        this.drawPlayer(ctx);
    }

    drawPlayer(ctx) {
        ctx.drawImage(this.smiley, this.x, this.y, CONSTANTS.PLAYER_WIDTH, CONSTANTS.PLAYER_HEIGHT);
    }

    bounds() {
        return {
            left: this.x,
            right: this.x + CONSTANTS.PLAYER_WIDTH,
            top: this.y,
            bottom: this.y + CONSTANTS.PLAYER_HEIGHT
        };
    }

    outOfBounds() {
        const aboveTheTop = this.y < 0;
        const belowTheBottom = this.y + CONSTANTS.PLAYER_HEIGHT > this.dimensions.height;
        return aboveTheTop || belowTheBottom;
    }
}
