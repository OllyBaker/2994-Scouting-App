import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles'
import * as inputs from './inputs'
import MatchList from './listMatches'
import { addMatchStyles } from './addMatch'
import { startLevelOptions, dataNames, dataTypes, assistOptions, gamePieceOptions, threeOptions, climbOptions, defaultAssistOption, defaultClimbOption, defaultGamePieceOption, defaultThreeOptions } from './dataMap'

const headingPadding = 50;

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

const Row = (props) =>
	(<View style={[{
		width: "100%",
		paddingBottom: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row"
	}, props.style]}>{props.children}
	</View>);
const Spacer = (props) => (<View style={{ flex: 0.1 }}></View>);

export default class DataEntry extends React.Component {
	state = {
		dead: false
	}
	Toggle = (props) => <Row style={{ marginBottom: 10 }}>
		<inputs.LabeledInput textStyle={styles.font.dataEntry} label={props.label} style={dataEntryStyles.gamePieceInput}>
			<inputs.ToggleInput
				onValueChange={(selected) =>
					this.dataUpdated(selected, props.variable)}
				activeText={"Yes"}
				inactiveText={"No"}
				value={this.props.data[props.variable]}></inputs.ToggleInput>
		</inputs.LabeledInput>
	</Row>

	Timer = (props) => <Row style={{ marginBottom: 10 }}>
		<inputs.LabeledInput textStyle={styles.font.dataEntry} label={props.label} style={dataEntryStyles.gamePieceInput}>
			<inputs.TimerInput
				onValueChange={(selected) =>
					this.dataUpdated(selected, props.variable)}
				value={this.props.data[props.variable]}></inputs.TimerInput>
		</inputs.LabeledInput>
	</Row>

