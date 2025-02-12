import React from 'react';
import { View, Text, Button, StyleSheet, TextInput,Image, TouchableOpacity , Dimensions, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import repair from '../../../assets/repair.png'
import { LinearGradient } from 'expo-linear-gradient';
import s1 from '../../../assets/service1.png'
import s2 from '../../../assets/service2.png'
import s3 from '../../../assets/service3.png'
const { height, width } = Dimensions.get('window');

function HomePage({ navigation }) {
  const dummy = [
    {id:'1', service:'Lay LVT: up to 20 m²',price:189, company:'Painter Company', reviews:'12', image:s1},
    {id:'2', service:'Lay LVT: up to 50 m²',price:231, company:'Garden Company', reviews:'34', image:s2},
    {id:'3', service:'Lay LVT: up to 100 m²',price:453, company:'Luxury Company', reviews:'45', image:s3},
  ]
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Icon name={'bars'} size={20} />
        </TouchableOpacity>
        <Icon name={'comments'} size={20} color={'#E31E24'}/>
      </View>
      <View>
        <Text style={styles.wcm}>Welcome</Text>
        <Text style={styles.name}>Hi, Edward Panjaitan</Text>
        <Text style={styles.qs}>What service do you want?</Text>
        <View style={styles.boxSearch}>
            <Icon name={'search'} size={17} color={'#A2A2A2'} style={{marginLeft:5}}/>
            <TextInput style={styles.input} placeholder='search for services'/>
        </View>
          <LinearGradient colors={['#FFFFFF', '#FF4A3A98']} style={styles.boxTitle}>
            <Text style={styles.title}>
                Work with our best services provider
            </Text>
            <Image source={repair}/>
          </LinearGradient>
          <Text style={styles.category}>Services Category</Text>
          <View>

          </View>
          <View style={styles.boxRec}>
            <Text style={styles.txtpopuler}>Popular Service</Text>
            <Text style={styles.txtView}>View All</Text>
          </View>
          
          <FlatList 
          showsHorizontalScrollIndicator={false}
          indicatorStyle='white'
          horizontal
          data={dummy}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>(
            <View style={styles.cardServices}>
                <Image source={s1} style={{width:'100%',borderRadius:5}}/>
                <Text style={styles.service}>{item.service}</Text>
                <Text style={styles.company}>{item.company}</Text>
                <View style={styles.boxPrice}>
                  <Text style={styles.company}>From : <Text style={styles.price}>{item.price}<Icon name={'euro'} size={17} color={'#E31E24'}/>
                    </Text></Text>
                  <Text style={styles.reviews}><Icon name={'star'} size={14} color={'#FFC107'}/>4.5({item.reviews})</Text>
                </View>
            </View>
          )}

          style={{padding:5,marginTop:7}}
          />
         
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  boxPrice:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  reviews:{
    color:'#9A9A9D',
  },
  price:{
    color:'#E31E24',
    fontWeight:'bold',
    fontSize:17
  },
  company:{
    color:'#9A9A9D',
    marginTop:5,
  },
  service:{
    fontWeight:'bold',
    fontSize:12,
    marginTop:7,
  },
  
  container:{
    backgroundColor:'#ffffff',
    height:'100%',
    padding:22
  },
    wcm:{
      fontSize:18,
      fontWeight:'bold',
      marginTop:18

    },
    name:{
      fontSize:12,
      color:'#A2A2A2'
    },
    qs:{
      fontWeight:'bold',
      fontSize:15,
      marginTop:18
    },
    boxSearch:{
      display:"flex",
      flexDirection:'row',
      alignItems:'center',
      borderWidth:1,
      borderColor:'#A2A2A2',
      borderRadius:5,
      padding:1,
      marginTop:13
    },
    input:{
      width:'100%',
      marginLeft:10
    },
    title:{
      fontSize:24,
      fontWeight:'bold',
      width:175,
      lineHeight:30,
      paddingTop:13,
      paddingLeft:13
    },
    boxTitle:{
      display:"flex",
      flexDirection:'row',
      marginTop:13,
      borderRadius:5
    },
    topBar:{
      display:"flex",
      flexDirection:'row',
      justifyContent:"space-between",
      alignItems:'center',
      marginTop:40
    },
    category:{
      fontWeight:'bold',
      fontSize:15,
      marginTop:18
    },
    boxRec:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    txtpopuler:{
      fontSize:15,
      fontWeight:'bold',
    },
    txtView:{
      color:'#E31E24',

    },
    cardServices:{
      backgroundColor:'#FFFFFF',
      width:200,
      marginRight:10,
      borderRadius:5,
      padding:7,
      elevation: 3,
    }

})