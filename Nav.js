import React, { Component } from "react";
import { View, Text } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./components/FirstPages/LoginPage";
import Signup from "./components/FirstPages/SignupPage";
import First from "./components/FirstPages/FirstPage";
import { set } from "react-native-reanimated";
import Main from "./components/Main";
import Board from "./components/Board";
import Card from "./components/Card";
import UserPage from "./components/UserPage";
import { connect } from "react-redux";
import { SaveToken } from "./Redux/action";
import { DeleteToken } from "./Redux/action";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Main} />
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
}
function BoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
}

class Nav extends Component {
  constructor() {
    super();
    this.ChangeState = this.ChangeState.bind(this);
  }

  gettokken = async (callback) => {
    await setTimeout(() => {
      console.log("complet the getting tokken!");
      callback();
    }, 1000);
  };

  ChangeState = async () => {
    try {
      throw Error; //가짜에러 => 토큰없음
      await this.gettokken(() => {
        this.props.loginCheck(SaveToken);
      });
      //   if (await AsyncStorage.getItem('user_Token')) {
      //     this.props.loginCheck();
      //   } 와 같음. 로컬스토리지에 토큰이 있나 없나를 확인하는 코드이다.
    } catch (error) {
      this.props.loginCheck(DeleteToken);
    }
  };

  componentDidMount() {
    console.log("a");
    this.ChangeState();
  }

  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          {this.props.Login ? (
            //스토리지 토큰이 있을경우
            <Drawer.Navigator>
              <Drawer.Screen name="Main" component={StackHome} />
              <Drawer.Screen name="Board" component={BoardStack} />
              <Drawer.Screen name="UserInfo" component={UserPage} />
            </Drawer.Navigator>
          ) : (
            //스토리지 토큰이 없을경우
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="First Screen" component={First} />
              <Stack.Screen name="Signup Screen" component={Signup} />
              <Stack.Screen name="Login Screen" component={Login} />
            </Stack.Navigator>
          )}
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  Login: state.SavetokenInStorage,
});

const mapDispatchToProps = (Dispatch) => ({
  loginCheck: (value) => {
    Dispatch({ type: value });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
