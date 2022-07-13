import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React from "react";
import Colors from "../../theme/Colors";
import AuthButton from "../../components/auth/AuthButton";
import AuthInput from "../../components/auth/AuthInput";
import Logo from "../../components/auth/Logo";
import { Authstyles } from "../../theme/Styles";

const ChangePassword = () => {
	const Submit = () => {};

	return (
		<ScrollView
			style={Authstyles.container}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ minHeight: "95%" }}
		>
			<View style={Authstyles.header}>
				<Logo/>
			</View>
			<Text style={[Authstyles.title]}>Change Password</Text>
			<View style={[Authstyles.footer]}>
				<AuthInput
					placeholder={"Username"}
					value={undefined}
					change={undefined}
					secureTextEntry={false}
				/>

				<AuthInput
					placeholder={"Enter Code Recieved"}
					value={undefined}
					change={undefined}
					secureTextEntry={false}
				/>

				<AuthInput
					placeholder={"New Password"}
					value={undefined}
					change={undefined}
					secureTextEntry={false}
				/>
				<AuthButton title="Change Password" onPress={Submit} mode="contained" />
			</View>
			<View style={{ alignItems: "center" }}>
				<Text>Didn't recieve code?</Text>
				<TouchableWithoutFeedback>
					<Text style={[Authstyles.link]}>Resend it here</Text>
				</TouchableWithoutFeedback>
			</View>
		</ScrollView>
	);
};

export default ChangePassword;

const styles = StyleSheet.create({
	
});
