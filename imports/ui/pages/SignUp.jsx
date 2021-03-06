import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import '../css/StartUp.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  signup() {
    let username = this.state.username;
    var password = this.state.password;
    if (username.length==0) {
      alert('Username may not be empty');
      return;
    }
    if (password.length==0) {
      alert('Password may not be empty');
      return;
    }
    if (username=='SYSTEM') {
      alert('Cannot create username as SYSTEM, Định troll bố à?');
      return;
    }
    if (username.charAt(0) == ' ') {
      alert('Cannot have space at the start of username');
      return;
    }
    if (username.charAt(username.length-1) == ' ') {
      alert('Cannot have space at the end of username');
      return;
    }
    Accounts.createUser({
        username: username,
        password: password
    }, (err) => {
      if (err) {
        alert(err);
        return;
      }
      this.props.history.replace('/chat');
      Meteor.call('system-call', 'has just created an account!!!');
    });
  }

  changeUsername(event) {
    if (event.keyCode==13) {
      this.signup();
      return;
    }
    this.setState({
      username: event.target.value
    });
  }

  changePassword(event) {
    if (event.keyCode==13) {
      this.signup();
      return;
    }
    this.setState({
      password: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="group">
          <h2>Sign&nbsp;up</h2>
          <div className="form">
              <span>Username</span>
              <FormControl type="text" onKeyUp={this.changeUsername.bind(this)} />
          </div>
          <div className="form">
              <span>Password</span>
              <FormControl type="password" onKeyUp={this.changePassword.bind(this)} />
          </div>

          <Button className="button button1" onClick={this.signup.bind(this)}>{"Go <3"}</Button>
          <Button className="button2 button3" onClick={this.props.changeShow}>{"I want to login"}</Button>

        </div>
      </div>
    );
  }
}
