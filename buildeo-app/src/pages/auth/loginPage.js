import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../../../assets/whitelogo.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
export default function LoginPage() {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
     const navigation = useNavigation();

     const passwordShowHide = () => {
          setIsPasswordVisible(!isPasswordVisible);
        };
     return (
          <View style={styles.container}>
               <View style={styles.topCard}>
                    <Image source={logo} />
               </View>
               <View style={styles.cardForm}>
                    <Text style={styles.title}>Enter your details below!</Text>
                    <View>
                         <TextInput style={styles.input} placeholder='Email Address' />
                         <View style={styles.password}>
                              <TextInput value={password} onChangeText={setPassword} secureTextEntry={!isPasswordVisible} placeholder='Password'   />
                              <TouchableOpacity onPress={passwordShowHide}>
                                   <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={15} color="#474545" />
                              </TouchableOpacity>
                         </View>
                         <TouchableOpacity>
                              <Text style={styles.forgot}>
                                   Forgot your password?
                              </Text>
                         </TouchableOpacity>
                    </View>
                    <Text style={styles.txtSgn}>
                         Don’t have an account? <Text onPress={() => navigation.navigate('Register')} style={styles.forgot}>Sign Up</Text> 
                    </Text>
                    <View style={styles.btnBox}>
                         <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                              <Text style={styles.txtBtn}>
                                   Sign In
                              </Text>
                         </TouchableOpacity>
                    </View>
               </View>
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          backgroundColor: '#FFFFFF',
          flex: 1,
     },
     topCard: {
          backgroundColor: '#E31E24',
          height: 344,
          borderBottomEndRadius: 18,
          borderBottomStartRadius: 18,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
     },
     cardForm: {
          backgroundColor: '#ffffff',
          zIndex: 1,
          marginTop: -80,
          height: '100%',
          marginLeft: 16,
          marginRight: 16,
          borderTopEndRadius: 12,
          borderTopLeftRadius: 12,
          paddingLeft: 16,
          paddingRight: 16

     },
     title: {
          color: '#8B8B8B',
          textAlign: 'center',
          marginTop:26
     },
     input: {
          borderWidth: 1,
          borderColor: '#D0D0D0',
          borderRadius: 10,
          marginTop: 23,
          padding: 16,

     },
     password: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: '#D0D0D0',
          borderRadius: 10,
          paddingLeft: 10,
          paddingRight: 10,
          marginTop: 10,
          padding: 8
     },
     forgot: {
          color: '#1976D2',
          marginTop: 16
     },
     txtSgn: {
          fontSize: 14,
          textAlign: 'center',
          marginTop: 45
     },
     btn: {
          backgroundColor: '#E31E24',
          borderRadius: 10,
          height: 55,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
     },
     txtBtn: {
          color: '#F6F6F9',
          fontSize: 17,
          textAlign: 'center'
     },
     btnBox: {
          zIndex: 1,
          position: 'relative',
          bottom: -20,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
     }

});
