// canvas is like a blank sketchbook that you can draw on with js
// .getContext('2d') tells the browser we want tools to draw 2d objects on the canvas
// ctx is an object that allows us access to drawing tools
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

console.log(canvas)

// define orbital tilt and center of solar system
const tilt = 0.5;
const centerX = () => canvas.width / 2;
const centerY = () => canvas.height / 2;

// define planet attributes
// rx/y: horizontal/vertical radii of orbit, angle: starting angle of orbit in radians
let planets = [
    { rX: 160, rY: 90, speed: 0.006, angle: 1, size: 7, color: 'white', id: 1 },
    { rX: 240, rY: 130, speed: 0.004, angle: 2, size: 10, color: 'white', id: 2 },
    { rX: 320, rY: 180, speed: 0.0025, angle: 3.2, size: 12, color: 'white', id: 3 }
]

// sets width and height of canvas equal to the size of the browser window
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);

export function spawnNebula() {

    // ensure canvas always covers screen by adding an event listener
    resize();

    draw();

}

function draw() {

    // clear the canvas before each frame or else it'll get messy
    // (0, 0) represents the top left corner
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // draw orbital paths for each planet now
    planets.forEach(p => {

        // separate drawing for each planet
        ctx.beginPath();
        // draw an ellipse, positioned at the center of the window, using the x and y radii
        // from the dictionary
        ctx.ellipse(
            centerX(),
            centerY(),
            p.rX,
            p.rY * tilt,            // apply flattening constant to create angled effect
            0,                      // start angle in radians
            2 * Math.PI,             // end angle in radians (we're drawing a full circle)
            false
        );
        // give a ghostly white hue to the orbital path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';

        // then render the ellipse onto the canvas
        ctx.stroke();
    });


    // now we're drawing the planets themselves
    planets.forEach(p => {

        // cos(angle) gives us the length of the adjacent (cos = a / hyp)
        // in radian unit circle, hypotenuse is 1 so when we multiply by p.rX we're scaling it to find horizontal x position
        // vertical is same idea but with sin and finding the opposite (multiply by tilt to flatten, giving angled orbit effect)
        const x = centerX() + p.rX * Math.cos(p.angle);
        const y = centerY() + p.rY * Math.sin(p.angle) * tilt;

        ctx.beginPath();
        // draw a circle, where x/y are the center and size is the radius
        // 0, 2 * pi just tells it to draw a complete circle (not a semi-circle)
        ctx.arc(x, y, p.size, 0, 2 * Math.PI);

        // style it a little bit
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        // update position of planet for the next frame
        p.angle += p.speed;

    });

    // as soon as frame is complete, draw the next one
    requestAnimationFrame(draw);
}