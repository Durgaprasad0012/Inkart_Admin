import React, { useLayoutEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { useDimensionContext } from '../../context'
import { useNavigation } from '@react-navigation/native'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomeButton from '../../Components/CustomeButton'
import { signOut } from '../../Storage/action'

import { colors } from '../../Components/Common/color'
import { style } from './style'

const Settings = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerLeft: () => <CustomeLeftIcon />
    })
  }, [])

  // handleSighOut
  const handleSighOut = () => {
    Alert.alert('SignOut', 'Are you sure want to signOut..?', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(signOut()) },
    ]);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headContent}>
        <Ionicons name={'settings'} size={dimensions.isProtrait ? 60 : 30} colors={colors.white} />
        <Text style={styles.headText}>Administrator</Text>
      </View>

      <CustomeButton
        width={dimensions.isProtrait ? "100%" : '30%'}
        text={'SignOut'}
        icon={() => <AntDesign name={'logout'} size={20} colors={colors.white} />}
        onPress={() => handleSighOut()}
      />

    </View>
  )
}

export default Settings