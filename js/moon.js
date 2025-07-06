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

    // returns the time in millliseconds, but API needs seconds so divide by 1000
    const today = Math.floor(Date.now() / 1000);
    const endpoint = `https://api.farmsense.net/v1/moonphases/?d=${today}&callback=handleMoonPhases`

    // because farmsense API is...old? idk why
    // it doesn't allow CORS so we have to use JSONP (JSON with padding)
    // in other words, instead of directly getting the JSON data, we're getting a function call from the API
    // that contains the data as its arguments
    // we can define that callback function in our own code then dynamically insert a <script> pointing
    // to the API URL, so when the script loads, it immediately runs and passes the data to our function
    const script = document.createElement('script');
    script.src = endpoint;
    document.body.appendChild(script)

    // add our callback function to the global namespace so it can be called by the API
    window.handleMoonPhases = function(data) {

        // ?. checks if data[0] exists before trying to access .Phase
        const phase = data[0]?.Phase;

        // find correct phase svg
        const svg = moon_phases[phase] || moon_phases['Default']

        // update page with svg
        const target = document.querySelector('#moon');
        target.innerHTML = svg;

        // clean up the script after the call
        script.remove();
        delete window.handleMoonPhase;

    };

}


