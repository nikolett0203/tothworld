export function spawnConstellation(){
    const dipper = document.querySelectorAll('.dipper');

    dipper.forEach(star => {
        const popup = star.querySelector('.sometimes-u-gotta-popout');

        star.addEventListener('click', function(e) {
            console.log("click");

            // want click to act only on the stars, not parent containers
            e.stopPropagation();

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

            // check if current star is already active
            const isCurrentlyActive = star.classList.contains('active');

            if (isCurrentlyActive) {
                // if already active, close it
                star.classList.remove('active');
                if (popup) {
                    popup.classList.remove('show');
                }
            } else {
                // if not active, open it
                star.classList.add('active');
                if (popup) {

                    const starId = star.id;
                    
                    // position very close to -- 25px below and 10px to the side
                    popup.style.top = `25px`;
                    
                    // position left or right based on star ID
                    if (starId === 'dubhe') {
                        popup.style.left = `-290px`;
                        popup.style.top = `-180px`;

                    } else if (starId === 'merak' || starId === 'phecda' || starId === 'megrez') {
                        // position to the left
                        popup.style.left = `-290px`; // popup width (280px) + 10px spacing
                        popup.style.transform = 'translateX(0)';
                    } else {
                        // position to right
                        popup.style.left = `25px`;
                        popup.style.transform = 'translateX(0)';
                    }
                    
                    popup.classList.add('show');
                }
            }
        });
    });
    
    // close popup if clicking outside the stars
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dipper') && !e.target.closest('.sometimes-u-gotta-popout')) {
            dipper.forEach(star => {
                star.classList.remove('active');
                const popup = star.querySelector('.sometimes-u-gotta-popout');
                if (popup) {
                    popup.classList.remove('show');
                }
            });
        }
    });
}