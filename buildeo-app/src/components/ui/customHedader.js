// CustomHeader.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, url }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
     <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
     </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 10,
    height: 90,
  },
  icon: {
    paddingLeft: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  container:{
     flexDirection:'row',
     marginBottom:-50

  }
});

export default CustomHeader;
