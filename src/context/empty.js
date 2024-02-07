import { Text } from "react-native"
import { colors } from "../Components/Common/color"

export const Empty = ({data}) => {
    return (
        <Text style={{
            fontFamily: 'Lato-Italic',
            fontSize: 18,
            color: colors.danger,
            backgroundColor: colors.dangerTrans,
            padding: 20,
            textAlign:'center',
            borderRadius:8,
        }}>
            {data}
        </Text>
    )
}