import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../auth/Landing";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import ConfirmSignUp from "../auth/ConfirmSignUp";
import ForgotPassword from "../auth/ForgotPassword";
import ChangePassword from "../auth/ChangePassword";
import EmailOrPhonenumber from "../auth/EmailOrPhonenumber";

export type AuthStackParams = {
	Landing: any;
	SignIn: any;
	EmailOrPhonenumber: any;
	SignUp: any;
	ConfirmSignUp: any;
	ForgotPassword: any;
	ChangePassword: any;
};

const Auth = createStackNavigator<AuthStackParams>();

const AuthStack = () => {
	return (
		<Auth.Navigator initialRouteName="Landing">
			<Auth.Screen
				options={{ headerShown: false }}
				name="Landing"
				component={Landing}
			/>
			<Auth.Screen
				options={{ headerShown: false }}
				name="SignIn"
				component={SignIn}
			/>
			<Auth.Screen
				options={{ headerShown: false }}
				name="EmailOrPhonenumber"
				component={EmailOrPhonenumber}
			/>
			<Auth.Screen
				options={{ headerShown: false }}
				name="SignUp"
				component={SignUp}
			/>
			<Auth.Screen
				options={{ headerShown: false }}
				name="ConfirmSignUp"
				component={ConfirmSignUp}
			/>
			<Auth.Screen
				options={{ headerShown: false }}
				name="ForgotPassword"
				component={ForgotPassword}
			/>
			<Auth.Screen
				options={{ headerShown: false }}
				name="ChangePassword"
				component={ChangePassword}
			/>
		</Auth.Navigator>
	);
};

export default AuthStack;

const styles = StyleSheet.create({});
