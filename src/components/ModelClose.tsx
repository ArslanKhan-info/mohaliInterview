import { View, Text, Modal, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { calanderEvents, selectedDate } from '../recoil/Calader';
import AsyncStorage from '@react-native-async-storage/async-storage';
type prop = {
    setVisible2:(p:boolean)=>void
    visible2:boolean
}
const ModelClose = ({visible2,setVisible2}:prop) => {
    const [selected, setSelected] =useRecoilState<any>(calanderEvents)
    const [selectedDay, setSelectedDay] =useRecoilState<string>(selectedDate)

    const remove=()=>{
        setSelected( (state:any)=>{
            const newData = state.filter((elm:any)=>elm.date != selectedDay)
             AsyncStorage.setItem('event',JSON.stringify(newData))
            return newData
        })
        closeModel()
    }
    const closeModel = ()=>{
        setSelectedDay('')
        setVisible2(false)
    }
    return (
        <Modal 
            animationType='slide'
            transparent 
            visible={visible2} 
            onRequestClose={()=>{closeModel()}} >
            <TouchableOpacity 
                onPress={()=>{closeModel()}} 
                activeOpacity={0} 
                style={Styles.opacityBg}>
                <View style={Styles.container}>
                    <Text
                        style={Styles.title}
                    >
                        Are you Sure want to delete this event ? 
                    </Text>
                    <Button 
                        style={Styles.btn}
                        mode="contained"
                        onPress={() =>{
                            remove()
                        }}
                    >
                        Yes
                    </Button>
                    <Button 
                        style={Styles.btnClose}
                        mode="contained"
                        onPress={() =>{
                            closeModel()
                        }}
                    >
                       No
                    </Button>
                </View>

            </TouchableOpacity>
        </Modal>
    )
}

export default ModelClose


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