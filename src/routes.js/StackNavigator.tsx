import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/home';

const StackNavigator = () => {

  const defaultOptions = ()=>({
    headerShown:false
  })
  
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={defaultOptions()} initialRouteName='Home'>
      <Stack.Screen component={Home} name='Home'/>
    </Stack.Navigator>
  )
}

export default StackNavigator