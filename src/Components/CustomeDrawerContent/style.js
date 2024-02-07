import { StyleSheet } from "react-native";
import { colors } from "../Common/color";

export const style =(width, height, isProtrait)=> StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:15
    },
    adminView:{
        height:isProtrait?width*.2:height*.15,
        backgroundColor:colors.primary_green,
        justifyContent:"center",
        alignContent:'center',
        elevation:10
    },
    adminText:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        color:colors.white_level_2,
        textAlign:'center'
    },
    contetView:{
        padding:isProtrait?15:8,
    },
    content:{
        marginVertical:isProtrait?10:8,
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        borderRadius:10
    },
    contentText:{
        fontFamily:'Lato-Bold',
        fontSize:isProtrait?18:16,
        color:colors.black_level_2,
        padding:10,
    },
    footerBox:{
        height:150,
        padding:15,
        alignItems:'center',
        justifyContent:'center',
    },
    footerImage:{
        width:'60%',
        resizeMode:'contain'
    },
    footerText:{
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:colors.black_level_3
    }
    
})