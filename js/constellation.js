export function spawnConstellation(){
    const dipper = document.querySelectorAll('.dipper');

    dipper.forEach(star => {
        const popup = star.querySelector('.sometimes-u-gotta-popout');
        const starId = star.id;

        // want popup to show on hover
        star.addEventListener('mouseenter', () => {

            // close all popups first
            dipper.forEach(other => {
                if (other !== star) {
                    other.classList.remove('active');
                    const otherPopup = other.querySelector('.sometimes-u-gotta-popout');
                    if (otherPopup) {
                        otherPopup.classList.remove('show');
                    }
                }
            });

            star.classList.add('active');
            if (popup) {
                if (starId === 'dubhe') {
                        popup.style.left = `-450px`;
                        popup.style.top = `-180px`;
                    } else if (starId === 'merak' || starId === 'phecda' || starId === 'megrez') {
                        // position to the left
                        popup.style.left = `-320px`; // popup width (300px) + 20px spacing
                        popup.style.top = `-140px`;
                        popup.style.transform = 'translateX(0)';
                    } else {
                        // position to right
                        popup.style.left = `25px`;
                        popup.style.top = `-140px`;
                        popup.style.transform = 'translateX(0)';
                    }
                    popup.classList.add('show');
            }
        });

        // hide popup when not hovered
        star.addEventListener('mouseleave', () => {
            star.classList.remove('active');
            if (popup) {
                popup.classList.remove('show');
            }
        });

        // click playlist star to visit spotify
        if (starId === 'dubhe') {
            star.addEventListener('click', () => {
                window.open('https://open.spotify.com/playlist/2KTmAa0JYq8LA0EqP8dz21?si=3aa39383bea642d2&pt=219567988af86ecb08b5f3eac8658bbc', '_blank');
            });
        }

    });
}