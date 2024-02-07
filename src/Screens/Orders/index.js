import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import { useDimensionContext } from '../../context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeSearchBox from '../../Components/CustomeSearchBox'
import CustomeEmptyComponent from '../../Components/Common/CustomeEmptyComponent'
import { colors } from '../../Components/Common/color'
import { style } from './style'

const Orders = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const [orders, setOrders] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerLeft: () => <CustomeLeftIcon />,
    })
  }, [])

  useEffect(() => {
    if (isFocused){ 
      setLoading(true)
      getOrders()
      setTimeout(() => {
        setLoading(false)
      }, 1500);
    }
  }, [isFocused])

  // Product API
  const getOrders = async () => {
    try {
      const snapshot = await firestore()
        .collection('Orders')
        .get()
      if (!snapshot.empty) {
        const res = snapshot.docs
          .filter(doc => doc.exists)
          .map(doc => ({ id: doc.id, ...doc?.data() }));
        setOrders(res)
      } else {
        setOrders([])
        Snackbar.show({
          text: "no result found...!",
          backgroundColor: colors.danger,
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'Lato-Italic',
          textColor: colors.white
        })
      }
    } catch (error) {
      console.log("ERROR :", error);
    }
  }


  // handleSearchText
  const handleSearchText = async text => {
    setSearchText(text)
    const snapshot = await firestore()
      .collection('Orders')
      .orderBy('orderId')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
    if (!snapshot.empty) {
      const res = snapshot.docs
        .filter(doc => doc.exists)
        .map(doc => ({ id: doc.id, ...doc?.data() }));
      setOrders(res)
    } else {
      setOrders([])
    }
  }
  const order = dateTime => {
    return moment(new Date(dateTime)).format('l LT')
  }
  return (
    <View style={styles.container}>
      {/* Model */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}>
        <View style={styles.centeredView}>
          <ActivityIndicator size={75} color={colors.primary_green} />
        </View>
      </Modal>
      <CustomeSearchBox
        placeholder={'Search here with OrderID..'}
        onChangeText={text => handleSearchText(text)}
        value={searchText}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {orders.length > 0 ? orders.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderDetails", { order: item })}
              key={index}
              style={styles.orderView}
            >
              <View style={styles.details}>
                <View style={styles.detailsBox}>
                  <Text style={[styles.title, { color: colors.black_level_1 }]}>ID : #{item.orderId}</Text>
                  <Text style={[styles.highLights, { color: colors.black_level_2 }]}>
                    Ordered on :
                    <Text style={[styles.highLights, { color: colors.primary_green }]}>{order(item.created)}</Text>
                  </Text>
                  <Text style={styles.addText}>{item.address}</Text>
                  <Text>
                    paid :
                    <Text style={[styles.highLights, { color: colors.primary_green }]}>
                      ₹ {item.totalAmout}
                    </Text>,
                    Items:
                    <Text style={[styles.highLights, { color: colors.primary_green }]}>
                      {item.cartItems.length}
                    </Text>
                  </Text>
                </View>
                <Image source={require('../../Assets/img/map.webp')} style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }} />
              </View>
              <View style={styles.footerView}>
                <Text style={[styles.title, { color: colors.black_level_2 }]}>Order : {item.orderStatus}</Text>
                <Text style={[styles.title, { color: colors.black_level_2 }]}>Rate & Reviews</Text>
              </View>
            </TouchableOpacity>
          )
        }) :
          <CustomeEmptyComponent />
        }
      </ScrollView>
    </View>
  )
}

export default Orders