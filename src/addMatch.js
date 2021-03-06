import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles'
import * as inputs from './inputs.js'
import { startLevelOptions, dataNames, dataTypes, assistOptions, gamePieceOptions, threeOptions, climbOptions, defaultAssistOption, defaultClimbOption, defaultGamePieceOption, defaultThreeOptions, powerCellPickup, controlPanel, startLevel, crossedInitiation } from './dataMap'


export const addMatchStyles = {
	mainPopup: {
		...styles.shadow,
		flex: 1,
		flexDirection: "column",
		...styles.align.center,
		width: "100%",
		height: "75%",
		backgroundColor: "#ffffff",
		zIndex: 100,
		elevation: 10,
		justifyContent: "space-between",
		padding: 10
	},
	header: {
		container: {
			...styles.align.center,
			flex: 0.5
		},
		text: {
			...styles.font.header
		}
	},
	controlBar: {
		flex: 0.5,
		flexDirection: 'row',
		width: '100%',
		justifyContent: "space-between",
		alignItems: "center"
	},
	inputs: {
		flex: 3,
		flexDirection: 'column',
		width: '100%',
		padding: 25,
		justifyContent: "center",
	},
	button: {
		flex: 1,
		fontSize: 16,
		...styles.font.standardText,
		...styles.align.center,
		width: "100%",
		height: "100%",
		flexDirection: "row",
		margin: 10,
		zIndex: 100000
	},
	buttonText: {
		flex: 1,
		...styles.font.navButton,
		...styles.align.center,
		color: styles.colors.highlight.bg
	},
	numberInput: {
		marginVertical: "10%"
	}
}
const Spacer = (props) => (<View style={{ flex: 0.1 }}></View>);

const dataEntryStyles = {
	header: {
		//...styles.align.center,
		//textAlign: "center",
		...styles.font.header,
		flex: 1
	},
	gamePieceInput: {
		flex: 1
	},
	navigationButton: {
		fontSize: 16,
		...styles.font.standardText,
		height: "100%",
		flexDirection: "row",
		zIndex: 100000,
		flex: 1
	},
	buttonText: {
		...styles.font.standardText,
		width: "100%",
		textAlign: "left",
		color: styles.colors.highlight.bg
	},
	controlBarButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: styles.colors.dangerous.bg,
		width: "100%",
		margin: 5
	}
}

export default class AddMatchPopup extends React.Component {
	state = {
		teamNumber: 0,
		matchNumber: 0,
		scoutName: 0
		
	}
	render() {
		let disabled = !(this.state.teamNumber && this.state.matchNumber);
		return (
			<View style={addMatchStyles.mainPopup}>
				{/* Create a new match */}
				<View style={addMatchStyles.header.container}>
					<Text style={addMatchStyles.header.text}>
						Create a new match
					</Text>
				</View>
				{/* Actual data entry */}
				<View style={addMatchStyles.inputs}>
					{/* Match number */}
					<inputs.LabeledInput textStyle={styles.font.inputHeader} style={addMatchStyles.numberInput} label="Enter a match number">
						<inputs.NumberInput allowEmpty onValueChange={(newMatchNumber) => this.setState({ matchNumber: newMatchNumber })}></inputs.NumberInput>
					</inputs.LabeledInput>
					{/* Team number */}
					<inputs.LabeledInput textStyle={styles.font.inputHeader} style={addMatchStyles.numberInput} label="Enter a team number">
						<inputs.NumberInput allowEmpty onValueChange={(newTeamNumber)=>this.setState({teamNumber: newTeamNumber})}></inputs.NumberInput>
					</inputs.LabeledInput>
					{/*Scout Name*/}
					{/* <inputs.LabeledInput textStyle={styles.font.inputHeader} style={addMatchStyles.numberInput} label="Enter a Scout ID">
						<inputs.NumberInput allowEmpty onValueChange={(newScoutNumber) => this.setState({ scoutName: newScoutNumber })}></inputs.NumberInput>
					</inputs.LabeledInput> */}
					<Spacer></Spacer>
					{/* <inputs.LabeledInput textStyle={styles.font.inputHeader} style={addMatchStyles.numberInput} label="Team colour">
						<inputs.PickerInput value={this.props.data[dataNames.colourChoice]} options={teamColour}
							onValueChange={(selected) => this.dataUpdated(selected, dataNames.colourChoice)}
							style={{
								backgroundColor:
									this.props.data[dataNames.colourChoice] == climbOptions[teamColour] ?
										styles.colors.tertiary.bg : styles.colors.secondary.bg
							}}></inputs.PickerInput>
					</inputs.LabeledInput> */}
					
				</View>
				{/* Submit and cancel buttons */}
				<View style={addMatchStyles.controlBar}>
					{/* Cancel button */}
					<TouchableOpacity
						onPress={this.props.onCancel}
						style={addMatchStyles.button}
					><Text
							style={addMatchStyles.buttonText}>
							Cancel
						</Text>
					</TouchableOpacity>


					{/* Submit button */}
					<TouchableOpacity
						disabled={disabled}
						onPress={() => this.props.onSubmit(this.state.teamNumber, this.state.matchNumber, this.state.scoutName)}
						style={addMatchStyles.button}
					><Text
							style={[{ ...addMatchStyles.buttonText, fontWeight: "bold" }, disabled ? { color: "#e0e0e0" } : null]}>
							Submit
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
