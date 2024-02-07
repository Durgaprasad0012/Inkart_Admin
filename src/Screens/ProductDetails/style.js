import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait)=> StyleSheet.create({
    container:{
        flex:1,
        padding:10,
    },
    touchEdit:{
        alignItems:'center',
        marginRight:10
    },
    imageView:{
        padding:20,
        width:isProtrait?null:width*.6,
        flexDirection:isProtrait?'column':'row',
        alignItems:isProtrait?null:'center',
        justifyContent:isProtrait?null:"space-around" 
    },
    image:{
        alignSelf:'center',
        width:isProtrait?150:100,
        height:isProtrait?150:100,
        resizeMode:'contain',
        marginBottom:isProtrait?20:null
    },
    productName:{
        fontFamily:'Lato-Black',
        fontSize:25,
        color:colors.primary_green,
        lineHeight:35,
    },
    priceView:{
        justifyContent:"space-between",
        alignItems:'center',
        flexDirection:'row',
        width:isProtrait?120:130,
    },
    priceText:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        lineHeight:35,
    },
    scrollView:{
        paddingHorizontal:10,
        paddingBottom:isProtrait?100:50
    },
    productDetailsView: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        paddingBottom: 10
    },
    productDetails: {
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.black_level_1,
        marginVertical: 10
    },
    desc: {
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black_level_3,
        marginVertical: 10
    },
})