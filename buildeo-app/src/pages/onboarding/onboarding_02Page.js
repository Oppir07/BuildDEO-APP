import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../../../assets/logo.png";
import { LinearGradient } from 'expo-linear-gradient';
function OnboardingNext() {
     const navigation = useNavigation();
     return (
          <LinearGradient
               colors={['#FF4B3A', '#FF4500']}
               style={styles.container}>
               <View style={styles.boxLogo}>
                    <Image source={logo} style={styles.logo} />
               </View>
               <Text style={styles.subtitle}>Mehr Geld bei gleicher Leistung gefällig?</Text>
               <View style={styles.flexGrow} />
               <View style={styles.boxBtn}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Prinsip')}>
                         <Text style={styles.txtBtn}>Günstiges Angebot erhalten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TopLogin')}>
                         <Text style={styles.txtBtn}>Anbieter-Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TopLogin')}>
                         <Text style={styles.txtBtn}>Käufer-Login</Text>
                    </TouchableOpacity>
               </View>
          </LinearGradient>
     );
}

export default OnboardingNext;

const styles = StyleSheet.create({
     container: {
          backgroundColor: '#FF0000',
          height: '100%',
          padding: 11,
          flex: 1,
     },
     boxLogo: {
          backgroundColor: '#ffffff',
          borderRadius: 55,
          padding: 13,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          marginTop: 29,
     },
     logo: {
          width: 70,
          height: 70,
          resizeMode: 'contain',
     },

     subtitle: {
          color: '#ffffff',
          fontSize: 58,
          fontWeight: '700',
          lineHeight: 55,
          paddingTop: 39.9,
          height: 'auto',
     },
     flexGrow: {
          flex: 1,
     },
     boxBtn: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 27,

     },
     btn: {
          backgroundColor: '#ffffff',
          width: 270,
          borderRadius: 25,
          marginVertical: 15
     },
     txtBtn: {
          textAlign: 'center',
          color: '#FF0000',
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 17,
          fontWeight: '600',
     }
});
