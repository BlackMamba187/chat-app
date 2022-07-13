import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Colors from './Colors';
export const fullWidth = Dimensions.get("window").width;

export const Authstyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		width: fullWidth,
		padding: 20,
	},
	header: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	footer: {
		flex: 1,
	},
	title: {
		paddingVertical: 20,
		marginBottom: 30,
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.primary,
		alignSelf: "center",
	},
	link: {
		color: Colors.primary,
		alignSelf: "center",
	},
});