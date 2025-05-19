

// creates individual stars
function spawnStar(galaxy, min_px, max_px, min_opacity, max_opacity) {

    // each star is a div bounded in size by its type (i.e. giant, main seq, dwarf)
    const star = document.createElement('div');
    const size = min_px + Math.random() * (max_px - min_px);
    const opacity = min_opacity + Math.random() * (max_opacity - min_opacity);

    // randomly generate size, position, and opacity
    star.classList.add('star');
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.opacity = opacity;

    /* create a glow 
    '0 0' means no offset from center, size * 2 makes the radius 2x the size, 
    and rgba gives it a white glow with the intensity depending on the opacity */
    star.style.boxShadow = `0 0 ${size *2}px rgba(255, 255, 255, ${opacity})`;

    // randomly decide twinkle duration (between 3 and 7 sec)
    const duration = 3 + Math.random() * 7;

    // delay twinkle between 0-5s so they don't all start twinkling at once
    const delay = Math.random() * 5;

    // use twinkle keyframe, continue animation infinitely
    star.style.animation = `twinkle ${duration}s ${delay}s infinite ease-in-out`;
    galaxy.appendChild(star)
}

// creates shooting stars across the screen
function meteorShower(galaxy, count) {

    for (let i = 0; i < count; i++) {

        /* setTimeout() is part of brower's built-in web API;
        pass arrow function to it as a callback */
        setTimeout( () => {

            const meteor = document.createElement('div');
            meteor.classList.add('meteor');

            // meteors appear in top 1/3, right side of screen
            meteor.style.top = `${Math.random() * 60}%`;
            meteor.style.left = `${30 + Math.random() * 70}%`;

            // meteor waits a random amount of time before falling
            const delay = Math.random() * 10;
            meteor.style.animationDelay = `${delay}s`;
            galaxy.appendChild(meteor);

            // meteor disappears after 6s and new one is created
            setTimeout(() => {
                meteor.remove();
                meteorShower(galaxy, 1);
            }, (delay + 3) * 1000);

        }, i * 3000);    // delay each meteor by 3000 seconds
    }
}

// generates a field of stars, randomly scattered across the background
export function spawnGalaxy() {

    const galaxy = document.getElementById('galaxy');

    const giant_count = 50;
    const mainseq_count = 150;
    const dwarf_count = 350;

    for (let i = 0; i < giant_count; i++) {
        spawnStar(galaxy, 2, 3, 0.9, 1);
    }

    for (let i = 0; i < mainseq_count; i++) {
        spawnStar(galaxy, 1, 2, 0.7, 0.9);
    }

    for (let i = 0; i < dwarf_count; i++) {
        spawnStar(galaxy, 0.5, 1, 0.4, 0.7);
    }

    meteorShower(galaxy, 1);
}