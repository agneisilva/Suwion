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

export { Container, Button, ButtonText };