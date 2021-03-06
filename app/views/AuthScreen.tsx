import React from 'react';
import {
    Text,
  TextInput,
  SafeAreaView,
  Button,
  StyleSheet,
  AsyncStorage,
  Alert
} from 'react-native';
import axios from 'axios';
import base64 from 'react-native-base64'

const AsyncStoreConstant = 'userAuthFlag';

export class AuthScreen extends React.Component {

    state = {userName : '',
            password: ''};
    handleSubmit = (event) => {
        event.preventDefault();
          let successHandle = () => {
            this.props.navigation.navigate(ScreenConstants.TO_DO_LIST_SCREEN);
          }

          let formdata = new FormData();
          console.log(this.state.userName + "  " + this.state.password)
          formdata.append("username", this.state.userName)
          formdata.append("password", this.state.password)
          
          axios({
            url    : 'http://danielracolta.co.uk:8080/api/login',
            method : 'POST',
            data   : formdata,
            headers: {
                         Accept: 'application/json',
                         'Content-Type': 'multipart/form-data',
                     }
                 })
                 .then(function (response) {
                    // console.log(base64.encode(formdata._parts[0][1] + ':' + formdata._parts[1][1]));
                    // let user = {authdata : base64.encode(formdata._parts[0][1] + ':' + formdata._parts[1][1])};
                    // console.log(user);
                    // AsyncStorage.setItem('user', JSON.stringify(user));
                    AsyncStorage.setItem(AsyncStoreConstant, 'doneAuth');
                    successHandle();
                })
                .catch(function (error) {
                  Alert.alert("Wrong credentials","Try again!"); 
                })
    }

    render() {
      return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <Text>Username:</Text>
          <TextInput 
            style={styles.textInput}
            value={this.state.userName}
            onChangeText={event => this.setState({userName:event})}
          ></TextInput>
          <Text>Password:</Text>
          <TextInput 
            style={styles.textInput}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={event => this.setState({password:event})}
          ></TextInput>
          <Button
            title="Login"
            onPress={this.handleSubmit}
          />
          <Button
            title="Forgot Password"
            onPress={() => {
              this.props.navigation.navigate(ScreenConstants.AUTH_FORGET_SCREEN);
            }}
          />

          <Button
            title="Sign Up"
            onPress={() => {
              this.props.navigation.navigate(ScreenConstants.AUTH_NEW_USER_SCREEN);
            }}
          />
        </SafeAreaView>
      );
    }
  }
  const styles = StyleSheet.create({
    safeAreaStyle: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput:
    {
        borderColor: '#000000',
        borderWidth: 1,
        marginBottom:20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#DCDCDC'
    }
  });
  
  const ScreenConstants = {
    TO_DO_LIST_SCREEN: 'ToDoList',
    APP_FIRST_SCREEN: 'AppScreen1',
    APP_SECOND_SCREEN: 'AppScreen2',
    AUTH_LOGIN_SCREEN: 'login',
    AUTH_FORGET_SCREEN: 'forgetPassword',
    AUTH_NEW_USER_SCREEN: 'registerUser',
    LOADING_SCREEN: 'AppLoading',
    APP_STACK: 'AppStack',
    AUTH_STACK: 'AuthStack',
  };