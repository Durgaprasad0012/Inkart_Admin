import { StyleSheet } from "react-native";
import { colors } from "../Common/color";

export const style=(width, height, isProtrait)=>StyleSheet.create({
    searchContainer:{
        flexDirection:'row',
        alignItems:"center",
        borderRadius:8,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:colors.primary_green,
        marginHorizontal:8,
        backgroundColor:colors.light_green
    },
    textInput:{
        width:'90%',
        padding:10,
        color:colors.primary_green,
        letterSpacing:1,
        fontFamily:'Lato-Italic',
        fontSize:16
    },
})
