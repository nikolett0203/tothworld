export function heatDeath() {

    // get all cards from the doc
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-card');
    const nextBtn = document.getElementById('next-card');
    let index = 0;

    // add 'active' class to card if selected by arrow
    function showCard(i) {
        cards.forEach((card, j) => {
            card.classList.toggle('active', j === i);
        });
    }

    // each click of the back button decrements the index
    prevBtn.addEventListener('click', () => {
        index = (index - 1 + cards.length) % cards.length;
        showCard(index);
    });

    // each click of the forward button increments it
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % cards.length;
        showCard(index);
    });

    showCard(index);
}