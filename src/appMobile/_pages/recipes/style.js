import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #F5F5F5;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #FC6663;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const Text = styled.Text`
  textAlign: center;
  color: #ce2029;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

export { Container, Button, ButtonText, Text };