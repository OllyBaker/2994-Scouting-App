import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Button } from 'react-native';
import styles from './styles'
import QRCode from 'react-native-qrcode-svg';
import * as dataMap from './dataMap'
import { Buffer } from 'buffer';

const qrCodeBytes = 100;
export default class QRCodeGenerator extends React.Component {
	render() {
		let codes = [];
		
        for (match in this.props.data) {
            codes.push(
                <QRCode
                    size={Dimensions.get("window").width - 100}
                    
                    value={JSON.stringify(this.props.data[match])}
                />
            )
        }

		console.log(codes);

		return <View>
			<QRCodeViewer codes={codes}></QRCodeViewer>
			<View style={{ height: 50 }}></View>
			<Button onPress={() => this.props.return()} title={"Back"}></Button>
		</View>
	}
}

class QRCodeViewer extends React.Component {
	state = {
		codeIndex: 0
	}
	render() {
		return (<View>
			{this.props.codes[this.state.codeIndex]}
			{this.props.codes.length > 1 ? (<View>
				<View style={{ height: 50 }}></View>
				<View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
					<TouchableOpacity style={{ flex: 1, minWidth: 100 }} onPress={() => this.setState({ codeIndex: this.state.codeIndex - 1 })} disabled={this.state.codeIndex <= 0}>
						<Text style={{ ...styles.font.navButton }}>Previous</Text>
					</TouchableOpacity>
					<View style={{ flex: 5, ...styles.align.center }}>
						<Text style={{ ...styles.align.center, ...styles.font.subHeader }}>
							{(1 + this.state.codeIndex).toString()} / {this.props.codes.length.toString()}
						</Text>
					</View>
					<TouchableOpacity style={{ flex: 1, minWidth: 100 }} onPress={() => this.setState({ codeIndex: this.state.codeIndex + 1 })} disabled={this.state.codeIndex >= this.props.codes.length - 1}>
						<Text style={{ ...styles.font.navButton, textAlign: "right" }}>Next</Text>
					</TouchableOpacity>
				</View>
			</View>) : null}
		</View>
		);

	}
}