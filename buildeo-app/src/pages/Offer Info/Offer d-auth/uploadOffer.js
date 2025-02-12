import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, ScrollView } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
const { height, width } = Dimensions.get('window');

function UploadOffer() {
     const [file, setFile] = useState(null);
     const [number, setNumber] = useState('');
     const navigation = useNavigation();
     // pick document
     const pickDocument = async () => {
          try {
               const result = await DocumentPicker.getDocumentAsync({});
               if (result.type === 'success') {
                    setFile(result);
                    uploadFile(result);
                    console.log(result);
               }
          } catch (err) {
               console.error(err);
          }
     };

     // handle number input
     const handleNumber = (input) => {
          if (/^\d*$/.test(input)) {
               setNumber(input);
          }
     }
     return (
        <ScrollView>
            <View style={styles.container}>
               <Text style={styles.title}>
                    Do you already have an offer?
               </Text>
               <View style={styles.boxUpload}>
                    <TouchableOpacity style={styles.btnFile} onPress={pickDocument}>
                         <Text style={{ textAlign: 'center' }}>
                              Upload your previous offer here.
                         </Text>
                         <Text style={{ textAlign: 'center' }}>Formats: zip,jpg,png,pdf or ms.word</Text>
                    </TouchableOpacity>
                    {/* {file && (
                         <View>
                              <Text>File Name: {file.name}</Text>
                              <Text>File URI: {file.uri}</Text>
                         </View>
                    )} */}
               </View>
               <TextInput multiline numberOfLines={9} placeholder="Describe your offer" style={styles.input} />

               <View style={styles.boxInputNumber} >
                    <Icon name="eur" size={15} color="#474545" />
                    <TextInput placeholder="Price your offer" keyboardType="numeric" onChangeText={handleNumber} />
               </View>
               
               <Text style={styles.title}>No offer yet? What are you planning to do?</Text>
               <Text style={styles.txtbtm}>Short description of your project.</Text>
               <View style={styles.btnBox}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('upload-offer-success-dauth')}>
                         <Text style={styles.txtBtn}>
                              Upload
                         </Text>
                    </TouchableOpacity>
               </View>
          </View>
        </ScrollView>

     )
}

export default UploadOffer;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#FFFFFF',
          padding: 31,
          height: height,
          display: 'flex',
          flexDirection: 'column',
          paddingTop:0
     },
     input: {
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          marginTop: 10
     },
     boxInputNumber:{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
          marginTop:10
     },
     title: {
          color: '#3A3F52',
          fontWeight: 'bold',
          fontSize: 18,
          marginTop:30
     },
     txtbtm: {
          color: '#858585',
          fontWeight: 'bold'
     },
     boxUpload: {
          borderWidth: 1,
          borderStyle: 'dashed',
          borderRadius: 10,
          height: 198,
          display: 'flex',
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: 'center',
          padding: 31,
          marginTop: 10
     },
     btnFile: {
          padding: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
     },
     btn: {
          backgroundColor: '#E31E24',
          borderRadius: 10,
          height: 55,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width:'100%'
     },
     txtBtn: {
          color: '#F6F6F9',
          fontSize: 17,
          textAlign: 'center'
     },
     btnBox: {
          zIndex: 1,
          position:'relative',
          bottom:-100,
          display:'flex',
          flexDirection:'row',
          justifyContent:'center'
     }

})