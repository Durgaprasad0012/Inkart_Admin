import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        justifyContent:"space-around",
        alignItems:'center'
    },
    headContent: {
        width:isProtrait?"100%":"30%",
        padding: 15,
        backgroundColor: colors.primary_green,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headText: {
        fontFamily: 'Lato-Black',
        fontSize: isProtrait ? 30 : 20,
    }
})