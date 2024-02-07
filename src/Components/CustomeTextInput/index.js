import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../Common/color'

const CustomeTextInput = (props) => {
  const { width, border, placeholder, secureTextEntry, onChangeText, icon, multiline, type, value } = props
  return (
    <View style={{
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      width: width,
      height:multiline?'20%':null,
      marginVertical: 15,
      borderRadius: 10,
      borderWidth: border ? StyleSheet.hairlineWidth : 0,
      borderColor: colors.primary_green,
      backgroundColor:colors.lightGray,
    }}>
      <TextInput
        placeholder={placeholder}
        selectionColor={colors.primary_green}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.black_level_4}
        multiline={multiline? true:false}
        keyboardType={type}
        blurOnSubmit={true}
        value={value}
        style={{
          color: colors.black,
          fontFamily: 'Lato-Ragular',
          fontSize: 16,
          letterSpacing: 1,
          width: icon ? '80%' : '100%'
        }}
      />
      <View>
        {icon ? icon : null}
      </View>

    </View>
  )
}

export default CustomeTextInput