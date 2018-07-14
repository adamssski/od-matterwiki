import React from "react";
import Alert from "react-s-alert";
import { connect } from "react-redux";

import { Row, Col, Button, Icon } from "ui";

import { loginUser } from "store/modules/sagaActions";

import LoginForm from "./components/LoginForm";

class Login extends React.Component {
  componentDidMount() {
    if (window.localStorage.getItem("userToken")) {
      this.props.history.push("home");
    }
  }

  handleSubmit = user => {
    this.props.loginUser(user, error => {
      if (!error) {
        Alert.success("You are now logged in");
        this.props.history.push("/home");
      } else Alert.error(error.message);
    });
  };

  render() {
    return (
      <Row>
        <Col>
          <LoginForm onSubmit={this.handleSubmit} />
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: (user, callback) => dispatch(loginUser(user, callback))
});

export default connect(() => ({}), mapDispatchToProps)(Login);
