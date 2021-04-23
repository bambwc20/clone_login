import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Isao } from "react-native-textinput-effects";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import Alert from "react-native-awesome-alerts";
import { SaveToken, DeleteToken } from "../../Redux/action";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      loginFailAlert: false,
    };
    this.serverConnect = this.serverConnect.bind(this);
  }

  checkUserServerData = async (callback) => {
    await setTimeout(() => {
      console.log("Confirmed the User DataBase!");
      callback();
    }, 1000);
  };

  async serverConnect() {
    const { email, password } = this.state;
    if (email === null || password === null) {
      this.setState({
        loginFailAlert: true,
      });
    } else {
      try {
        // throw Error; //가짜에러 => 회원가입 정보와 상이함.
        await this.checkUserServerData(() => {
          //인증정보를 가져오고 토큰을 로컬스토리지에 저장하는 코드
          this.props.loginCheck(SaveToken);
        });
      } catch (error) {
        this.props.loginCheck(DeleteToken);
        this.setState({
          loginFailAlert: true,
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.total}>
        <View style={styles.AppName}>
          <Text style={{ fontSize: 50 }}>Hi!</Text>
        </View>
        <View style={styles.Inputs}>
          <Isao
            label="Email"
            style={{ width: 330, marginTop: 15 }}
            activeColor="#da7071"
            borderHeight={8}
            inputPadding={16}
            labelHeight={24}
            passiveColor="black"
            onChangeText={(text) => this.setState({ email: text })}
          />
          <Isao
            label="Password"
            style={{ width: 330, marginBottom: 10 }}
            activeColor="#da7071"
            borderHeight={8}
            inputPadding={16}
            labelHeight={24}
            passiveColor="black"
            onChangeText={(text) => this.setState({ password: text })}
          />
          <View style={{ flexDirection: "row" }}>
            <Button
              title="로그인"
              type="outline"
              buttonStyle={{ width: 90, height: 40 }}
              onPress={this.serverConnect}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup Screen")}
            >
              <Text>회원가입</Text>
            </TouchableOpacity>
          </View>
          <Alert
            show={this.state.loginFailAlert}
            title="로그인 실패"
            message="로그인에 실패하였습니다."
            showConfirmButton
            confirmText="로그인 다시 하기"
            onConfirmPressed={() =>
              this.setState({
                loginFailAlert: false,
                email: null,
                password: null,
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  total: {
    flex: 1,
    backgroundColor: "red",
  },
  AppName: {
    flex: 4,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  Inputs: {
    flex: 5,
    backgroundColor: "blue",
    // alignItems: "center",
    justifyContent: "center",
  },
});

const mapDispatchToProps = (dispatch) => ({
  loginCheck: (value) => {
    dispatch({ type: value });
  },
});

export default connect(null, mapDispatchToProps)(Login);
