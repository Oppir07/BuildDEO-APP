import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import logo from "../../../assets/retail.png"
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
function Onboarding() {
     const navigation = useNavigation();
     return (
          <LinearGradient
               colors={['#FFFFFF', '#FFFFFF']}
               style={styles.container}>
               <View style={styles.box}>
                    <Image source={logo}/>
                    <Text style={styles.title}>
                    Simply find a cheaper tradesman
                    </Text>
               </View>
               <View style={styles.btnStart}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('OnboardingNext')}>
                         <Text style={styles.txtBtn}>
                         Get started now
                         </Text>
                    </TouchableOpacity>
               </View>
          </LinearGradient>
     );
}

export default Onboarding;


const styles = StyleSheet.create({
     container: {
          backgroundColor: '#D6D1D1',
          height: '100%',
          padding: 31,
          flex: 1
     },
     title:{
          color:'#E31E24',
          fontWeight:'bold',
          fontSize:20,
          marginTop:39,
          textAlign:'center'
     },
     box:{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          height:'100%'
          
     },
     btnStart:{
         zIndex:1,
         bottom:100,
         width:'100%'

     },
     btnStyle:{
          backgroundColor:'#E31E24',
          width:'100%',
          borderRadius:10

     },
     txtBtn:{
          fontSize:18,
          color:'#ffffff',
          textAlign:'center',
          padding:18
     }
    
})