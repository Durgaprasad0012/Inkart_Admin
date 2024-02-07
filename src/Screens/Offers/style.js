import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style =(width, height, isProtrait)=>StyleSheet.create({
    container:{
        padding:10,
        flex:1,
        backgroundColor:colors.white_level_1
    },
    touchEdit:{
        alignItems:'center',
        marginRight:10
    },
    actionSheetView: {
        margin: 20,
    },
    actionHeadView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: colors.primary_green,
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 10,
        marginBottom: 10
    },
    actionHead: {
        fontFamily: "Lato-Black",
        fontSize: 20,
        color: colors.primary_green,
    },
    optionView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    main:{
        flex:1,
        justifyContent:'center', 
        alignItems:'center',
        marginBottom:15,
    },
    coupon:{
        width:isProtrait?width*.95:width*.8,
        height:isProtrait?width*.35:width*.23,
        resizeMode:'center',
        margin:5,
        flexDirection:'row',
        alignItems:'center',
        position:'relative'
    },
    delete:{
        position:'absolute',
        zIndex:1,
        top:-3
    },
    offView:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:10
    },
    offText:{
        fontFamily:'Lato-Bold',
        fontSize:30,
        color:colors.black,
        paddingLeft:isProtrait?35:50
    },
    offSideText:{
        fontFamily:'Lato-Regular',
        fontSize:14,
        color:colors.primary_green,
    },
    contentView:{
        width:isProtrait?'40%':'55%',
        height:'80%',
        borderLeftWidth:1,
        borderLeftColor:colors.primary_green,
        paddingLeft:10,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    headText:{
        fontFamily:'Lato-Black',
        fontSize:18,
        color:colors.black_level_2
    },
    descText:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.black_level_3
    },
    codeView:{
        paddingLeft:15,
        height:'100%',
        alignItems:'center',
        position:'relative'
    },
    codeText:{
        fontFamily:'Lato-Bold',
        fontSize:18,
        color:colors.black_level_3,
        marginTop:10,
    },

    touchView:{
        width:100,
        borderRadius:8,
        backgroundColor:colors.primary_green,
        padding:5,
        position:'absolute',
        bottom:5,
        right:-15
    },
    touchText:{
        fontFamily:'Lato-Bold',
        justifyContent:'center', 
        alignItems:'center',
        fontSize:14,
        color:colors.white
    },
    emptyText:{
        fontFamily:'Lato-Bold',
        color:colors.white,
        fontSize:18,
        textAlign:'center',
        padding:20,
        borderRadius:8,
        backgroundColor:colors.danger
    },
})