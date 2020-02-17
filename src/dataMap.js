export const dataNames = {
	crossedInitiation: ["crossedinitiation"],
	teamColour: ['Blue', 'Red'],
	colourChoice: ['colChoice'],
	scoutName: ['scoutName'],
	climbing: {
		ableToClimb: "abletoclibm",
		hangingMobility: "hangingMobility",
		assist: "assist",
		balanced: "balance"
	},
	shooting: {
		autoLow: ['lowAuto'],
		autoHigh: ['highAuto'],
		autoMissed: ['missAuto'],
		teleLow: ['lowTele'],
		teleHigh: ['highTele'],
		teleMissed: ['missTele'],
		teleBlocked: ["blockedTele"]
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
		moveTrench: "trench",
		powerCellCapacity: "pc_capacity"
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
}

export const threeOptions = [
	"Not Observed",
	"Yes",
	"No"
]

export const defaultThreeOptions = 0;

export const nameOptions = [
	"Enter Name",
	"Aaron_J",
	"Alex_H",
	"Alvin_M",
	"Edward_W",
	"Ella_R",
	"Guinevere_H",
	"Jad_H",
	"Joanne_T",
	"Joseph_C",
	"Joshua_N",
	"Kevin_J",
	"Liam_M",
	"MaiLyn_M",
	"Matthew_M",
	"Neha_M",
	"River_C",
	"Ryan_J",
	"Sydney_D",
	"Gustavo_R"
]
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