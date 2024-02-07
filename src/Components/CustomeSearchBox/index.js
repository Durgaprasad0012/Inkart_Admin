import React from 'react'
import { View, Text, TextInput, Image } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDimensionContext } from '../../context'
import { colors } from '../Common/color'
import { style } from './style'

const CustomeSearchBox = (props) => {
    const {placeholder,onChangeText, value} = props
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  return (
    <View style={styles.searchContainer}>
        <TextInput 
         style={[styles.textInput]}
         placeholder={placeholder}
         selectionColor={colors.primary}
         onChangeText={onChangeText}
         placeholderTextColor={colors.black_level_3}
         value={value}
        />
        <FontAwesome name={'search'} size={20} color={colors.black_level_3}/>
    </View>
  )
}

export default CustomeSearchBox