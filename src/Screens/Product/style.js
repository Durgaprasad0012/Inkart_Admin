import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

export const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    touchEdit: {
        alignItems: 'center',
        marginRight: 10
    },
    centeredView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        marginTop: 10,
        marginHorizontal: 10,
        paddingBottom: isProtrait ? 100 : 50,
    },
    productBox: {
        width: width,
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    productView: {
        width: isProtrait ? width * .4 : '30%',
        height: isProtrait ? "32%" : '45%',
        backgroundColor: colors.light_green,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        margin: 10,
        alignSelf: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.primary_green,
        alignItems: 'center'
    },
    image: {
        width: isProtrait ? width * .2 : height * .15,
        height: isProtrait ? width * .2 : height * .15,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 20
    },
    productDetails: {
        marginLeft: 15,
        overflow: 'hidden',
        width: isProtrait ? '100%' : '70%'
    },
    headText: {
        fontFamily: 'Lato-Bold',
        fontSize: isProtrait ? 20 : 18,
        color: colors.primary_green,
        lineHeight: 35
    },
    descText: {
        width: "85%",
        fontFamily: 'Lato-Regular',
        fontSize: isProtrait ? 14 : 16,
        color: colors.black_level_3
    },
    priceText: {
        fontFamily: 'Lato-Bold',
        fontSize: isProtrait ? 18 : 16,
        color: colors.black_level_2,
        lineHeight: 35
    },

    editDelete: {
        width: '100%',
        marginTop:10,
        paddingHorizontal: '10',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
})