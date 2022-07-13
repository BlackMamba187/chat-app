import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import { Icon } from "react-native-vector-icons/Icon";
import { MainStackParams } from "../../../screens/mainStack/MainStack";
import ChatList from "../../../screens/main/ChatList";
import ChatRoomPage from "../../../screens/main/ChatRoomPage";
import UserList from "../../../screens/main/UserList";

const Stack = createStackNavigator();

type chatListScreenNavigationProp = StackNavigationProp<
	MainStackParams,
	"chatList"
>;

type Props = {
	navigation: chatListScreenNavigationProp;
};

const ChatListStackNavigator = ({ navigation }: Props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="chatList"
				component={ChatList}
				options={{ headerShown: false }}
			/>

			
		</Stack.Navigator>
	);
};

const UsersListStackNavigator = ({ navigation }: Props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="usersList"
				component={UserList}
				options={{ headerShown: false }}
			/>
			
		</Stack.Navigator>
	);
};
export { ChatListStackNavigator, UsersListStackNavigator };
