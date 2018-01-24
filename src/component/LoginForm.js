import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  onButtonPress() {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFailure);
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  onLoginFailure() {
    this.setState({
      error: 'Authentication failed',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }

    return (
      <Button onPress={this.onButtonPress} >
        Log in
      </Button>
    );
  }

  renderError() {
    const { error } = this.state;

    if (error) {
      return (
        <CardSection style={styles.error}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            value={this.state.email}
            placeholder='example@gmail.com'
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Password'
            value={this.state.password}
            placeholder='password'
            onChangeText={password => this.setState({ password })}
            secureTextEntry={true}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'white',
    padding: 5,
  },
});
