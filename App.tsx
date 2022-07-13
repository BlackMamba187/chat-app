import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Amplify, API, Auth, graphqlOperation, Hub } from "aws-amplify";
import awsmobile from "./src/aws-exports";

import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./app/screens/mainStack/MainStack";
import AuthStack from "./app/screens/authStack/AuthStack";
import Loader from "./app/components/global/Loader";
import { createUser } from "./src/graphql/mutations";
import { getUser } from "./src/graphql/queries";
import { RecoilRoot } from "recoil";

Amplify.configure(awsmobile);

const App = () => {
	const [user, setUser] = useState(undefined);

	const checkUser = async () => {
		try {
			const authUser = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			setUser(authUser);
		} catch (e) {
			setUser(null);
		}
	};

	useEffect(() => {
		setInterval(checkUser, 2000);
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});

			if (userInfo) {
				const userData = await API.graphql(
					graphqlOperation(getUser, { id: userInfo.attributes.sub })
				);

				if (userData.data.getUser) {
					console.log("User is already registered in database");
					return;
				}

				const newUser = {
					id: userInfo.attributes.sub,
					name: userInfo.username,
					email: userInfo.attributes.email,
					phoneNumber: userInfo.attributes.phone_number,
					username: userInfo.attributes.preferred_username,
				};

				await API.graphql(graphqlOperation(createUser, { input: newUser }));
			}
		};

		fetchUser();
	}, []);

	useEffect(() => {
		const listener = (data: { payload: { event: string } }) => {
			if (data.payload.event === "signIn" || data.payload.event === "signOut") {
				checkUser();
			}
		};

		Hub.listen("auth", listener);
		return () => Hub.remove("auth", listener);
	}, []);

	if (user === undefined) {
		return <Loader />;
	}
	return (
		<RecoilRoot>
		<NavigationContainer>
			{user ? <MainStack /> : <AuthStack />}
		</NavigationContainer>
		</RecoilRoot>
	);
};

export default App;

const styles = StyleSheet.create({});
