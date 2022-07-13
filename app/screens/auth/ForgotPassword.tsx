import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Colors from "../../theme/Colors";
import AuthButton from "../../components/auth/AuthButton";
import Footer from "../../components/auth/Footer";
import Logo from "../../components/auth/Logo";
import { Authstyles } from "../../theme/Styles";
import AuthInput from "../../components/auth/AuthInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../authStack/AuthStack";

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	"ForgotPassword"
>;

type Props = {
	navigation: ForgotPasswordScreenNavigationProp;
};

const ForgotPassword = ({navigation}: Props) => {
	const Submit = () => {
    navigation.navigate("ChangePassword");
  };

	return (
		<ScrollView
			style={Authstyles.container}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ minHeight: "95%" }}
		>
			<View style={Authstyles.header}>
			<Logo />
			</View>
			<Text style={[styles.title]}>Forgot Password?</Text>
			<View style={[Authstyles.footer]}>
				<AuthInput
					placeholder={"Username"}
					value={undefined}
					change={undefined}
					secureTextEntry={false}
				/>

				<AuthButton title="Send Code" onPress={Submit} mode="contained" />
			</View>
		</ScrollView>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		alignSelf: "center",
		color: Colors.primary,
	},
  link: {
		color: Colors.primary,
	},
});
