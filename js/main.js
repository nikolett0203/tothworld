import { spawnGalaxy } from './stars.js';
import { zeroG } from './title.js';
import { spawnNebula } from './nebula.js';
import { spawnMoon } from './moon.js'

window.onload = function () {
    spawnGalaxy();
    zeroG();
    spawnNebula();
    spawnMoon();
}