	constructor(props) {
		super(props);
		let newData = {
			...this.props.data
		}
		if (!newData[dataNames.startLevel[0]]) newData[dataNames.startLevel[0]] = startLevelOptions[0];

		for (let i = 0; i < dataNames.cargo.length; i++) {
			if (!newData[dataNames.cargo[i]]) newData[dataNames.cargo[i]] = gamePieceOptions[defaultGamePieceOption];
			if (!newData[dataNames.hatch[i]]) newData[dataNames.hatch[i]] = gamePieceOptions[defaultGamePieceOption];
		}

		for (let i in dataNames.rocketHatch) {
			if (!newData[dataNames.rocketHatch[i]]) newData[dataNames.rocketHatch[i]] = 0;
			if (!newData[dataNames.rocketCargo[i]]) newData[dataNames.rocketCargo[i]] = 0;
		}
		if (!newData[dataNames.shipCargo[0]]) newData[dataNames.shipCargo[0]] = 0;
		if (!newData[dataNames.shipHatch[0]]) newData[dataNames.shipHatch[0]] = 0;

		if (!newData[dataNames.climbing.levelReached]) newData[dataNames.climbing.levelReached] = climbOptions[defaultClimbOption];
		if (!newData[dataNames.climbing.assist]) newData[dataNames.climbing.assist] = assistOptions[defaultThreeOptions];

		for (let attribute in dataNames.attributes) {
			if (!newData[dataNames.attributes[attribute]]) newData[dataNames.attributes[attribute]] = false;
		}

		for (let gameInfo in dataNames.gameInfo) {
			if (!newData[dataNames.gameInfo[gameInfo]]) newData[dataNames.gameInfo[gameInfo]] = 0;
		}

		this.props.onDataChange(newData);
		this.originalValue = this.props.data;
	}
	dataUpdated(data, property) {
		let newData = {
			...this.props.data
		};
		newData[property] = data;
		this.props.onDataChange(newData);
	}
	onCancel() {
		this.props.onDataChange(this.originalValue);
		this.props.return();
	}
	onDone() {
		this.props.return();
	}
	runDeleteMessage() {
		const self = this;
		Alert.alert("Are you sure?",
			"Deleting a match cannot be undone.",
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: "Yes", onPress: () => {
						self.delete();
					}
				}
			],
			{ cancelable: true });
	}
	delete() {
		this.setState({ dead: true });
		this.props.delete();
		this.props.return();
	}
	render() {
		if (this.state.dead) return <View></View>
		let sandstormRockets = [];

		sandstormRockets.push(<Row key={20}>
			{/* <inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Hatch " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={this.props.data[dataNames.hatch[i]]} options={gamePieceOptions}
						onValueChange={(selected) => this.dataUpdated(selected, dataNames.hatch[i])}
						style={{
							backgroundColor:
								this.props.data[dataNames.hatch[i]] == gamePieceOptions[defaultGamePieceOption] ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput> */}

			<Spacer></Spacer>

			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"# of Balls shot into Low Goal"} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.props.data[dataNames.shooting.teleLow]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.hatchesDropped)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>
			</Row>

			<Spacer></Spacer>

			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"# of Balls shot into High Goal"} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.props.data[dataNames.shooting.teleHigh]} onValueChange={(value) => this.dataUpdated(value, dataNames.teleHigh)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>
			</Row>

			<Spacer></Spacer>

			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"# of Balls Missed"} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.props.data[dataNames.shooting.autoMissed]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.hatchesDropped)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>
			</Row>

			<Spacer></Spacer>

			{/* <inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Cargo " + (i + 1)} style={dataEntryStyles.gamePieceInput}>
					<inputs.PickerInput value={this.props.data[dataNames.cargo[i]]} options={gamePieceOptions}
						onValueChange={(selected) => this.dataUpdated(selected, dataNames.cargo[i])}
						style={{
							backgroundColor:
								this.props.data[dataNames.cargo[i]] == gamePieceOptions[defaultGamePieceOption] ?
									styles.colors.tertiary.bg : styles.colors.secondary.bg
						}}
					></inputs.PickerInput>
				</inputs.LabeledInput> */}
		</Row>)


		let teleopRockets = [];
		let key = 0;

		teleopRockets.push(<Row key={key++}>
			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Fuel Cells Scored in Low Port"} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.props.data[dataNames.shooting.teleLow]} onValueChange={(value) => this.dataUpdated(value, dataNames.teleLow)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>
			</Row>
		</Row>)


		teleopRockets.push(<Row key={key++}>
			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Fuel Cells Scored in High Port"} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.props.data[dataNames.shooting.teleHigh]} onValueChange={(value) => this.dataUpdated(value, dataNames.teleHigh)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>
			</Row>
		</Row>)
		teleopRockets.push(<Row key={key++}>
			<Row>
				<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"# of balls missed"} style={dataEntryStyles.gamePieceInput}>
					<inputs.ClickerInput value={this.props.data[dataNames.shooting.teleMissed]} onValueChange={(value) => this.dataUpdated(value, dataNames.teleHigh)}>
					</inputs.ClickerInput>
				</inputs.LabeledInput>
			</Row>
		</Row>)

		let climbing = [];


		climbing.push(<Row key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Time to Park"} style={dataEntryStyles.gamePieceInput}>
				<inputs.TimeInput value={this.props.data[dataNames.gameInfo.parkingTime]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.parkingTime)}>
				</inputs.TimeInput>
			</inputs.LabeledInput>
		</Row>)
		climbing.push(<Row key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Able to Climb"} style={dataEntryStyles.gamePieceInput}>
				<inputs.PickerInput value={this.props.data[dataNames.climbing.ableToClimb]} options={threeOptions}
					onValueChange={(selected) => this.dataUpdated(selected, dataNames.climbing.ableToClimb)}
					style={{
						backgroundColor:
							this.props.data[dataNames.climbing.ableToClimb] == climbOptions[defaultClimbOption] ?
								styles.colors.tertiary.bg : styles.colors.secondary.bg
					}}
				></inputs.PickerInput>
			</inputs.LabeledInput>
		</Row>)

		climbing.push(<Row key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Mobility when hanging"} style={dataEntryStyles.gamePieceInput}>
				<inputs.PickerInput value={this.props.data[dataNames.climbing.hangingMobility]} options={threeOptions}
					onValueChange={(selected) => this.dataUpdated(selected, dataNames.climbing.hangingMobility)}
					style={{
						backgroundColor:
							this.props.data[dataNames.climbing.hangingMobility] == climbOptions[defaultClimbOption] ?
								styles.colors.tertiary.bg : styles.colors.secondary.bg
					}}
				></inputs.PickerInput>
			</inputs.LabeledInput>
		</Row>)

		climbing.push(<Row key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Can lift ally"} style={dataEntryStyles.gamePieceInput}>
				<inputs.PickerInput value={this.props.data[dataNames.climbing.assist]} options={threeOptions}
					onValueChange={(selected) => this.dataUpdated(selected, dataNames.climbing.assist)}
					style={{
						backgroundColor:
							this.props.data[dataNames.climbing.assist] == climbOptions[defaultClimbOption] ?
								styles.colors.tertiary.bg : styles.colors.secondary.bg
					}}
				></inputs.PickerInput>
			</inputs.LabeledInput>
		</Row>)

		climbing.push(<Row key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Generator Switch Level"} style={dataEntryStyles.gamePieceInput}>
				<inputs.PickerInput value={this.props.data[dataNames.climbing.balanced]} options={threeOptions}
					onValueChange={(selected) => this.dataUpdated(selected, dataNames.climbing.balanced)}
					style={{
						backgroundColor:
							this.props.data[dataNames.climbing.balanced] == climbOptions[defaultThreeOptions] ?
								styles.colors.tertiary.bg : styles.colors.secondary.bg
					}}
				></inputs.PickerInput>
			</inputs.LabeledInput>
		</Row>)

		climbing.push(<Row key={key++}>
			<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Time to Climb"} style={dataEntryStyles.gamePieceInput}>
				<inputs.TimeInput value={this.props.data[dataNames.gameInfo.climbingTime]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.climbingTime)}>
				</inputs.TimeInput>
			</inputs.LabeledInput>
		</Row>)

		return (<View key={0} style={{ width: "100%", flex: 1, flexDirection: "column" }}>
			{/* Submit and cancel buttons */}
			<Row>
				{/* Cancel button */}
				<TouchableOpacity
					onPress={() => this.onCancel()}
					style={dataEntryStyles.navigationButton}
				>
					<Text style={dataEntryStyles.buttonText}>
						Cancel
					</Text>
				</TouchableOpacity>


				{/* Submit button */}
				<TouchableOpacity
					onPress={() => this.onDone()}
					style={dataEntryStyles.navigationButton}
				>
					<Text style={{ ...dataEntryStyles.buttonText, fontWeight: "bold", textAlign: "right" }}>
						Done
					</Text>
				</TouchableOpacity>
			</Row>
			<View style={{ height: 30 }}></View>
			<ScrollView>
				<Row>
					<MatchList editable matches={[this.props.data]}></MatchList>
				</Row>
				<View style={{ height: headingPadding }}></View>
				{/* Auto phase */}
				<Row>
					<Text style={dataEntryStyles.header}>
						Autonomous
					</Text>
				</Row>
				<Row style={{ paddingBottom: 5 }}>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Start Level"} style={dataEntryStyles.gamePieceInput}>
						<inputs.PickerInput value={this.props.data[dataNames.startLevel[0]]} options={startLevelOptions} onValueChange={(selected) => this.dataUpdated(selected, dataNames.startLevel[0])}
							style={{
								backgroundColor:
									this.props.data[dataNames.startLevel[0]] == startLevelOptions[0] ?
										styles.colors.tertiary.bg : styles.colors.secondary.bg
							}}
						></inputs.PickerInput>
					</inputs.LabeledInput>
				</Row>
				{sandstormRockets}

				<Row style={{ paddingTop: headingPadding }}>
					<Text style={dataEntryStyles.header}>
						Tele-op
					</Text>
				</Row>
				{teleopRockets}

				<Row style={{ paddingTop: headingPadding }}>
					<Text style={dataEntryStyles.header}>
						Climbing
					</Text>
				</Row>
				{climbing}

				<Row style={{ paddingTop: headingPadding }}>
					<Text style={dataEntryStyles.header}>
						Attributes
					</Text>
				</Row>
				<this.Toggle label="Did the robot break?" variable={dataNames.attributes.broken}></this.Toggle>
				<this.Toggle label="Did the robot tip?" variable={dataNames.attributes.tip}></this.Toggle>
				{/*<this.Toggle label="Can the robot pick up cargo from the depot?" variable={dataNames.attributes.cargoFromDepot}></this.Toggle>*/}
				<this.Toggle label="Can it pick up fuel cells from the floor?" variable={dataNames.attributes.hatchesFromFloor}></this.Toggle>
				<this.Toggle label="Can it go move through the trench?" variable={dataNames.attributes.moveTrench}></this.Toggle>

				<Row>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Time spent on opponents side of field"} style={dataEntryStyles.gamePieceInput}>
						<inputs.TimeInput value={this.props.data[dataNames.gameInfo.opposingSideTime]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.opposingSideTime)}>
						</inputs.TimeInput>
					</inputs.LabeledInput>
				</Row>

				{/*<Row>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Total penalty points earned by alliance"} style={dataEntryStyles.gamePieceInput}>
						<inputs.ClickerInput value={this.props.data[dataNames.gameInfo.penaltyPoints]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.penaltyPoints)}>
						</inputs.ClickerInput>
					</inputs.LabeledInput>
				</Row>*/}

				<Row>
					<inputs.LabeledInput textStyle={styles.font.dataEntry} label={"Number of fuel cells dropped"} style={dataEntryStyles.gamePieceInput}>
						<inputs.ClickerInput value={this.props.data[dataNames.gameInfo.fuelCellsDropped]} onValueChange={(value) => this.dataUpdated(value, dataNames.gameInfo.hatchesDropped)}>
						</inputs.ClickerInput>
					</inputs.LabeledInput>
				</Row>

				<View style={{ height: 50 }}></View>
				<Row>
					<TouchableOpacity onPress={() => { this.runDeleteMessage() }} style={dataEntryStyles.controlBarButton}>
						<Text style={{ color: styles.colors.dangerous.text, ...styles.font.standardText }}>
							Delete Match
						</Text>
					</TouchableOpacity>
				</Row>
				<View style={{ height: 150 }}></View>
			</ScrollView>
		</View>)
	}
}