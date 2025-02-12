import { ScrollView, TextInput, TouchableOpacity, View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get('window');

function FormOfferD() {
     const navigation = useNavigation();
     return (
          <ScrollView>
               <View style={styles.container}>
                    <Text style={styles.title}>
                         Get the cheapest offer!
                    </Text>
                    <TextInput placeholder="First name and last name " style={styles.inputField} />
                    <TextInput placeholder="Street " style={styles.inputField} />
                    <TextInput placeholder="City and zip code " style={styles.inputField} />
                    <TextInput placeholder="Telephone number " style={styles.inputField} />
                    <TextInput placeholder="E-mail " style={styles.inputField} />
                    <View style={styles.btnBox}>
                         <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Form-upload-offer')}>
                              <Text style={styles.txtBtn}>
                                   Next
                              </Text>
                         </TouchableOpacity>
                    </View>
                    
               </View>
          </ScrollView>
     )
}

export default FormOfferD;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#FFFFFF',
          padding: 31,
          height: height,
          display: 'flex',
          flexDirection: 'column'

     },
     title: {
          fontSize: 24,
          fontWeight: 'bold',
          width: 170
     },
     inputField: {
          borderBottomColor: '#808080',
          borderBottomWidth: 1,
          marginTop: 10,
          padding: 17,
          fontSize: 18,
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
          position: 'absolute',
          bottom: 130,
          padding: 31,
          width: width,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
     }
})