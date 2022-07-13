import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import Colors from "../../theme/Colors";

const Loader = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<LottieView source={require("../assets/LoaderAni.json")} autoPlay loop />
		</View>
	);
};

export default Loader;

const styles = StyleSheet.create({});
