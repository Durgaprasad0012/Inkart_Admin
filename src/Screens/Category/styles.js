import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
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
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
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
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 20
    },
    imageView: {
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.primary_green,
        width: '100%',
        padding: 10,
        marginVertical: 10
    },
    cameraOption: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    touchView: {
        justifyContent: "center",
        alignItems: 'center',
    },
    uploadText: {
        fontFamily: 'Lato-Bold',
        letterSpacing: 1,
        fontSize: 14,
        color: colors.black_level_3,
        textAlign: 'center',
    },
    delete :{
        position:"absolute",
        zIndex:1,
        right:0,
        top:0
    }
})