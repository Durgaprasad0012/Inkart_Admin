import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait)=> StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:15
    },
    ContentBox:{
        width:isProtrait?'90%':'50%',
        height:isProtrait?'25%':'30%',
        borderRadius:10,
        marginVertical:isProtrait?10:5,
        flexDirection:'row',
        alignItems:"center"
    },
    img:{
        width:isProtrait?80:40,
        height:isProtrait?80:40,
        resizeMode:'contain',
        marginLeft:15,
        marginRight:20,
    },
    countText:{
        fontFamily:'Lato-Black',
        fontSize:isProtrait?24:20,
        color:colors.white,
    },
    itemName:{
        fontFamily:'Lato-Bold',
        fontSize:isProtrait?18:16,
        color:colors.white_level_2,
    },
})