import { View, Text, Image } from 'react-native'
import React from 'react'
import { colors } from '../../Components/Common/color'

const Splach = () => {
  return (
    <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:colors.white
    }}>
        <Image source={require('../../Assets/img/AdminApp.png')} style={{
            width:150,
            resizeMode:'contain',
        }} />
        <Text style={{fontFamily:'Lato-Black', fontSize:25, color:colors.black_level_3}}>Admin App</Text>
    </View>
  )
}

export default Splach