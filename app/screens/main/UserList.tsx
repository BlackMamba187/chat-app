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
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../../../src/graphql/queries";
import UserListItem from "../../components/userListItem/UserListItem";

const UserList = () => {
	const darkMode = useRecoilValue(DarkMode);

	const [users, setUser] = useState();
	const [search, setSearch] = useState("");
	const [Searchedusers, setSearchedUser] = useState();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const result = await API.graphql(graphqlOperation(listUsers));
				setUser(result.data.listUsers.items);
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
