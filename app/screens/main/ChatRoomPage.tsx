import {
	KeyboardAvoidingView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../theme/Colors";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createMessage } from "../../../src/graphql/mutations";
import { messagesByChatRoom } from "../../../src/graphql/queries";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";

import Input from "../../components/global/Input";

type Props = {
	route: any;
};

const ChatRoomPage = ({ route }: Props) => {
	const darkMode = useRecoilValue(DarkMode);

	const [messages, setMessages] = useState<
		Array<{
			id: string;
			createdAt: string;
			content: string;
			userID: string;
		}>
	>([]);
	const [myUserId, setMyUserId] = useState();

	const chatRoomID = route.params.id;

	const isMyMessage = (id: any) => {
		return id === myUserId;
	};

	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			setMyUserId(userInfo.attributes.sub);
		};
		fetchUser();
	}, []);

	const fetchmessages = async () => {
		try {
			const chatRoomMessages = await API.graphql(
				graphqlOperation(messagesByChatRoom, {
					chatRoomID: chatRoomID,
					sortDirection: "DESC",
				})
			);
			const chatRoomMessageList =
				chatRoomMessages.data.messagesByChatRoom.items;

			const inverted = chatRoomMessageList.reverse();
			setMessages(inverted);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchmessages();
	}, [messages]);

	return (
		<>
			<StatusBar backgroundColor={Colors.primary} />
			<ScrollView
				style={{
					backgroundColor: darkMode ? Colors.black : Colors.white,
				}}
				contentContainerStyle={{ minHeight: "100%" }}
			>
				<Text
					style={[
						styles.sectionTitle,
						{ color: darkMode ? Colors.white: Colors.black },
					]}
				>
					{chatRoomID}
				</Text>
				{messages.map(
					(
						item: {
							id: string;
							createdAt: string;
							content: string;
							userID: string;
						},
						index: number
					) => (
						<View
							key={index}
							style={[
								styles.messageBox,
								{
									backgroundColor: isMyMessage(item.userID)
										? Colors.grey
										: Colors.primary,
									marginLeft: isMyMessage(item.userID) ? "20%" : "5%",
									marginRight: isMyMessage(item.userID) ? "5%" : "20%",
								},
							]}
						>
							<Text> User ID: {item.userID}</Text>
							<Text> content: {item.content}</Text>
							<Text> Created At: {item.createdAt}</Text>
						</View>
					)
				)}
			</ScrollView>
			<View
				style={{
					backgroundColor: darkMode ? Colors.black : Colors.white,
				}}
			>
				<Input chatRoomID={chatRoomID} />
			</View>
		</>
	);
};

export default ChatRoomPage;

const styles = StyleSheet.create({
	messageBox: {
		borderRadius: 15,
		padding: 10,
		marginVertical: 10,
	},
	sectionTitle: {
		margin: 10,
		fontWeight: "bold",
		fontSize: 15,
		alignSelf: "center",
	},
	container: {
		flexDirection: "row",
		alignItems: "flex-end",
		backgroundColor: "white",
		borderRadius: 25,
	},
	mainContainer: {
		flexDirection: "row",

		padding: 10,

		flex: 1,
		alignItems: "flex-end",
	},
	textInput: {
		flex: 1,
		marginHorizontal: 10,
	},

	buttonContainer: {
		backgroundColor: Colors.primary,
		borderRadius: 25,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
});
