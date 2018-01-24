import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import LoginForm from './src/component/LoginForm';
import { Button, Card, CardSection, Header, Spinner } from './src/component/common';
import { getLogger } from './src/log';
import { firebase as firebaseConfig } from './src/config';

const logger = getLogger('App');

const AuthState = Object.freeze({
  LOADING: 1,
  LOGGED_IN: 2,
  LOGGED_OUT: 3,
});

const cardSection = (WrappedComponent, props, children) => (
  <Card>
    <CardSection>
      <WrappedComponent {...props}>
        {children}
      </WrappedComponent>
    </CardSection>
  </Card>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: AuthState.LOADING,
    };
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authState: AuthState.LOGGED_IN });
      } else {
        this.setState({ authState: AuthState.LOGGED_OUT });
      }
    });

    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    switch (this.state.authState) {
    case AuthState.LOADING:
      return cardSection(Spinner, { size: 'large' });
    case AuthState.LOGGED_IN:
      return cardSection(
        Button,
        {
          onPress: () => firebase.auth().signOut()
        },
        'Log Out'
      );
    case AuthState.LOGGED_OUT:
      return <LoginForm />;
    default:
      logger.error('Unexpected auth state', this.state.authState);
    }
  }

  render() {
    return (
      <View>
        <Header text='Authentication'/>
        {this.renderContent()}
      </View>
    );
  }
}
