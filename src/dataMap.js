export const dataNames = {
	startLevel: ["startlvl"],
	crossedInitiation: ["crossedinitiation"],
	cargo: ["cargo1", "cargo2", "cargo3", "cargo4"],
	hatch: ["hatch1", "hatch2", "hatch3", "hatch4"],
	rocketCargo: ["rock1c", "rock2c", "rock3c"],
	rocketHatch: ["rock1h", "rock2h", "rock3h"],
	shipCargo: ['shipc'],
	shipHatch: ['shiph'],
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
		moveTrench:"trench"
	},
	gameInfo: {
		opposingSideTime: "opposide",
		penaltyPoints: "ppoints",
		fuelCellsDropped: "hdropped",
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
		autoNotes: "noteA",
		teleNotes: "noteT",
		climbeNotes: "noteC",
		overallNotes: "noteO"
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

export const assistOptions = [
	"No assist",
	"Level 2",
	"Level 3"
]

export const startLevelOptions = [
	"Didn't cross baseline",
	"Level 1",
	"Level 2"
]
export const defaultAssistOption = 0;

export const gamePieceOptions = [
	"None",
	"Rocket level 1",
	"Rocket level 2",
	"Rocket level 3",
	"Cargo Ship"
]
export const defaultGamePieceOption = 0;

function swap(json) {
	let ret = {};
	for (let key in json) {
		ret[json[key]] = key;
	}
	return ret;
}
export const dataTypes = {
	"startLevel": swap(startLevelOptions),
	"cargo": swap(gamePieceOptions),
	"hatch": swap(gamePieceOptions),
	"rocketCargo": [0, 1, 2, 3, 4],
	"rocketHatch": [0, 1, 2, 3, 4],
	"shipCargo": [0, 1, 2, 3, 4, 5, 6, 7, 8],
	"shipHatch": [0, 1, 2, 3, 4, 5, 6, 7, 8],
	"climbing": { ...swap(climbOptions), "No assist": 0 },
	"attributes": [0, 1],
	"gameInfo": "number",
	"matchInfo": "number"
}

export const bitmap = {
	"startLevel": {
		bits: 2,
		amount: 1
	},
	"cargo": {
		bits: 3,
		amount: 4
	},
	"hatch": {
		bits: 3,
		amount: 4
	},
	"rocketCargo": {
		bits: 3,
		amount: 3
	},
	"rocketHatch": {
		bits: 3,
		amount: 3
	},
	"shipCargo": {
		bits: 4,
		amount: 1
	},
	"shipHatch": {
		bits: 4,
		amount: 1
	},
	"climbing": {
		bits: 2,
		amount: 2
	},
	"attributes": {
		bits: 1,
		amount: 4
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