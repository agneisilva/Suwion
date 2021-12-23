import React, { Component } from 'react';

import {
  Container,
  Button,
  ButtonText,
  Text
} from './style';

export default class Receipts extends Component {
  
  state={}

  handleLogoutPress = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <Container>
        <Text>Esta é a tela de receitas</Text>
        <Button onPress={this.handleHomePress}>
          <ButtonText>Home</ButtonText>
        </Button>
      </Container>
    )
  };
}