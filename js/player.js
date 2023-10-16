import { cos, normalizeDegAngle, sin } from "./math/angles";

export class Player {
    constructor({ x, y, z, rotationH, rotationV, ctx }) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationH = rotationH;
        this.rotationV = rotationV;

        this.rotateSpeed = 4;
        this.moveSpeed = 10;
        this.flySpeed = 10;

        this.rotatingH = 0;
        this.rotatingV = 0;

        this.walking = 0;
        this.strafing = 0;
        this.flying = 0;

        this.upScale = 4;

        this.setupControls();
    }


    setupControls() {

        const keyDowns = {
            'w': () => this.walking++,
            's': () => this.walking--,
            'a': () => this.strafing--,
            'd': () => this.strafing++,
            'ArrowLeft': () => this.rotatingH--,
            'ArrowRight': () => this.rotatingH++,
            'ArrowUp': () => this.rotatingV++,
            'ArrowDown': () => this.rotatingV--,
            'q': () => this.flying++,
            'e': () => this.flying--,
        };

        const keyUps = {
            'w': () => this.walking--,
            's': () => this.walking++,
            'a': () => this.strafing++,
            'd': () => this.strafing--,
            'ArrowLeft': () => this.rotatingH++,
            'ArrowRight': () => this.rotatingH--,
            'ArrowUp': () => this.rotatingV--,
            'ArrowDown': () => this.rotatingV++,
            'q': () => this.flying--,
            'e': () => this.flying++,
        };

        addEventListener("keydown", (e) => {
            if (e.repeat) return;
            if (keyDowns[e.key]) keyDowns[e.key]();
        });
        
        addEventListener("keyup", (e) => {
            if (e.repeat) return;
            if (keyUps[e.key]) keyUps[e.key]();
        });
    }


    update() {
        this.rotationH = normalizeDegAngle(this.rotationH + (this.rotatingH * this.rotateSpeed));
        this.rotationV = normalizeDegAngle(this.rotationV + (this.rotatingV * this.rotateSpeed));

        const dx = Math.sin(this.rotationH * Math.PI / 180) * this.moveSpeed;
        const dy = Math.cos(this.rotationH * Math.PI / 180) * this.moveSpeed;

        if (this.walking !== 0) {
            this.x += dx * this.walking;
            this.y += dy * this.walking;
        }

        if (this.strafing !== 0) {
            this.x += dy * this.strafing;
            this.y += dx * this.strafing;
        }

        if (this.flying !== 0) {
            this.z += this.flying * this.moveSpeed;
        }

        // console.log({
        //     x: this.x,
        //     y: this.y,
        //     z: this.z,
        //     rotationH: this.rotationH,
        //     rotationV: this.rotationV,
        // });

    }


    render() {

        const wx = [];
        const wy = [];
        const wz = [];

        const CS = cos[this.rotationH];
        const SN = sin[this.rotationH];

        let x1 = 40 - this.x;
        let y1 = 10 - this.y;

        let x2 = 40 - this.x;
        let y2 = 290 - this.y;


        
        // World X position
        wx[0] = x1 * CS - y1 * SN;
        wx[1] = x2 * CS - y2 * SN;

        wy[0] = y1 * CS + x1 * SN;
        wy[1] = y2 * CS + x2 * SN;

        wz[0] = (this.rotationV * wy[0] / 32);
        wz[1] = (this.rotationV * wy[1] / 32);

        // console.log('wall at', {
        //     x: wx[0],
        //     y: wy[0],
        //     z: wz[0],
        // })


        // Perspective projection

        const screenWidth = 640;
        const screenHeight = 480;
        const SW2 = screenWidth / 2;
        const SH2 = screenHeight / 2;

        
        wx[0] = wx[0] * 200 / wy[0] + SW2;
        wx[1] = wx[1] * 200 / wy[1] + SW2;
        
        wy[0] = wy[0] * 200 / wy[0] + SH2;
        wy[1] = wy[1] * 200 / wy[1] + SH2;

    
        this.ctx.fillStyle = "#666666";

        // Clipping
        if (wx[0] > 0 && wx[0] < screenWidth && wy[0] > 0 && wy[0] < screenHeight) {

            this.ctx.fillRect(wx[0], wy[0], this.upScale, this.upScale);
            console.log('point at screen', {
                x: wx[0],
                y: wy[0],
            })
            // ctx.beginPath();
            // ctx.moveTo(wallXs[0] * this.upScale, wallYs[0] * this.upScale);
            // ctx.lineTo(wallXs[1] * this.upScale, wallYs[1] * this.upScale);
            // ctx.stroke();
        }
        
        if (wx[1] > 0 && wx[1] < screenWidth && wy[1] > 0 && wy[1] < screenHeight) {
        
            this.ctx.fillRect(wx[1], wy[1], this.upScale, this.upScale);
            console.log('point at screen', {
                x: wx[1],
                y: wy[1],
            })
        }



    }

}