import {
	StyleSheet,
	Text,
	ScrollView,
	StatusBar,
	TouchableOpacity,
	View,
	FlatList,
	TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { DarkMode } from "../../recoil/Atoms";
import Colors from "../../theme/Colors";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../../src/graphql/queries";
import UserListItem from "../../components/userListItem/UserListItem";

const UserList = () => {
	const darkMode = useRecoilValue(DarkMode);

	const [users, setUser] = useState<any>();
	const [search, setSearch] = useState("");
	const [Searchedusers, setSearchedUser] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			
			try {
				const result = await API.graphql(graphqlOperation(listUsers));
				const list =result.data.listUsers.items

				const item = list.filter((item: { id: number; }) => item.id !== userInfo.attributes.sub)

				setUser(item)
			} catch (err) {
				console.log(err);
			}
		};
		fetchUsers();
	}, [users]);


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
				<View>
				<Text
					style={{
						margin: 20,
						fontWeight: "bold",
						fontSize: 20,
						alignSelf: "center",
						color: darkMode ? Colors.white : Colors.black,
					}}
				>
					All Users
				</Text>
					<FlatList
						data={users}
						renderItem={({ item }) => <UserListItem user={item} navigation={undefined}  />}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</ScrollView>
		</>
	);
};

export default UserList;

const styles = StyleSheet.create({
	sectionTitle: {
		margin: 20,
		fontWeight: "bold",
		fontSize: 20,
		alignSelf: "center",
	},
	card: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.primary,
		margin: 15,
		marginVertical: 20,
		padding: 10,
	},
	todoContainer: {
		backgroundColor: Colors.white,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: Colors.primary,
		margin: 10,
		padding: 10,
	},
	textInput: {
		borderWidth: 5,
		borderColor: Colors.primary,
		marginVertical: 10,
		padding: 10,
		borderRadius: 15,
		marginHorizontal: 10,
	},
});
