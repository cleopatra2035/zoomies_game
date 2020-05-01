const CONSTANTS = {
    PLANT_SPEED: 2,
    GAP_HEIGHT: 150,
    PLANT_WIDTH: 50,
    EDGE_BUFFER: 50,
    PLANT_SPACING: 220,
    WARM_UP_SECONDS: 1,
    SCENE_WIDTH: 800,
    SCENE_HEIGHT: 300
};

export default class Background {
    constructor(dimensions, ctx, image, posY, imageWidth, speed) {
        this.dimensions = dimensions;
        this.image = image;
        this.ctx = ctx;
        this.x = 0;
        this.y = posY;
        this.imageWidth = imageWidth;
        this.speed = speed;

        const firstPlantDistance =
            this.dimensions.width +
            (CONSTANTS.WARM_UP_SECONDS * 1 * CONSTANTS.PLANT_SPEED);

        this.plants = [
            this.randomPlant(firstPlantDistance),
            this.randomPlant(firstPlantDistance + CONSTANTS.PLANT_SPACING),
            this.randomPlant(firstPlantDistance + (CONSTANTS.PLANT_SPACING * 2)),
            this.randomPlant(firstPlantDistance + (CONSTANTS.PLANT_SPACING * 3))
        ];
    }

    randomPlant(x) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const plant = {
            topPlant: {
                left: x,
                right: CONSTANTS.PLANT_WIDTH + x,
                top: 0,
                bottom: gapTop
            },
            bottomPlant: {
                left: x,
                right: CONSTANTS.PLANT_WIDTH + x,
                top: gapTop + CONSTANTS.GAP_HEIGHT,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return plant;
    }

    animate(ctx) {
        this.drawBackground(ctx);
        this.movePlants();
        this.drawPlants(ctx);
    }

    drawBackground(ctx) {
        ctx.clearRect(0, 0, 800, 300);
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.imageWidth, this.y);
        if (this.imageWidth < 800) {
            this.ctx.drawImage(this.image, this.x + this.imageWidth * 2, this.y);
        }
        if (this.x <= -this.imageWidth) {
            this.x = 0;
        }
        this.scrollImage();
    }

    scrollImage() {
        this.x -= this.speed;
    }

    passedPlant(player, callback) {
        this.eachPlant((plant) => {
            if (plant.bottomPlant.right < player.left) {
                if (!plant.passed) {
                    plant.passed = true;
                    callback();
                }
            }
        });
    }

    movePlants() {
        this.eachPlant(function (plant) {
            plant.bottomPlant.left -= CONSTANTS.PLANT_SPEED;
            plant.bottomPlant.right -= CONSTANTS.PLANT_SPEED;
        });

        if (this.plants[0].bottomPlant.right <= 0) {
            this.plants.shift();
            const newX = this.plants[1].bottomPlant.left + CONSTANTS.PLANT_SPACING;
            this.plants.push(this.randomPlant(newX));
        }
    }

    drawPlants(ctx) {
        this.eachPlant(function (plant) {
            ctx.fillStyle = 'rgba(255, 2, 95, 0.7)';
            ctx.fillRect(
                plant.bottomPlant.left,
                plant.bottomPlant.top,
                CONSTANTS.PLANT_WIDTH,
                plant.bottomPlant.bottom - plant.bottomPlant.top
            );
        });
    }

    eachPlant(callback) {
        this.plants.forEach(callback.bind(this));
    }

    collidesWith(player) {
        const _overlap = (rect1, rect2) => {
            if (rect1.left > rect2.right || rect1.right < rect2.left) {
                return false;
            }
            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.eachPlant((plant) => {
            if (
                _overlap(plant.bottomPlant, player)
            ) { collision = true; }
        });
        return collision;
    }
}
