import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
	title: string;
	onPress: any;
	mode: any;
}

const AuthButton = (props: Props) => {
	return (
		<TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
			<Button style={styles.button} mode={props.mode}>
				{props.title}
			</Button>
		</TouchableOpacity>
	);
};

export default AuthButton;

const styles = StyleSheet.create({
	button: {
		width: "100%",
		alignSelf: "center",
		justifyContent: "center",
		height: 45,
		marginVertical: 20,
		margin: 10,
		borderRadius: 40,
	},
});
