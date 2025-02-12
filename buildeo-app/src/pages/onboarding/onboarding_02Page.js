import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../../../assets/pana.png";
import { LinearGradient } from 'expo-linear-gradient';
function OnboardingNext() {
     const navigation = useNavigation();
     return (
          <LinearGradient
               colors={['#FFFFFF', '#FFFFFF']}
               style={styles.container}>
               <View style={styles.box}>
                    <Image source={logo} />
                    <Text style={styles.title}>We are looking for builders who want to save money</Text>

                    <View style={styles.btnBox}>
                         <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('Prinsip')}>
                              <Text style={styles.txtBtn}>
                                   Get a favorable Offer
                              </Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('Login')}>
                              <Text style={styles.txtBtn}>
                                   Provider login
                              </Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('OnboardingNext')}>
                              <Text style={styles.txtBtn}>
                                   Buyer login
                              </Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </LinearGradient>
     );
}

export default OnboardingNext;

const styles = StyleSheet.create({
     container: {
          backgroundColor: '#FF0000',
          height: '100%',
          padding: 31,
          flex: 1,
     },
     box:{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          height:'100%'
     },
     title: {
          color: '#E31E24',
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 39,
          textAlign: 'center'
     },
      btnStyle:{
           backgroundColor:'#E31E24',
           width:'100%',
           borderRadius:10,
           marginTop:41
      },
      txtBtn:{
           fontSize:18,
           color:'#ffffff',
           textAlign:'center',
           padding:18,
           width:'100%'
      },
      btnBox: {
          zIndex: 1,
          position:'relative',
          bottom:-10,
          display:'flex',
          flexDirection:'col',
          justifyContent:'center',
          width:'100%'
     }
});
