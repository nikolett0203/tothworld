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
    { rX: 160, rY: 90, speed: 0.006, angle: 1, size: 7, color: '#ffcc70', id: 1, hover: false, og_speed: 0.006 },
    { rX: 240, rY: 130, speed: 0.004, angle: 2, size: 10, color: '#98ff98', id: 2, hover: false, og_speed: 0.004 },
    { rX: 320, rY: 180, speed: 0.0025, angle: 3.2, size: 12, color: '#00ffe5', id: 3, hover: false, og_speed: 0.0025 }
]

// variables to store screen state
let hovered_planet = null;
let pause = false;

// sets width and height of canvas equal to the size of the browser window
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// event handler for mouse
function mousePos(e) {

    // grabs position and size of canvas on screen
    const rect = canvas.getBoundingClientRect();

    // e.clientX is where mouse is horizontally on page
    // rect.left is how far canvas is from left of the page
    // so e.clientX - rect.left is how far the mouse is inside the canvas horizontally
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

// use sum of squares to calculate mouse distance from planets
function distance (x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// every time the mouse moves, check if it's close enough to a planet
function mouseMove(e) {

    const pos = mousePos(e);
    let curr_hover = false;

    planets.forEach(p => {

        // cos(angle) gives us the length of the adjacent (cos = a / hyp)
        // in radian unit circle, hypotenuse is 1 so when we multiply by p.rX we're scaling it to find horizontal x position
        // vertical is same idea but with sin and finding the opposite (multiply by tilt to flatten, giving angled orbit effect)
        const x = centerX() + p.rX * Math.cos(p.angle);
        const y = centerY() + p.rY * Math.sin(p.angle) * tilt;

        // calculate distance between mouse pos and planet coords
        const dist = distance(pos.x, pos.y, x, y)

        // was the planet previously hovered?
        const prev_hover = p.hover;

        // now store whether or not it is currently hovered
        // if the distance from the cursor is smaller than the planet's size + a buffer, it is hovered
        p.hover = dist < p.size + 10;

        if (p.hover) {
            curr_hover = true;
            canvas.style.cursor = 'pointer';

            if (!prev_hover) {
                showProject(p.id, pos.x, pos.y);
            }

        } else if (prev_hover) {
            hideProject(p.id);
            if (hovered_planet === p.id) {
                hovered_planet = null;
            }
        }

    });

    // don't need cursor to point if it's not pointed at anything
    if (!curr_hover) {
        canvas.style.cursor = 'default';
    }

}

// reset everything after the mouse is no longer hovering
function mouseLeave(e) {

    planets.forEach(p => {

        if (p.hover) {
            p.hover = false;
            hideProject(p.id);
        }
    });

    hovered_planet = null;
    canvas.style.cursor = 'default'

}

// draw orbiting animation
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
        // if hovered, make it brighter and wider
        ctx.strokeStyle = p.hover ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = p.hover ? 2 : 1;

        // then render the ellipse onto the canvas
        ctx.stroke();
    });


    // now we're drawing the planets themselves
    planets.forEach(p => {

        const x = centerX() + p.rX * Math.cos(p.angle);
        const y = centerY() + p.rY * Math.sin(p.angle) * tilt;

        ctx.beginPath();
        // draw a circle, where x/y are the center and size is the radius
        // 0, 2 * pi just tells it to draw a complete circle (not a semi-circle)
        ctx.arc(x, y, p.size, 0, 2 * Math.PI);

        // style it a little bit
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.hover ? 25 : 12;
        ctx.fill();

        // slow planet 10% when hovered
        if (p.hover) {
            p.speed = p.og_speed * 0.1; 
        } else {
            // restore original speed after hover is complete
            p.speed = p.og_speed;
        }

        // update position of planet for the next frame
        p.angle += p.speed;

    });

    // as soon as frame is complete, draw the next one
    requestAnimationFrame(draw);
}

// reveal project card once planet is hovered
function showProject(planet_id, pos_x, pos_y) {

    const card = document.getElementById(`project-card-${planet_id}`);

    // position the card near the mouse
    let card_x = pos_x + 20;
    let card_y = pos_y - 100;

    // make sure it doesn't go offscreen
    // card is 350x300px, so if it's position is beyond the edge of the window, move it to the left of the cursor
    if (card_x + 350 > window.innerWidth) card_x = pos_x - 370;
    // if card top is above the screen, bump it down
    if (card_y < 0) card_y = 20;
    // if bottom of card goes beyond the screen, bump it up
    if(card_y + 300 > window.innerHeight) card_y = window.innerHeight - 320; 

    // add new position to .css and add show tag to make it visible
    card.style.left = card_x + 'px';
    card.style.top = card_y + 'px';
    card.classList.add('show');
}

// hide planet card after planet no longer hovered
function hideProject(planet_id) {
    const card = document.getElementById(`project-card-${planet_id}`);
    card.classList.remove('show');
}


// event listeners
window.addEventListener('resize', resize);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseleave', mouseLeave)
console.log("Added")

export function spawnNebula() {

    // ensure canvas always covers screen by adding an event listener
    resize();
    draw();

}

