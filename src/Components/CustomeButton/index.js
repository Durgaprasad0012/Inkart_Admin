import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { colors } from '../Common/color'

const CustomeButton = props => {
  const { onPress, text, width, icon } = props
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection:icon?'row':'column',
        justifyContent:icon?'center':'space-around',
        alignItems:'center',
        padding: 10,
        alignSelf: 'center',
        backgroundColor: colors.primary_green,
        borderRadius: 8,
        width: width,
        marginVertical: 15
      }}
    >
      <Text
        style={{
          fontFamily: 'Lato-Bold',
          fontSize: 18,
          color: colors.white,
          textAlign: 'center',
          paddingVertical: 5,
          marginRight:icon?5:null
        }}
        >{text}</Text>
        {icon ?icon():null}
    </TouchableOpacity>
  )
}

export default CustomeButton