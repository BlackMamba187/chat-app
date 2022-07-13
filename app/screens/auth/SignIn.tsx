import {
	Dimensions,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useState } from "react";
import { Authstyles, fullWidth } from "../../theme/Styles";
import Logo from "../../components/auth/Logo";
import Footer from "../../components/auth/Footer";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import Colors from "../../theme/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../authStack/AuthStack";
import { Auth } from "aws-amplify";

type SignInScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	"SignIn"
>;

type Props = {
	navigation: SignInScreenNavigationProp;
};

const SignIn = ({ navigation }: Props) => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const Submit = () => {
		const data = {
			username: userName,
			password: password,
		};
		try {
			Auth.signIn(data.username, data.password);
		} catch (err) {
			console.log(err);
		}
	};

	const onForgotPasswordPressed = () => {
		navigation.navigate("ForgotPassword");
	};

	const onSignUpPress = () => {
		navigation.navigate("EmailOrPhonenumber");
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

			<Text style={[styles.title]}>Welcome Back</Text>
			<View style={[Authstyles.footer]}>
				<AuthInput
					placeholder={"Username"}
					value={userName}
					change={(text: string) => setUserName(text)}
					secureTextEntry={false}
				/>
				<AuthInput
					placeholder={"Password"}
					value={password}
					change={(text: string) => setPassword(text)}
					secureTextEntry={true}
				/>

				<AuthButton title="Sign In" onPress={Submit} mode="contained" />
				<TouchableWithoutFeedback onPress={onForgotPasswordPressed}>
					<Text style={[styles.link]}>Forgot Password?</Text>
				</TouchableWithoutFeedback>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text>Don't have an account?</Text>
				<TouchableWithoutFeedback onPress={onSignUpPress}>
					<Text style={[styles.link]}>Sign up here</Text>
				</TouchableWithoutFeedback>
			</View>
			<Footer />
		</ScrollView>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	link: {
		color: Colors.primary,
	},
	title: {
		fontSize: 20,
		alignSelf: "center",
		color: Colors.primary,
	},
});
