import {
	FlatList,
	Image,
	ImageBackground,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	VirtualizedList,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import Colors from "../../theme/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import Card from "../../components/global/Card";

const DATA: never[] = [];

type Props = {
	route: any;
};

const UserProfile = ({ route }: Props) => {
	const { id, name, email, phone } = route.params;

	const darkMode = useRecoilValue(DarkMode);

	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState();
	const [userPhoneNumber, setUserPhoneNumber] = useState();

	return (
		<>
			<StatusBar backgroundColor={Colors.primary} />
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: darkMode ? Colors.black : Colors.white,
					paddingTop: 10,
				}}
			>
				<View style={styles.headerContainer}>
					<ImageBackground
						style={styles.headerBackgroundImage}
						blurRadius={10}
						source={{ uri: "https://reactjs.org/logo-og.png" }}
					>
						<View style={styles.headerColumn}>
							<Image
								style={styles.userImage}
								source={{
									uri: "https://gyazo.com/57978cd258f9d7e06369fde855ad4bd6.png",
								}}
							/>
							
							<View style={{ padding: 10, flexDirection: "row" }}>
								<TouchableOpacity
									activeOpacity={0.8}
									style={{
										width: 30,
										height: 30,
										backgroundColor: Colors.primary,
										top: -60,
										right: -50,
										borderRadius: 50,
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Icon color={Colors.white} name="edit" size={15} />
								</TouchableOpacity>
							</View>
							
						</View>
					</ImageBackground>
					<Card title={"current user name"} Userattribute={name} />
					<Card title={"current email address"} Userattribute={email} />
					<Card title={"current phone number"} Userattribute={phone} />
				</View>
			</ScrollView>
		</>
	);
};

export default UserProfile;

const styles = StyleSheet.create({
	headerBackgroundImage: {
		paddingBottom: 20,
		paddingTop: 45,
	},
	headerContainer: {},
	headerColumn: {
		backgroundColor: "transparent",
		...Platform.select({
			ios: {
				alignItems: "center",
				elevation: 1,
				marginTop: -1,
			},
			android: {
				alignItems: "center",
			},
		}),
	},
	userImage: {
		borderColor: "#FFF",
		borderRadius: 85,
		borderWidth: 3,
		height: 170,
		marginBottom: 15,
		width: 170,
	},
	userNameText: {
		color: Colors.white,
		fontSize: 10,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "center",
	},
});
