import {
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import Colors from "../../theme/Colors";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getUser } from "../../../src/graphql/queries";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParams } from "../mainStack/MainStack";

type chatListScreenNavigationProp = StackNavigationProp<
	MainStackParams,
	"chatList"
>;

type Props = {
	navigation: chatListScreenNavigationProp;
};

const ChatList = ({ navigation }: Props) => {
	const darkMode = useRecoilValue(DarkMode);

	const [userChatroom, setUserChatroom] = useState([]);

	useEffect(() => {
		const fetchChatRooms = async () => {
			try {
				const userInfo = await Auth.currentAuthenticatedUser();

				const userData = await API.graphql(
					graphqlOperation(getUser, {
						id: userInfo.attributes.sub,
					})
				);

				setUserChatroom(userData.data.getUser.chatRoom.items);
			} catch (err) {
				console.log(err);
			}
		};
		fetchChatRooms();
	}, [userChatroom]);

	const NavChatRoom = (id: any) => {
		navigation.navigate("ChatRoomPage", { id: id });
	};

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
				<Text
					style={{
						margin: 20,
						fontWeight: "bold",
						fontSize: 20,
						alignSelf: "center",
						color: darkMode ? Colors.white : Colors.black,
					}}
				>
					All Chat Rooms
				</Text>
				{userChatroom.map(
					(
						item: { id: string; chatRoomID: string; userID: string },
						index: number
					) => (
						<TouchableOpacity
							key={index}
							style={styles.card}
							activeOpacity={0.6}
							onPress={() => NavChatRoom(item.chatRoomID)}
						>
							<View>
								<Text
									style={{
										fontSize: 15,
										color: darkMode ? Colors.white : Colors.black,
									}}
								>
									chat room ID: {item.chatRoomID}
								</Text>
								<Text
									style={{
										fontSize: 15,
										color: darkMode ? Colors.white : Colors.black,
									}}
								>
									{" "}
									User ID: {item.userID}
								</Text>
								<Text
									style={{
										fontSize: 15,
										color: darkMode ? Colors.white : Colors.black,
									}}
								>
									{" "}
									Chat number: {index}
								</Text>
							</View>
						</TouchableOpacity>
					)
				)}
			</ScrollView>
		</>
	);
};

export default ChatList;

const styles = StyleSheet.create({
	card: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.primary,
		margin: 15,
		marginVertical: 20,
		padding: 10,
	},
});
