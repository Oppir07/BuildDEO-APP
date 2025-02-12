import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { I18nPrinsip } from '../../components/I18n/Prinsip'
import { useNavigation } from "@react-navigation/native";

export default function PrinsipPage() {
     const navigation = useNavigation();
  return (
    <View style={styles.container} >
          <ScrollView>
               <View style={styles.boxImg}>
                    <Image source={require('../../../assets/tc.png')}/>
                    <Text style={styles.txtImg}>
                         Get the cheapest quote for home services and materials
                    </Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_01}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_01}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_02}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_02}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_03}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_03}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_04}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_04}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_05}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_05}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_06}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_06}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_07}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_07}</Text>
               </View>
               <View style={styles.boxInfo}>
                    <Text style={styles.point}>{I18nPrinsip.POINT_08}</Text>
                    <Text style={styles.dPoint}>{I18nPrinsip.D_POINT_08}</Text>
               </View>
               <View style={styles.btnBox}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Form-offer-d')}>
                         <Text style={styles.txtBtn}>
                         Upload offer
                         </Text>
                    </TouchableOpacity>
               </View>
          </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
     container:{
          flex:1,
           backgroundColor:'#F6F6F9',
           padding:31,
           paddingBottom:20
     },
     boxImg:{
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          paddingTop:14,
     },
     txtImg:{
          fontSize:18,
          fontWeight:'bold',
          textAlign:'center',
          fontFamily:'Alef_700Bold',
          letterSpacing:1
     },
     boxInfo:{
          marginTop:16
     },
     point:{
          fontSize:13.6,
          fontWeight:'bold',
     },
     dPoint:{
          fontSize:12,
          marginTop:15,
          color:"#000E088B"
     },
     btnBox:{
          marginTop:100,
          flexDirection:'row',
          justifyContent:'center',
          marginBottom:5,
          alignItems:'center'
          
     },
     btn:{
          backgroundColor:'#E31E24',
          width:295,
          borderRadius:10,
          height:55,flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'

     },
     txtBtn:{
          color:'#F6F6F9',
          fontSize:17,
          textAlign:'center'
     }
})