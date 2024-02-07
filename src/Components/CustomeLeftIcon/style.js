import { StyleSheet } from "react-native";

export const style =(width, height, isProtrait)=>StyleSheet.create({
    icon:{
        width:isProtrait?width*.08:height*.08,
        height:isProtrait?width*.08:height*.08,
        resizeMode:"contain",
        marginLeft:15
    }
})