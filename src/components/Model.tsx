import { View, Text, Modal, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { calanderEvents, selectedDate } from '../recoil/Calader';
import AsyncStorage from '@react-native-async-storage/async-storage';
type prop = {
    setVisible:(p:boolean)=>void
    visible:boolean
}
const Model = ({visible,setVisible}:prop) => {
    const [title,setTitle] = useState('')
    const [selected, setSelected] =useRecoilState<any>(calanderEvents)
    const [selectedDay, setSelectedDay] =useRecoilState<string>(selectedDate)
    const [des,setDes] = useState('')
    // const [Date,setDate] = useState('')

    const addEvent = ()=>{
        setSelected( (state:any)=>{
            const newState = [...state,{
                date:selectedDay,
                title,
                des
            }]
             AsyncStorage.setItem('event',JSON.stringify(newState))
            return (newState)
        });
    }

    const closeModel = ()=>{
        setSelectedDay('')
        setTitle('')
        setDes('')
        setVisible(false)
    }
    return (
        <Modal 
            animationType='slide'
            transparent 
            visible={visible} 
            onRequestClose={()=>{closeModel()}} >
            <TouchableOpacity 
                onPress={()=>{closeModel()}} 
                activeOpacity={0} 
                style={Styles.opacityBg}>
                <View style={Styles.container}>
                    <Text
                        style={Styles.title}
                    >
                        Add Details
                    </Text>
                    <View style={Styles.InputCont}>
                        <TextInput
                            label="Title"
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            label="Description"
                            value={des}
                            onChangeText={setDes}
                        />
                        <TextInput
                            label="Date"
                            value={selectedDay}
                            // onChangeText={text => {}}
                            disabled
                        />

                    </View>
                    <Button 
                        style={Styles.btn}
                        mode="contained"
                        onPress={() =>{
                            closeModel()
                            addEvent()

                        }}
                    >
                        Add Event
                    </Button>
                    <Button 
                        style={Styles.btnClose}
                        mode="contained"
                        onPress={() =>{
                            closeModel()
                        }}
                    >
                       Close
                    </Button>
                </View>

            </TouchableOpacity>
        </Modal>
    )
}

export default Model


const Styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#fff',
        paddingHorizontal:20,
        marginHorizontal:20,
        paddingVertical:20,
        borderRadius:10,
        elevation:2
        
    },
    opacityBg:{
        backgroundColor:'#fff9',
        flex:1,
        // paddingVertical:120
        justifyContent:'center',
        // alignItems:'center'
    },
    title:{
        fontSize:20,
        marginBottom:20,
        textAlign:'center'
    },
    InputCont :{
        gap:10
    },
    btn:{
        borderRadius:5,
        marginTop:20
    },
    btnClose:{
        borderRadius:5,
        marginTop:10,
        backgroundColor:'red'
    }
})