import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Button,
  ButtonText,
} from './style';

export default class Main extends Component {
  
  state={}

  handleLogoutPress = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <Container>
        <Button onPress={this.handleLogoutPress}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </Container>
    )
  };
}