import { StyleSheet } from "react-native";
import { colors } from "../Common/color";

export const style = (width, height, isProtrait)=>StyleSheet.create({
    container:{
        height:isProtrait?width*.13:height*.1,
        backgroundColor:colors.primary_green,
        justifyContent:"space-evenly",
        alignItems:'center',
        flexDirection:'row',
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        paddingBottom:isProtrait?10:5,
        elevation:10
    },
    iconView:{
        backgroundColor:colors.primary_green,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
    }
})