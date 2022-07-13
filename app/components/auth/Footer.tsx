import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

const Footer = () => {
	return (
		<View>
			<Text style={styles.text}>or connect via these social networks</Text>
			<View style={styles.containter}>
				<TouchableOpacity activeOpacity={0.7}>
					<Icon name="facebook" size={50} color="#3b5998" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.7}>
					<Icon name="twitter" size={50} color="#1DA1F2" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.7}>
					<Icon name="snapchat-ghost" size={50} color="#FFFC00" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	containter: {
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 10,
		alignContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		color: "grey",
		paddingTop: 10,
		margin: 5,
	},
});
