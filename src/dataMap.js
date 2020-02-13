export const dataNames = {
	crossedInitiation: ["crossedinitiation"],
	teamColour: ['Blue', 'Red'],
	colourChoice: ['colChoice'],
	climbing: {
		ableToClimb: "abletoclibm",
		hangingMobility: "hangingMobility",
		assist: "assist",
		balanced: "balance"
	},
	shooting: {
		autoLow: ['lowA'],
		autoHigh: ['highA'],
		autoMissed: ['missA'],
		autoBlocked: ["blockedA"],
		teleLow: ['lowT'],
		teleHigh: ['highT'],
		teleMissed: ['missT'],
		teleBlocked: ["blockedT"]
	},
	controlPanel: {
		rotationControl: ["rotationCP"],
		positionControl: ["positionCP"]
	},

	powerCellPickup: {
		fromGround: ["groundPCP"],
		fromLoading: ["loadingPCP"]
	},

	attributes: {
		broken: "broken",
		tip: "tip",
		cargoFromDepot: "depot",
		hatchesFromFloor: "floor",
		moveTrench: "trench",
		powerCellCapacity: "pc-capacity"
	},
	gameInfo: {
		opposingSideTime: "opposide",
		penaltyPoints: "ppoints",
		fuelCellsDropped: "hdropped"
	},
	timingInfo: {
		parkingTime: "parktimeGI",
		climbingTime: "climbtimeGI",
		rotationTime: "rotationGI",
		positionTime: "positionGI"
	},
	matchInfo: {
		matchNumber: "matchNumber",
		teamNumber: "teamNumber"
	},
	gameNotes: {
		autoNotes: "notes-autonomous",
		teleNotes: "notes-teleop",
		climbNotes: "notes-endgame",
		overallNotes: "noteO",
		timeRemainingHung: "note-time-remaining"
	}
}

export const threeOptions = [
	"Not Observed",
	"Yes",
	"No"
]

export const defaultThreeOptions = 0;

export const climbOptions = [
	"No climb",
	"Level 1",
	"Level 2",
	"Level 3"
]
export const defaultClimbOption = 0;

function swap(json) {
	let ret = {};
	for (let key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
export const dataTypes = {
	"crossedInitiation": [0, 1],
	"climbing": { ...swap(climbOptions), "No assist": 0 },
	"attributes": [0, 1],
	"gameInfo": "number",
	"matchInfo": "number"
}
export const bitmap = {
	"crossedInitiation": {
		bits: 1,
		amounts: 1,
	},
	"climbing": {
		bits: 8,
		amount: 4
	},
	"attributes": {
		bits: 4,
		amount: 6
	},
	"gameInfo": {
		bits: 8,
		amount: 3
	},
	"matchInfo": {
		bits: 16,
		amount: 2
	}
}