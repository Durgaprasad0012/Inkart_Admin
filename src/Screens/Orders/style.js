import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    centeredView:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.8)',
        justifyContent:'center',
        alignItems:'center'
    },
    scrollView: {
        marginTop: 10,
        marginHorizontal: 10,
        paddingBottom: isProtrait ? 50 : 100,
        alignItems: 'center',
        // flexWrap: isProtrait ? 'nowrap' : 'wrap',
    },
    orderView:{
        width:'100%',
        // height:isProtrait?'20%':'20%',
        alignSelf:'center',
        backgroundColor:colors.light_green,
        padding:10,
        marginHorizontal:10,
        borderRadius:10,
        margin:10,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.primary_green,
        paddingBottom: 15,
    },
    detailsBox: {
        width: isProtrait ? width * .5 : width * .7,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
    },
    highLights: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.primary_green,
        fontWeight: 900
    },
    addText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: colors.black_level_2,
        paddingBottom: 8
    },
    footerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
    },
})