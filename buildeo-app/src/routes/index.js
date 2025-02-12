import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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
import FormOfferD from '../pages/Offer Info/Offer d-auth/form';
import UploadOffer from '../pages/Offer Info/Offer d-auth/uploadOffer';
import OfferSend from '../pages/Offer Info/Offer d-auth/done';
import Service from '../pages/Services';
import Icon from 'react-native-vector-icons/FontAwesome';
import Profile from '../pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();


// set style menu bottom 
function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,  
        },
        tabBarActiveTintColor: '#E31E24',  
        tabBarInactiveTintColor: '#808080',  
      }}
    >
      <Tab.Screen name="Home" component={HomePage} 
      options={{
        headerShown: false, 
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size || 24}
          />
        ), tabBarLabel: 'Home'
      }} />

      <Tab.Screen name="Service" component={Service} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="shopping-cart" color={color} size={size || 24}
          />
        ), tabBarLabel: 'Services'
        }} />
        
      <Tab.Screen name="Profile" component={Profile}
       options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size || 24}
          />
        ), tabBarLabel: 'Profile' 
        }} />
    </Tab.Navigator>
  );
}

//container navigation
function RootStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
      <Stack.Screen name="OnboardingNext" component={OnboardingNext} options={{ headerShown: false }} />
      <Stack.Screen name="Prinsip" component={PrinsipPage} options={{
        headerTitle: 'The BUILDEO principle',
        headerTitleAlign: 'center'
      }} />

      {/* offer d-auth */}
      <Stack.Screen name="Form-offer-d" component={FormOfferD} options={{
        headerTitle: 'In 1 minute at the cheapest price',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="Form-upload-offer" component={UploadOffer} options={{
        headerTitle: 'In 1 minute at the cheapest price',
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="upload-offer-success-dauth" component={OfferSend} options={{
        headerTitle: 'In 1 minute at the cheapest price',
        headerTitleAlign: 'center'
      }} />

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
    marginTop: 20
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
