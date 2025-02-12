import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/whitelogo.png';

export default function RegisterPage() {
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
      <ScrollView
        style={styles.cardForm}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Enter your details below!</Text>
        <View>
          <TextInput style={styles.input} placeholder="Email Address" />
          <View style={styles.password}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholder="Password"
            />
            <TouchableOpacity onPress={passwordShowHide}>
              <Icon
                name={isPasswordVisible ? 'eye' : 'eye-slash'}
                size={15}
                color="#474545"
              />
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input} placeholder="Firstname" />
          <TextInput style={styles.input} placeholder="Lastname" />
          <TextInput style={styles.input} placeholder="Postname" />
          <TextInput style={styles.input} placeholder="Street" />
          <TextInput style={styles.input} placeholder="Phone" />
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.txtSgn}>
          Don’t have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.forgot}>
            Sign In
          </Text>
        </Text>
        <View style={styles.btnBox}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('')}>
            <Text style={styles.txtBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topCard: {
    backgroundColor: '#E31E24',
    height: 344,
    borderBottomEndRadius: 18,
    borderBottomStartRadius: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardForm: {
    flex: 1,
    marginTop: -80,
    marginHorizontal: 16,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  title: {
    color: '#8B8B8B',
    textAlign: 'center',
    marginTop: 10,
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
    marginTop: 20,
    padding: 8,
  },
  forgot: {
    color: '#1976D2',
    marginTop: 16,
  },
  txtSgn: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 45,
  },
  btn: {
    backgroundColor: '#E31E24',
    borderRadius: 10,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  txtBtn: {
    color: '#F6F6F9',
    fontSize: 17,
    textAlign: 'center',
  },
  btnBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
