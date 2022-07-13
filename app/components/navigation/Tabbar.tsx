import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import UserProfile from "../../screens/main/UserProfile";
import ChatList from "../../screens/main/ChatList";
import UserList from "../../screens/main/UserList";
import Colors from "../../theme/Colors";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import { ChatListStackNavigator, UsersListStackNavigator } from "./ScreenStack/ScreenStack";

const Tab = createBottomTabNavigator();



const Tabbar = () => {
	const darkMode = useRecoilValue(DarkMode);
	return (
		<Tab.Navigator
			initialRouteName="userList"
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				headerShown: false,

				tabBarStyle: {
					backgroundColor: darkMode ? Colors.black : Colors.white,
					borderTopColor: Colors.primary,
				},

				tabBarIcon: ({ focused, size, color }) => {
					let iconName;
					if (route.name === "usersListStack") {
						iconName = "users";
						size = focused ? 30 : 25;
						color = focused ? Colors.primary : Colors.grey;
					} else if (route.name === "chatListStack") {
						iconName = "comments";
						size = focused ? 30 : 25;
						color = focused ? Colors.primary : Colors.grey;
					}
					return <Icon name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="usersListStack" component={UsersListStackNavigator} />
			<Tab.Screen name="chatListStack" component={ChatListStackNavigator} />
		</Tab.Navigator>
	);
};

export default Tabbar;

const styles = StyleSheet.create({});
