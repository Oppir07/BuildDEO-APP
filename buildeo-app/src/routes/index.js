import React from 'react';
import { View,Text,Image,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Onboarding from '../pages/onboarding/onboarding_01Page';
import OnboardingNext from '../pages/onboarding/onboarding_02Page';
import HomePage from '../pages/Home/indexPage';
import LoginPage from '../pages/auth/loginPage';
import RegisterPage from '../pages/auth/registerPage';
import PrinsipPage from '../pages/Offer Info/PrinsipPage';
import CustomHeader from '../components/ui/customHedader';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const ScreenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#fff'
  }
};

const ScreenTopOptions = {
  tabBarShowLabel: true,
  tabBarLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#ff4500', 
    height: 3,
    width:100,
    width: 100, 
    left: '25%',
    marginLeft: -50,
  },
  tabBarStyle: {
    right: 0,
    left: 0,
    elevation: 4,
    height: 60,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden', 
  },
};

//stack navigation
function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name='OnboardingNext' component={OnboardingNext} options={{ headerShown: false }}/>
      <Stack.Screen name='Prinsip' component={PrinsipPage} options={{
            header: () => <CustomHeader title="Das BUILDEO Prinzip" url="" />,
          }}/>
    </Stack.Navigator>
  );
}

//bottom navigation
function BottomNavigator() {
  return (
    <Tab.Navigator screenOptions={ScreenOptions}>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
// Header top
function TopNavigationWithHeader() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/logoText.png')} style={styles.logo} />
      </View>
      <TopNavigation />
    </View>
  );
}

//top navigation
function TopNavigation(){
  return(
    <Top.Navigator screenOptions={ScreenTopOptions}>
        <Top.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
        <Top.Screen name='Register' component={RegisterPage} options={{ headerShown: false }} />
    </Top.Navigator>
  )
}

//container navigation
function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TopLogin" component={TopNavigationWithHeader} options={{ headerShown: false }} />
      <Stack.Screen name="TopRegister" component={TopNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingNext" component={OnboardingNext}  options={{ headerShown: false }}/>
      <Stack.Screen name="Prinsip" component={PrinsipPage}  options={{
            header: () => <CustomHeader title="Das BUILDEO Prinzip" url="" />,
          }}/>
    </Stack.Navigator>
  );
}


//styles hedaer-navigation
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop:20
  },

});

//render all navigation
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
