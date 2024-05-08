import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {Calendar} from 'react-native-calendars';
import { useRecoilState } from 'recoil';
import { calanderEvents, selectedDate } from '../recoil/Calader';


type prop = {
    setVisible:(p:boolean)=>void
    setVisible2:(p:boolean)=>void
}

const Calander = ({setVisible,setVisible2}:prop) => {
    // const [selected, setSelected] = useState<string[]>([]);
    const [selected, setSelected] =useRecoilState(calanderEvents)
    const [selectedDay, setSelectedDay] =useRecoilState<string>(selectedDate)
    const markDate = () =>{
        const obj :any ={}
        selected.map((item:any)=>{
            obj[item.date] = {selected: true, marked: false, selectedColor: '#e36209'}
        })
        return obj
    }

    return (
        <View>
            <Calendar
                onDayPress={day => {
                    if(!selected.find((elm:any)=>elm.date == day.dateString)){
                        setVisible(true)
                        setSelectedDay(day.dateString)
                    }else{
                        setVisible2(true)
                        setSelectedDay(day.dateString)
                    }
                    
                }}
                markedDates={markDate()}
            />

        </View>
    )
}

export default Calander