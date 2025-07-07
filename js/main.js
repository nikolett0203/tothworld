import { spawnGalaxy } from './stars.js';
import { zeroG } from './title.js';
import { spawnNebula } from './nebula.js';
import { spawnMoon } from './moon.js';



// collect all sections from the html and create variables to track state
const sections = document.querySelectorAll('.fade');
let current = 0;
let transition = false;



// need to map our id tags to the section array like { 'bun-top: 0, 'patty': 1, etc. }
// Array.from converts to a JS array because reduce is a method of arrays
// reducer is a method that executes a callback function on each element of the array, passing
// the return value from the previous call into the next call
// dictionary is where we're storing all our data each time
// element is the current array element we're working with
// and i is the index of the current element in the array
// so basically we're passing in an empty object (aka dictionary) and each time
// we call the function, we add a new key-value pair in the form 'section: index'
// and we end up with { 'bun-top: 0, 'patty': 1, etc. }
// we're building it up element-by-element with each call
const map = Array.from(sections).reduce((dictionary, element, i) => {
    dictionary[element.id] = i;
    return dictionary;
}, {}); // empty {} here is what dictionary is initialised to 



// function to swap out the html class tags to allow fade in animations
function showSection(index) {

    // if we're currently switching sections, switching to the section we're already on, don't do anything (return)
    // return also if user scrolls down on the last section (index >= sections.length)
    // OR also if they scroll up on the first section (index < 0)
    if (transition || index == current || index < 0 || index >= sections.length) {
        return;
    }

    // mark that we're currently transitioning so transitions don't overlap
    transition = true;

    // fade out of current section
    sections[current].classList.remove('visible');

    // wait 800ms for the fade-out before fading in to next section
    setTimeout(() => {
        sections[index].classList.add('visible');
        current = index;
        transition = false;

        // remove currently selected nav link
        document.querySelectorAll('.seed').forEach(link => link.classList.remove('active'));

        // highlight new nav link
        const active_section = sections[index].id;
        const active_link = document.querySelector(`.seed[href="#${active_section}"]`);

        if (active_link){
            active_link.classList.add('active');
        }

    }, 800);
}



// scroll event listener
window.addEventListener('wheel', (e) => {

    // don't interrupt current transitions with more scrolls
    if (transition) {
        return;
    }

    if (e.deltaY > 0) {
        // if we're scrolling down, get the next section
        showSection(current + 1);
    } else {
        // if we're scrolling up, get the prev one
        showSection(current - 1);
    }
}, { passive: true });          // passive: true makes it faster (tells the browser not to wait for our code but just scroll as normal basically...?)



// keyboard event listener
window.addEventListener('keydown', (e) => {

    // don't interrupt current transitions
    if (transition) {
        return;
    }

    // if user presses down arrow or spacebar
    if (e.key === 'ArrowDown' || e.key === ' ') {
        showSection(current + 1);
    } else if (e.key === 'ArrowUp') {
        showSection(current - 1);
    }

});



// add event listeners to nav bar buttons
document.querySelectorAll('.seed').forEach(seed => {

    seed.addEventListener('click', (e) => {

        // here is where we use the prevent default that we didn't use with {passive: true}
        // prevents browser's default behaviour of jumping to section using href anchor
        // otherwise, browser would instantly scroll, breaking the smooth fade animation
        e.preventDefault();

        // get the id of the section the user clicked
        const target = seed.getAttribute('href').replace('#', '');

        // then find it's index in the mapping
        const index = map[target];

        // then call that section into view
        if (index !== undefined) {
            showSection(index);
        }

    });

});



// initial page load
window.addEventListener('DOMContentLoaded', () => {

    // set up the background and everything
    spawnGalaxy();
    zeroG();
    spawnNebula();
    spawnMoon();

    // make the current section fade into view
    sections[current].classList.add('visible');

    // mark initial nav link as active
    const active_link = document.querySelector(`.seed[href="#${sections[current].id}"]`);
    if (active_link) active_link.classList.add('active');
    
});
