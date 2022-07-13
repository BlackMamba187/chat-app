import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SideMenu from "../../components/navigation/SideMenu";
import UserProfile from "../main/UserProfile";

import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import Colors from "../../theme/Colors";
import ChatRoomPage from "../main/ChatRoomPage";

// add more screens to this if you dont want it to appear with tabbar or Sidemenu
const Stack = createStackNavigator();

export type MainStackParams = {
	userList: any;
	chatList: any;
	userProfile: any;
	ChatRoomPage: any;
};

const MainStack = () => {
	const darkMode = useRecoilValue(DarkMode);
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="App"
				options={{ headerShown: false }}
				component={SideMenu}
			/>
			<Stack.Screen
				name="userProfile"
				component={UserProfile}
				options={{
					title: "Your Profile",
					headerTitleAlign: "center",
					headerTintColor: Colors.primary,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: darkMode ? Colors.black : Colors.white,
					},
				}}
			/>
			<Stack.Screen
				name="ChatRoomPage"
				component={ChatRoomPage}
				options={{
					
					headerTitleAlign: "center",
					headerTintColor: Colors.primary,
					headerShadowVisible: false,
					headerStyle: {
						backgroundColor: darkMode ? Colors.black : Colors.white,
					},
				}}
			/>
			
		</Stack.Navigator>
	);
};

export default MainStack;

const styles = StyleSheet.create({});
