import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';

//Screens
import ChooseLocation from './src/Screens/ChooseLocation';
import Home from './src/Screens/Home';
import Map from './src/Screens/Map';
import Menu from './src/Screens/Menu'
import Events from './src/Screens/Events'


const App = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} options={{
           headerShown:false
        }} />
             <Stack.Screen name="menu" component={Menu} options={{
           headerShown:false
        }} />
             <Stack.Screen name="events" component={Events}  />
        <Stack.Screen name="chooseLocation" component={ChooseLocation} />
      </Stack.Navigator>
      <FlashMessage
        position="top"
      />
    </NavigationContainer>
  );
};

export default App;
