import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../theme/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../authStack/AuthStack";
import { Auth } from "aws-amplify";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";
import Footer from "../../components/auth/Footer";
import Logo from "../../components/auth/Logo";
import { Authstyles } from "../../theme/Styles";

type ConfirmSignUpScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	"ConfirmSignUp"
>;

type Props = {
	route: any;
	navigation: ConfirmSignUpScreenNavigationProp;
};

const ConfirmSignUp = ({ navigation, route }: Props) => {
	const [code, setCode] = useState("");

	const { username } = route.params;

	const onConfirmPressed = async () => {
		try {
			await Auth.confirmSignUp(username, code);
			navigation.navigate("SignIn");
		} catch (err) {
			console.log(err);
		}
	};

  const onSendCode = async () => {
		try {
			await Auth.resendSignUp(username);
      console.log('code resent successfully');
		} catch (err) {
			console.log(err);
		}
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

			<Text style={[Authstyles.title]}>Almost there :D</Text>
			<View style={[Authstyles.footer]}>
				<AuthInput
					placeholder={username}
					value={undefined}
					change={undefined}
					secureTextEntry={false}
				/>

				<AuthInput
					placeholder={"Enter Code Recieved"}
					value={code}
					change={(text: string) => setCode(text)}
					secureTextEntry={false}
				/>

				<AuthButton
					title="Sign In"
					onPress={onConfirmPressed}
					mode="contained"
				/>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text>Didn't recieve code?</Text>
				<TouchableWithoutFeedback onPress={onSendCode}>
					<Text style={[Authstyles.link]}>Resend it here</Text>
				</TouchableWithoutFeedback>
			</View>
		</ScrollView>
	);
};

export default ConfirmSignUp;

const styles = StyleSheet.create({});
