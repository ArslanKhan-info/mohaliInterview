import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Calander from '../components/Calander'
import Model from '../components/Model'
import ModelClose from '../components/ModelClose'
import { calanderEvents, selectedDate } from '../recoil/Calader'
import { useRecoilState } from 'recoil'
import { TextInput,Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const [visible,setVisible] = useState(false)
  const [visible2,setVisible2] = useState(false)
  const [events,setEvents] = useRecoilState(calanderEvents)
  const [selectedDay, setSelectedDay] =useRecoilState<string>(selectedDate)

  const getData =async () =>{
    const data =await AsyncStorage.getItem('event')
    
    if(data && JSON.parse(data)?.length > 0){
      setEvents(JSON.parse(data))
    }
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <View 
      style={style.mainConnt}
    >
      <Text style={style.title} >Events</Text>
      <View style={style.calanderCont}>
        <Calander setVisible2={setVisible2} setVisible={setVisible}/>
      </View>
      <Model {...{visible,setVisible}}></Model>
      <ModelClose {...{visible2,setVisible2}} />
      <Text style={style.title} >Events List</Text>
      <ScrollView 
        style={style.listCont}
      >
        {events.map((event:any,index:number)=>{
          return(
            <View style={style.listItem}>
              <View style={{flex:1}}>
                <Text style={style.titleSmall} >{event.title} ({event.date})</Text>
                <Text style={style.titleDes}>{event.des}</Text>
              </View>
              <Button 
               style={style.btnClose}
               mode="contained"
               onPress={() =>{
                  setVisible2(true)
                  setSelectedDay(event.date)
               }}
               >
                Delete
              </Button>
            </View>
          )
        })

        }
      </ScrollView>
    </View>
  )
}


const style = StyleSheet.create({
  mainConnt:{
    flex:1,
    backgroundColor:'#fff'
  },
  listCont:{
    flex:1,
    paddingHorizontal:20,
    // marginTop:20
  },
  calanderCont:{
    marginTop:10,
    elevation:2
  },
  title:{
    fontSize:20,
    textAlign:'center',
    marginVertical:20
  },
  listItem:{
    // flex:1,
    paddingVertical:10,
    paddingHorizontal:10,
    borderTopWidth:.5,
    flexDirection:'row'
  },
  titleSmall:{
    fontSize:16,
    fontWeight:'bold'
  },
  titleDes:{
    fontSize:14,

  },
  btnClose:{
    borderRadius:5,
    // marginTop:10,
    backgroundColor:'red',
    height:40
}
})

export default Home