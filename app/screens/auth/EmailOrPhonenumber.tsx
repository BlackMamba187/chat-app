import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AuthButton from "../../components/auth/AuthButton";
import Footer from "../../components/auth/Footer";
import Logo from "../../components/auth/Logo";
import { Authstyles, fullWidth } from "../../theme/Styles";
import { AuthStackParams } from "../authStack/AuthStack";
import Colors from "../../theme/Colors";

type EmailOrPhonenumberScreenNavigationProp = StackNavigationProp<
	AuthStackParams,
	"EmailOrPhonenumber"
>;

type Props = {
	navigation: EmailOrPhonenumberScreenNavigationProp;
};

const EmailOrPhonenumber = ({ navigation }: Props) => {
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ minHeight: "95%" }}
		>
			<View style={Authstyles.header}>
			<Logo />
			</View>
			<Text style={[styles.title]}>Sign up using your...</Text>
			<View style={[Authstyles.footer]}>
				<AuthButton
					title="Email address"
					onPress={() => navigation.navigate("SignUp", { Option: "Email" })}
					mode="contained"
				/>
				<AuthButton
					title="Phone number"
					onPress={() => navigation.navigate("SignUp", { Option: "Phone" })}
					mode="outlined"
				/>
			</View>
			<Footer />
		</ScrollView>
	);
};

export default EmailOrPhonenumber;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		width: fullWidth,
		padding: 20,
	},
	title: {
		paddingVertical: 20,
		marginBottom: 30,
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.primary,
	},
});
