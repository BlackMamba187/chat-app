import {
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Image,
	View,
} from "react-native";
import React, { useState } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import {
	createChatRoom,
	createChatRoomUser,
} from "../../../src/graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParams } from "../../screens/mainStack/MainStack";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import Colors from "../../theme/Colors";
import { getUser } from "../../../src/graphql/queries";

const UserListItem = ({ user }: any) => {
	const navigation = useNavigation();

	const darkMode = useRecoilValue(DarkMode);
	const [authUserChatrooms, setAuthUserChatrooms] = useState([]);
	const [otherUserChatrooms, setOtherUserChatrooms] = useState([]);

	const onClick = async () => {
		const userInfo = await Auth.currentAuthenticatedUser({
			bypassCache: true,
		});

		const userData = await API.graphql(
			graphqlOperation(getUser, { id: userInfo.attributes.sub })
		);

		const chatRooms = userData.data.getUser.chatRoom.items.map(function (id: {
			chatRoomID: any;
		}) {
			return id.chatRoomID;
		});

		setAuthUserChatrooms(chatRooms);

		const otherUser = await API.graphql(
			graphqlOperation(getUser, { id: user.id })
		);

		const chatRoomsOtherUser = otherUser.data.getUser.chatRoom.items.map(
			function (id: { chatRoomID: any }) {
				return id.chatRoomID;
			}
		);

		setOtherUserChatrooms(chatRoomsOtherUser);

		//Find if you have a chat with user before you make another one
		const match = authUserChatrooms.filter((val) => {
			return otherUserChatrooms.find((a) => {
				return val === a;
			});
		});
		const matchingVaule = match.toString();

		if (matchingVaule !== "") {
			try {
				navigation.navigate("ChatRoomPage", { id: matchingVaule });
			} catch (e) {
				console.log(e);
			}
		} else  {
			if(matchingVaule == ""){
				try {
					//  1. Create a new Chat Room
					const newChatRoomData = await API.graphql(
						graphqlOperation(createChatRoom, {
							input: {},
						})
					);
		
					if (!newChatRoomData.data) {
						console.log(" Failed to create a chat room");
						return;
					}
		
					const newChatRoom = newChatRoomData.data.createChatRoom;
		
					// 2. Add `user` to the Chat Room
					await API.graphql(
						graphqlOperation(createChatRoomUser, {
							input: {
								userID: user.id,
								chatRoomID: newChatRoom.id,
							},
						})
					);
		
					//  3. Add authenticated user to the Chat Room
					await API.graphql(
						graphqlOperation(createChatRoomUser, {
							input: {
								userID: userInfo.attributes.sub,
								chatRoomID: newChatRoom.id,
							},
						})
					);
					navigation.navigate("ChatRoomPage", { id: newChatRoom.id });
				} catch (e) {
					console.log(e);
				}
			}
		}
	};

	return (
		<TouchableWithoutFeedback onPress={onClick}>
			<View style={styles.container}>
				<View style={styles.lefContainer}>
					<Image source={user.pic} style={styles.avatar} />

					<View style={styles.midContainer}>
						<Text
							style={{
								fontSize: 15,
								fontWeight: "bold",
								color: darkMode ? Colors.white : Colors.black,
							}}
						>
							{user.name}
						</Text>
						<Text
							style={{
								fontSize: 15,
								color: darkMode ? Colors.white : Colors.black,
							}}
						>
							{user.email}
						</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default UserListItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		padding: 10,
	},
	lefContainer: {
		flexDirection: "row",
	},
	midContainer: {
		justifyContent: "space-around",
	},
	avatar: {
		width: 60,
		height: 60,
		borderRadius: 50,
		marginRight: 15,
	},
});
