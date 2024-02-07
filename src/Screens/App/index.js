import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { store } from '../../Storage/store';
import { DimensionContextProvider } from '../../context';
import CustomeDrawerContent from '../../Components/CustomeDrawerContent';
import CustomeFooterContent from '../../Components/CustomeFooterContent';
import Splach from '../Splach';
import Login from '../Login';
import Home from '../Home';
import Product from '../Product';
import Orders from '../Orders';
import Settings from '../Settings';
import Users from '../Users';
import ProductDetails from '../ProductDetails';
import OrderDetails from '../OrderDetails';
import { colors } from '../../Components/Common/color';
import CreateProduct from '../CreateProduct';
import Banner from '../Banner';
import Offers from '../Offers';
import Category from '../Category';

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

const AppNavigator = () => {
  const [loading, setLoading] = useState(true)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [isLoggedIn])

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {loading ?
            <Stack.Screen name='Splach' component={Splach} />
            :
            <>
              {isLoggedIn ?
                <Stack.Screen name='SideBar' component={SideBar} />
                :
                <Stack.Screen name='Login' component={Login} />
              }
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  )
}


// SideBar
const Drawer = createDrawerNavigator()
const SideBar = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Footer'
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.white,
          height: 60,
        },
      }}
      drawerContent={props => <CustomeDrawerContent {...props} />}
    >
      <Drawer.Screen name='Footer' component={Footer} />
    </Drawer.Navigator>
  )
}

// Footer
const Tab = createBottomTabNavigator()
const Footer = () => {
  return (
    <Tab.Navigator
      initialRouteName='StackNav'
      tabBar={props => <CustomeFooterContent {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.white,
          height: 60,
        },
      }}
    >
      <Tab.Screen name='StackNav' component={StackNav} />

    </Tab.Navigator>
  )
}

const StackNavigation = createStackNavigator()

const StackNav = () => {
  return (
    <StackNavigation.Navigator>
      <StackNavigation.Screen name='Home' component={Home} />
      <StackNavigation.Screen name='Product' component={Product} />
      <StackNavigation.Screen name='Orders' component={Orders} />
      <StackNavigation.Screen name='Settings' component={Settings} />
      <StackNavigation.Screen name='Users' component={Users} />
      <StackNavigation.Screen name='ProductDetails' component={ProductDetails} />
      <StackNavigation.Screen name='OrderDetails' component={OrderDetails} />
      <StackNavigation.Screen name='CreateProduct' component={CreateProduct} />
      <StackNavigation.Screen name='Banner' component={Banner} />
      <StackNavigation.Screen name='Offers' component={Offers} />
      <StackNavigation.Screen name='Category' component={Category} />
    </StackNavigation.Navigator>
  )
}



export default App