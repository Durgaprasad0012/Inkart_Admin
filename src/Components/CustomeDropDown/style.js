import { StyleSheet } from "react-native";
import { colors } from "../Common/color";

export const style=(width, height, isProtrait)=>StyleSheet.create({
    sectionContainerStyle: {
        borderBottomColor: colors.primary_green,
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical:10,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:8
    },
    sectionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    sectionTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.black_level_1,
    },
})