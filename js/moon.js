export function spawnMoon() {

    // define moon icons
    const moon_phases = {

        'New Moon':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            </svg>`,

        'Waxing Crescent':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <path d="M50,5 A45,45 0 0,1 50,95 A35,45 0 0,0 50,5" fill="white" opacity="0.9"/>
            </svg>`,

        'First Quarter':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <path d="M50,5 A45,45 0 0,1 50,95 Z" fill="white" opacity="0.9"/>
            </svg>`,

        'Waxing Gibbous':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <ellipse cx="57" cy="50" rx="42" ry="45" fill="white" opacity="0.9"/>
            </svg>`,
        
        'Full Moon':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="white" opacity="0.9"/>
            </svg>`,

        'Waning Gibbous':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <ellipse cx="43" cy="50" rx="42" ry="45" fill="white" opacity="0.9"/>
            </svg>`,

        'Last Quarter':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <path d="M50,5 A45,45 0 0,0 50,95 Z" fill="white" opacity="0.9"/>
            </svg>`,
            
        'Waning Crescent':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <path d="M50,5 A45,45 0 0,0 50,95 A35,45 0 0,1 50,5" fill="white" opacity="0.9"/>
            </svg>`,

        'Default':
            `<svg class="moon-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
                <path d="M50,5 A45,45 0 0,1 50,95 A15,45 0 0,0 50,5" fill="white" opacity="0.9"/>
            </svg>`
    }

    // use orozhaza coords for fun
    const today = new Date().toISOString().split('T')[0];
    const endpoint = `https://aa.usno.navy.mil/api/rstt/oneday?date=${today}&coords=46.56,20.66`

    // fetch is a built-in browser function that makes request to URL
    // gives a Promise -- placeholder for a value that will exist when request is answered
    fetch(endpoint)
        // .then runs when the Promise resolves
        // response is an object containing...
        // ...response.ok, a bool that is true if HTTP status is 200-299
        // ...response.status, the HTTP status code
        // ...response.json(), a function that reads body of the response as JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();     // another async function
        })
        // next .then runs after response.json() Promise finishes
        // data is a normal JS object (no longer a promise)
        .then(data => {

            const phase = data.properties.data.curphase;

            // find correct phase svg
            const svg = moon_phases[phase] || moon_phases['Default'];           // default if unknown phase

            // update page with svg
            const target = document.querySelector('#moon');
            target.innerHTML = svg;

            // create popup
            const popup = document.createElement('div');
            popup.className = 'popup';
            popup.textContent = `Tonight's Lunar Phase: ${phase}`;
            target.appendChild(popup);

            // add event listeners for hover
            target.addEventListener('mouseenter', () => { popup.classList.add('show') });
            target.addEventListener('mouseleave', () => { popup.classList.remove('show') });
        })
        .catch(error => {
            console.error("Could not fetch moon data:", error);
            const target = document.querySelector('#moon');
            target.innerHTML = moon_phases['Default'];
        });
}
