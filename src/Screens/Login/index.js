import React, { useState } from 'react'
import { View, TouchableOpacity, ImageBackground, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import { colors } from '../../Components/Common/color';
import CustomeTextInput from '../../Components/CustomeTextInput';
import CustomeButton from '../../Components/CustomeButton';
import { useDispatch } from 'react-redux';
import { login } from '../../Storage/action';
import { useDimensionContext } from '../../context';
import style from './style';


const Login = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  // handleLogin
  const handleLogin = async () => {
    if (email.trim() === "admin@mail.com" && password.trim() === "123") {
      await firestore()
        .collection('Users')
        .where('email', "==", email.trim().toLowerCase())
        .where('status', '==', true)
        .get()
        .then(snapshort => {
          if (!snapshort.empty) {
            snapshort.forEach(res => {
              const respData = res.data()
              if (respData.password === password.trim()) {
                dispatch(login({
                  userId: res.id
                }))
                Snackbar.show({
                  text: 'Welcome Home',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primary_green,
                  textColor: colors.white_level_1,
                  fontFamily: 'Lato-Italic',
                  marginBottom:100
                })
              }
            })
          }
        })
    } else {
      Snackbar.show({
        text: 'The entered credentials is invalid.!, please try agin',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.danger,
        textColor: colors.white_level_2,
        fontFamily: 'Lato-Italic',
        marginBottom:100
      })
    }

  }

  // handlesecureTextEntry
  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../Assets/img/bgTOP.jpg')} style={styles.bgImage} />
      <View style={styles.loginSectionView}>
        <Image source={require('../../Assets/img/logo.jpeg')} style={styles.logoImg} />

        <CustomeTextInput
          width={'90%'}
          border={true}
          type={'email-address'}
          secureTextEntry={false}
          placeholder={'E-mail'}
          onChangeText={text => setEmail(text.toLowerCase())}
          icon={
            <Image
              source={require('../../Assets/img/user_icon.png')}
              style={styles.icon}
            />
          }
        />
        <CustomeTextInput
          width={'90%'}
          border={true}
          placeholder={'Password'}
          secureTextEntry={secureTextEntry}
          onChangeText={text => setPassword(text)}
          icon={
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Image
                source={secureTextEntry ? require('../../Assets/img/view.png') : require('../../Assets/img/hide.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          }
        />
        <CustomeButton text={'Login'} onPress={handleLogin} width={'90%'} />
      </View>
    </View>
  )
}

export default Login