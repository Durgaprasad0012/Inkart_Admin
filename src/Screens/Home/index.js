import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../context'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeRightLogo from '../../Components/CustomeRightLogo'
import { colors } from '../../Components/Common/color'
import { style } from './style'
import { useSelector } from 'react-redux'

const Home = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const [products, setProducts] = useState(0)
  const [orders, setOrders] = useState(0)
  const [users, setUsers] = useState(0)
  const userId = useSelector(state=>state.userId)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        backgroundColor: colors.white,
        height: 60,
      },
      headerLeft: () => <CustomeLeftIcon />,
      headerRight:()=> <CustomeRightLogo />
    })
  }, [])

  useEffect(() => {
    getAll()
  }, [])
  
  // Api for all Details
  const getAll=async()=>{
    const productsReff = await firestore().collection('Products').get()
    const ordersReff = await firestore().collection('Orders').get()
    const userstReff = await firestore().collection('Users').where("id",'!=',userId).get()

    setOrders(ordersReff.size)
    setProducts(productsReff.size)
    setUsers(userstReff.size)
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product')}
        style={[styles.ContentBox, { backgroundColor: colors.majantha, }]}
      >
        <Image source={require('../../Assets/img/gadgets.png')} style={styles.img} />
        <View>
          <Text style={styles.countText}>{products}</Text>
          <Text style={styles.itemName}>Products</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Orders')}
        style={[styles.ContentBox, { backgroundColor: colors.warning }]}
      >
        <Image source={require('../../Assets/img/orders.jpg')} style={styles.img} />
        <View>
          <Text style={styles.countText}>{orders}</Text>
          <Text style={styles.itemName}>Orders</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Users')}
        style={[styles.ContentBox, { backgroundColor: colors.gray, }]}
      >
        <Image source={require('../../Assets/img/userG.png')} style={styles.img} />
        <View>
          <Text style={styles.countText}>{users}</Text>
          <Text style={styles.itemName}>Users</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Home