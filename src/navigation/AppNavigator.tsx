// src/navigation/AppNavigator.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MessageScreen from '../screens/MessageScreen';
import ChatScreen from '../screens/ChatScreen';

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');

  // Function to handle screen navigation
  const navigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  // Determine which screen to render
  let ScreenComponent;
  if (currentScreen === 'Login') {
    ScreenComponent = <LoginScreen navigate={navigate} />;
  } else if (currentScreen === 'Register') {
    ScreenComponent = <RegisterScreen navigate={navigate} />;
  } else if (currentScreen === 'Messages') {
    ScreenComponent = <MessageScreen navigate={navigate} />;
  } else if (currentScreen === 'Chat') {
    ScreenComponent = <ChatScreen navigate={navigate} />;
  }

  return <View style={styles.container}>{ScreenComponent}</View>;
};

// Styles for the screens
const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default AppNavigator;
