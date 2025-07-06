const moon_phases = {
    'New Moon':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        </svg>,
    'Waxing Crescent':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <path d="M50,5 A45,45 0 0,1 50,95 A35,45 0 0,0 50,5" fill="white" opacity="0.9"/>
        </svg>,
    'First Quarter':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <path d="M50,5 A45,45 0 0,1 50,95 Z" fill="white" opacity="0.9"/>
        </svg>,
    'Waxing Gibbous':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <ellipse cx="57" cy="50" rx="42" ry="45" fill="white" opacity="0.9"/>
        </svg>,
    'Full Moon':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="white" opacity="0.9"/>
        </svg>,
    'Waning Gibbous':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <ellipse cx="43" cy="50" rx="42" ry="45" fill="white" opacity="0.9"/>
        </svg>,
    'Last Quarter':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <path d="M50,5 A45,45 0 0,0 50,95 Z" fill="white" opacity="0.9"/>
        </svg>,
    'Waning Crescent':
        <svg class="moon-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
            <path d="M50,5 A45,45 0 0,0 50,95 A35,45 0 0,1 50,5" fill="white" opacity="0.9"/>
        </svg>
}





export async function spawnMoon() {
  try {
    // Get current date and convert to Unix timestamp
    const today = new Date();
    console.log(today)
    const timestamp = Math.floor(today.getTime() / 1000);
    
    // Fetch moon phase data from FarmSense API
    const response = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${timestamp}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // The API returns an array, get the first result
    const moonData = data[0];
    
    // Log the moon phase to console
    console.log('🌙 Current Moon Phase:', moonData.Phase);
    console.log('📅 Date:', new Date(moonData.Date).toDateString());
    
    // Optional: return the data for further use
    return moonData;
    
  } catch (error) {
    console.error('Error fetching moon phase:', error);
    console.log('🌙 Unable to fetch moon phase data');
    return null;
  }
}