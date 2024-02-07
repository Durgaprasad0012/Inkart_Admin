import { StyleSheet } from "react-native";
import { colors } from "../../Components/Common/color";

const style = (width, height, isProtrait) => StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    bgImage: {
        width: '100%',
        height: 150,
    },
    loginSectionView: {
        position: 'absolute',
        top: 100,
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    logoImg: {
        width: '100%',
        height: 60,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 5,
        marginTop: 5
    },

})

export default style