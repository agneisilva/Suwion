import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import MenuButton from '../../_components/MenuButton/MenuButton';

export default class Menu extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="Home"
            // source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Main');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Receitas"
            // source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Receipts');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Logout"
            // source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('SignIn');
              navigation.closeDrawer();
            }}
          />
        </View>
      </View>
    );
  }
}

Menu.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
