import React from 'react'
import {SignIn, ChatRoom, Messages, Search} from '../pages'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

export type AppStackProps = {
  SignIn: undefined
  Messages: undefined
  Search: undefined
  ChatRoom: undefined
}

const AppStack = createNativeStackNavigator<AppStackProps>()

export function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Faça Login',
        }}
      />

      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Faça Login',
        }}
      />

      <AppStack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Faça Login',
        }}
      />
    </AppStack.Navigator>
  )
}
