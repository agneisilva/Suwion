import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'

import SignIn from '../_pages/signIn';
import SignUp from '../_pages/signUp';
import Main from '../_pages/main';
import Menu from '../_pages/menu';
import Receipts from '../_pages/recipes';


const MainNavigationStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
    Main: {
      screen: Main,
    },
    Receipts: {
      screen: Receipts,
    },
  },
  {
    initialRouteName: 'SignIn'
  });

const MenuDrawerStack = createDrawerNavigator(
  {
    Main: MainNavigationStack
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: Menu
  }
);


const Route = createAppContainer(MenuDrawerStack);

export default Route;
