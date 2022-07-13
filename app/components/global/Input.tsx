import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../theme/Colors';
import Icon from "react-native-vector-icons/FontAwesome5";
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../../../src/graphql/mutations';
const Input = (props) => {

    const { chatRoomID } = props;

    const [message, setMessage] = useState('');
  const [myUserId, setMyUserId] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        setMyUserId(userInfo.attributes.sub);
    };
    fetchUser();
}, []);

  const onSendPress = async () => {
    try {
        await API.graphql(
            graphqlOperation(createMessage, {
                input: {
                    content: message,
                    userID: myUserId,
                    chatRoomID: chatRoomID,
                },
            })
        );
    } catch (e) {
        console.log(e);
    }

    setMessage("");
};
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    keyboardVerticalOffset={100}
    style={{width: '100%'}}
  >
    <View style={styles.container}>
    <View style={styles.mainContainer}>
      
      <TextInput
        placeholder={"Type a message"}
        style={styles.textInput}
        multiline
        value={message}
        onChangeText={setMessage}
      />
    </View>
    <TouchableOpacity onPress={onSendPress}>
      <View style={styles.buttonContainer}>
        
           <Icon name="reply" size={28} color="white" />
      </View>
    </TouchableOpacity>
    </View>
  </KeyboardAvoidingView>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'flex-end',
      },
      mainContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: 'flex-end',
      },
      textInput: {
        flex: 1,
        marginHorizontal: 10
      },
      icon: {
        marginHorizontal: 5,
      },
      buttonContainer: {
        backgroundColor: Colors.primary,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }

})