import { StyleSheet, Text, TextInput, View } from "react-native";

import React, { useState } from "react";

interface Props {
	placeholder: string;
	value: any;
	change: any;
	secureTextEntry: boolean;
}

const AuthInput = (props: Props) => {
	return (
		<View style={[styles.container]}>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				value={props.value}
				onChangeText={props.change}
				secureTextEntry={props.secureTextEntry}
			/>
		</View>
	);
};

export default AuthInput;

const styles = StyleSheet.create({
	input: {
		height: 45,
		margin: 20,
		borderBottomWidth: 1,
		
	},

	container: {
		backgroundColor: "white",
		borderColor: "#e8e8e8",
	},
});
