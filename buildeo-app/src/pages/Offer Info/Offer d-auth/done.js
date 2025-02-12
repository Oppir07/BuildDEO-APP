import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, Animated } from "react-native"
import success from '../../../../assets/success.png'
import { useEffect, useRef } from "react";
const { height, width } = Dimensions.get('window');

function OfferSend() {
     const animated = useRef(new Animated.Value(0.5)).current;


     useEffect(() => {
          Animated.timing(animated, {
               toValue: 1,
               duration: 1000,
               useNativeDriver: true,
          }).start();
     }, [])
     return (
          <View style={styles.container}>
               <View>
                    <Animated.View 
                         style={[{ 
                              transform: [{ scale: animated 
                         }] }
                    ]}>
                         <Image source={success} style={styles.img} />
                    </Animated.View>

                    <Text style={styles.txt}>Thank you for your trust!</Text>
                    <Text style={styles.txt}>
                         We'll get in touch as soon as ours
                         Experts have found the perfect offer</Text>
               </View>
               <View style={styles.btnBox}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('upload-offer-success-dauth')}>
                         <Text style={styles.txtBtn}>
                              Thank You
                         </Text>
                    </TouchableOpacity>
               </View>
          </View>
     )
}

export default OfferSend;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#FFFFFF',
          padding: 31,
          height: height,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 0
     },
     img: {
          width: 'auto',
          height: 300
     },
     txt: {
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 10,
          textAlign: 'center',
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
          bottom: -180,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
     }
})