import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import configureStore from './store/configureStore'
import Home from './containers/HomeContainer/index'
import DetailView from './containers/DetailViewContainer/index'


const Stack = createStackNavigator();

function App() {
  return (
      <SafeAreaProvider>
          <ActionSheetProvider>
              <Provider store={configureStore()}>
                  <NavigationContainer>
                      <Stack.Navigator
                          headerMode="screen"
                      >
                          <Stack.Screen
                              name="Home"
                              component={Home}
                              options={{
                                  title: 'Gallery app',
                                  headerStyle: {
                                      backgroundColor: '#4153AF',
                                      shadowColor: 'transparent',
                                  },
                                  headerTintColor: 'white',
                              }}
                          />
                          <Stack.Screen
                              name="DetailView"
                              component={DetailView}
                              options={{
                                  title: null,
                                  headerBackTitleVisible: false,
                                  headerStyle: {
                                      backgroundColor: 'black',
                                      height: 50,
                                      borderBottomWidth: 0,
                                      shadowColor: 'transparent',
                                  },
                                  headerTintColor: 'white',
                              }}
                          />
                      </Stack.Navigator>
                  </NavigationContainer>
              </Provider>
          </ActionSheetProvider>
      </SafeAreaProvider>
  );
}


export default App;
