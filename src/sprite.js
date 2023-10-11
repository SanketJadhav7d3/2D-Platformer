class Sprite {
    constructor({
        position,
        imageSrc,
        frameRate = 1,
        frameBuffer = 3,
        scale = 1,
        context
    }) {
        this.position = position;
        this.scale = scale;
        this.context = context;
        this.loaded = false;
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.frameBuffer = frameBuffer;
        this.elapsedFrames = 0;
        this.image.onload = () => {
            this.width = (this.image.width / this.frameRate) * this.scale;
            this.height = this.image.height * this.scale;
            this.loaded = true;
        }
    }

    draw() {
        // ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        if (!this.loaded) return;

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }

        // ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.context.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();
        this.updateFrames();
    }

    updateFramesRight() {
        this.elapsedFrames = (this.elapsedFrames + 1) % this.frameBuffer;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            this.currentFrame = (this.currentFrame + 1) % (this.frameRate);
        }
    }

    updateFramesLeft() {
        this.elapsedFrames = (this.elapsedFrames + 1) % this.frameBuffer;
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame <= 0) this.currentFrame = this.frameRate;
            this.currentFrame = this.currentFrame - 1;
        }
    }
}
