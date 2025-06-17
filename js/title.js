// creates floating letter effect for titles
export function zeroG () {

    const titles = document.querySelectorAll('.main-title');

    titles.forEach((title) => {

        // retrieve HTML text, then clear the whole tag / nested elements
        const title_text = title.textContent;
        title.innerHTML = '';

        for (let i = 0; i < title_text.length; i++) {

            // retrieve each letter and create a new span container to hold it
            const letter = title_text[i];
            const span = document.createElement('span');

            // randomly generate attributes of the float animation
            const duration = 4;
            const delay = i * 0.3;
            const index = (i % 6) + 1;

            // add attributes to new span container
            span.textContent = letter;
            span.className = 'zeroG-letter';
            span.style.animation = `float${index} ${duration}s ease-in-out infinite ${delay}s`;

            // then add span to html
            title.appendChild(span)
        }
    });
}

