import { atom } from "recoil";



const defaultValue :any = []

export const calanderEvents = atom({
    key: 'calanderEvents', 
    default: defaultValue,
});


export const selectedDate = atom({
    key: 'selectedDate', 
    default: '',
});