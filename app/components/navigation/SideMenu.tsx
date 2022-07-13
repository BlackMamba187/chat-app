import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";

import Tabbar from "./Tabbar";
import CustomSideMenu from "./CustomSideMenu";
import Colors from "../../theme/Colors";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import Logo from "../auth/Logo";

const Drawer = createDrawerNavigator();

const SideMenu = () => {
	const darkMode = useRecoilValue(DarkMode);

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomSideMenu {...props} />}
			screenOptions={{
				headerStyle: {
					backgroundColor: darkMode ? Colors.black : Colors.white,
				},
				headerTitleAlign: "center",
				headerTintColor: Colors.primary,
				headerShadowVisible: false,
				headerTitle: () => (
					<Text style={{ color: Colors.primary, fontSize: 30 }}>𝓦𝓱𝓲𝓼𝓹𝓮𝓻</Text>
				),
				drawerActiveBackgroundColor: Colors.primary,
				drawerActiveTintColor: darkMode ? Colors.black : Colors.white,
				drawerInactiveTintColor: darkMode ? Colors.white : Colors.grey,
			}}
		>
			<Drawer.Screen
				name="Home"
				component={Tabbar}
				options={{
					drawerIcon: ({ color }) => (
						<Icon name="home" size={22} color={color} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default SideMenu;

const styles = StyleSheet.create({});
