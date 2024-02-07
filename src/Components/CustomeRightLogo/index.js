import { View, Text, Image } from 'react-native'
import React from 'react'

const CustomeRightLogo = () => {
  return (
    <View style={{
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    }}>
        <Image source={require('../../Assets/img/logo.jpeg')} style={{
            width:110,resizeMode:'contain'
        }} />
    </View>
  )
}

export default CustomeRightLogo