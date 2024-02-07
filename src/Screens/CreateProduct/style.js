import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    centeredView:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(255,255,255,0.8)',
        justifyContent:'center',
        alignItems:'center'
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    touchView: {
        justifyContent: "center",
        alignItems: 'center',
    },
    scrollView: {
        paddingBottom: 80
    },
    productImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10,
        borderColor: colors.primary_green,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10,
        backgroundColor: colors.lightGray,
    },
    uploadText: {
        fontFamily: 'Lato-Bold',
        letterSpacing: 1,
        fontSize: 16,
        color: colors.black_level_3,
        marginBottom: 5
    },
    closeImage: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        top: -10,
        backgroundColor: colors.white,
        borderRadius: 10,
        overflow: 'hidden'
    },
    uriImage: {
        width:100,
        height: 100,
        resizeMode: 'contain',
        borderRadius:20
    },
})