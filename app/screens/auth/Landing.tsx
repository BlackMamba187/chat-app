import React from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import AuthButton from "../../components/auth/AuthButton";

import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParams } from "../authStack/AuthStack";
import Footer from "../../components/auth/Footer";
import Logo from "../../components/auth/Logo";
import { Authstyles, fullWidth } from "../../theme/Styles";
import Colors from "../../theme/Colors";
import AuthInput from "../../components/auth/AuthInput";

type LandingScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	"Landing"
>;

type Props = {
	navigation: LandingScreenNavigationProp;
};

const Landing = ({ navigation }: Props) => {
	return (
		<ScrollView
			style={Authstyles.container}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ minHeight: "95%" }}
		>
			<View style={Authstyles.header}>
			<Logo />
			</View>

			<View style={[Authstyles.footer]}>
				<AuthButton
					title="Sign in"
					onPress={() => navigation.navigate("SignIn")}
					mode="contained"
				/>
				<AuthButton
					title="Sign up"
					onPress={() => navigation.navigate("EmailOrPhonenumber")}
					mode="outlined"
				/>
			</View>
			<Footer />
		</ScrollView>
	);
};

export default Landing;

const styles = StyleSheet.create({
	
});
