import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import { TextInput } from "react-native-gesture-handler";

type Props = {
	title: string;
	Userattribute: string;
};

const Card = ({ title, Userattribute }: Props) => {
	const darkMode = useRecoilValue(DarkMode);
	const [edit, setEdit] = useState(false);

	const toggleEdit = () => setEdit(!edit);

	return (
		<View style={{ padding: 10, paddingHorizontal: 30 }}>
			<Text
				style={[
					styles.userText,
					{
						color: darkMode ? Colors.white : Colors.black,
					},
				]}
			>
				{title}:
			</Text>
			<Text
				style={[
					styles.userText,
					{
						color: darkMode ? Colors.white : Colors.black,
					},
				]}
			>
				{Userattribute}
			</Text>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	userText: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		fontSize: 18,
		marginBottom: 5,
		padding: 5,
	},
});
