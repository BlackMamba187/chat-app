import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useState } from "react";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";
import Footer from "../../components/auth/Footer";
import Logo from "../../components/auth/Logo";
import { Authstyles, fullWidth } from "../../theme/Styles";
import Colors from "../../theme/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../authStack/AuthStack";
import { Auth } from "aws-amplify";
import EmailOrPhonenumber from "./EmailOrPhonenumber";
import Loader from "../../components/global/Loader";

type SignUpScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	"SignUp"
>;

type Props = {
	route: any;
	navigation: SignUpScreenNavigationProp;
};

const SignUp = ({ navigation, route }: Props) => {
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const { Option } = route.params;

	const Submit = async () => {
		const data = {
			username: userName,
			email: email,
			password: password,
			phonenumber: phoneNumber,
		};

		if (loading) {
			return <Loader />;
		}

		setLoading(true);
		try {
			await Auth.signUp({
				username: data.username,
				password: data.password,
				attributes: {
					email: data.email,
					phone_number: data.phonenumber,
				},
			});
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
		navigation.navigate("ConfirmSignUp", { username: data.username });
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
			<Text style={[styles.title]}>Join us... Join us...</Text>

			<View style={[Authstyles.footer]}>
				<AuthInput
					placeholder={"Username"}
					value={userName}
					change={(text: string) => setUserName(text)}
					secureTextEntry={false}
				/>
				{(() => {
					switch (Option) {
						case "Email":
							return (
								<AuthInput
									placeholder={"Email Address"}
									value={email}
									change={(text: string) => setEmail(text)}
									secureTextEntry={false}
								/>
							);
						case "Phone":
							return (
								<AuthInput
									placeholder={"Phone Number"}
									value={phoneNumber}
									change={(text: string) => setPhoneNumber(text)}
									secureTextEntry={false}
								/>
							);
						default:
							return <Text>Error 404 Page Not Found</Text>;
					}
				})()}
				<AuthInput
					placeholder={"Password"}
					value={password}
					change={(text: string) => setPassword(text)}
					secureTextEntry={true}
				/>
				<AuthInput
					placeholder={"Repeat Password"}
					value={repeatPassword}
					change={(text: string) => setRepeatPassword(text)}
					secureTextEntry={true}
				/>
				<AuthButton title="Sign In" onPress={Submit} mode="contained" />
			</View>
			<Footer />
		</ScrollView>
	);
};

export default SignUp;

const styles = StyleSheet.create({
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
