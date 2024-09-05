let modInfo = {
	name: "The Replicanti Tree",
	id: "mymod",
	author: "nobody",
	pointsName: "Time",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Replicanti Expansion",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added Replicanti growth mechanics.<br>
		- Removed old tree mechanics.<br>
		

let winText = `Congratulations! You've reached the end of this version! More content coming soon.`

// Custom functions that shouldn't be called every tick
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec (Energy Particles gain)
function canGenPoints(){
	return true
}

// Calculate Energy Particles gain per second (Replicanti boost applied here)
function getPointGen() {
	if (!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

	// Apply Replicanti effect to boost Energy Particle generation
	if (player.r.points.gt(0)) {
		gain = gain.times(tmp.r.effect); // tmp.r.effect is the Replicanti effect multiplier
	}

	return gain
}

// Non-layer related variables to be saved
function addedPlayerData() { 
	return {} 
}

// Extra things to display at the top of the page
var displayThings = [
	"Replicanti boosts Energy Particles gain."
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000")) // Example endgame threshold
}

// Style for the background (can be a function)
var backgroundStyle = {

}

// Maximum tick length (to avoid long ticks breaking the game)
function maxTickLength() {
	return(3600) // Default is 1 hour
}

// Function to fix old saves
function fixOldSave(oldVersion){
	// Add logic here if needed for future save fixing
}
