import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../../theme/Colors";
import { useRecoilState } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import { Auth } from "aws-amplify";

const CustomSideMenu = (props: any) => {
	const [darkMode, setDarkMode] = useRecoilState(DarkMode);
	const [user, setUser] = useState();

	const [userId, setUserId] = useState();
	const [userName, setUserName] = useState();
	const [userEmail, setUserEmail] = useState();
	const [userPhoneNumber, setUserPhoneNumber] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userInfo = await Auth.currentAuthenticatedUser({
					bypassCache: true,
				});
				setUser(userInfo);
				setUserId(userInfo.attributes.sub);
				setUserName(userInfo.username);
				setUserEmail(userInfo.attributes.email);
				setUserPhoneNumber(userInfo.attributes.phone_number);
			} catch (err) {
				console.log(err);
			}
		};

		fetchUser();
	}, []);

	const toggleSwitch = () => setDarkMode(!darkMode);

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				contentContainerStyle={{
					backgroundColor: Colors.primary,
					flex: 1,
					width: "100%",
					height: "100%",
				}}
			>
				<View style={{ padding: 20 }}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate("userProfile", {
								id: userId,
								name: userName,
								email: userEmail,
								phone: userPhoneNumber,
							});
						}}
					>
						<Image
							style={{
								height: 150,
								width: 150,
								borderRadius: 100,
								borderColor: darkMode ? Colors.black : Colors.white,
								marginBottom: 10,
								alignSelf: "center",
							}}
							source={{uri: 'https://gyazo.com/57978cd258f9d7e06369fde855ad4bd6.png'}}
						/>
					</TouchableOpacity>
					<Text
						style={{
							color: darkMode ? Colors.black : Colors.white,
							fontSize: 18,
							marginBottom: 5,
							padding: 5,
						}}
					>
						{userName}
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						backgroundColor: darkMode ? Colors.black : Colors.white,
						paddingTop: 10,
					}}
				>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<View style={{ backgroundColor: darkMode ? Colors.black : Colors.white }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 10,
					}}
				>
					<Switch
						trackColor={{ false: Colors.primary, true: Colors.primary }}
						thumbColor={darkMode ? Colors.primary : Colors.primary}
						ios_backgroundColor={"#3e3e3e"}
						onValueChange={toggleSwitch}
						value={darkMode}
					/>
					<Text
						style={{
							color: darkMode ? Colors.primary : Colors.grey,
							marginLeft: 16,
						}}
					>
						Dark mode
					</Text>
				</View>
				<TouchableOpacity
					onPress={() => Auth.signOut()}
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 10,
					}}
				>
					<View style={{ padding: 8 }}>
						<Icon name="sign-out-alt" size={30} color={Colors.primary} />
					</View>

					<Text
						style={{
							color: darkMode ? Colors.primary : Colors.grey,
							marginLeft: 16,
						}}
					>
						Sign Out
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CustomSideMenu;
