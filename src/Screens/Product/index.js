import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import { useDimensionContext } from '../../context'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeSearchBox from '../../Components/CustomeSearchBox';
import CustomeEmptyComponent from '../../Components/Common/CustomeEmptyComponent';
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from '../../Components/Common/color'
import { style } from './style'

const Product = () => {
  const dimensions = useDimensionContext()
  const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
  const navigation = useNavigation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const isFocused = useIsFocused()
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product',
      headerLeft: () => <CustomeLeftIcon />,
      headerRight: () => <CustomeRightEdit />,
    })
  }, [])

  // CustomeRightEdit
  const CustomeRightEdit = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', { type: 'create' })}
        style={styles.touchEdit}
      >
        <AntDesign
          name={'plussquareo'}
          size={30}
          color={colors.black_level_2} />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true)
      getProducts()
      setTimeout(() => {
        setLoading(false)
      }, 1500);
    }
  }, [isFocused])

  // Product API
  const getProducts = async () => {
    try {
      const snapshot = await firestore()
        .collection('Products')
        .get()
      if (!snapshot.empty) {
        const res = snapshot.docs
          .filter(doc => doc.exists)
          .map(doc => ({ id: doc.id, ...doc?.data() }));
        setProducts(res)
      } else {
        setProducts([])
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
      .collection('Products')
      .orderBy('name')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
    if (!snapshot.empty) {
      const res = snapshot.docs
        .filter(doc => doc.exists)
        .map(doc => ({ id: doc.id, ...doc?.data() }));
      setProducts(res)
    } else {
      setProducts([])
    }
  }

  // handleEditTouch
  const handleEditTouch = product => {
    navigation.navigate('CreateProduct', { type: 'edit', data: product })
  }

  // handleDeleteTouch
  const handleDeleteTouch = async product => {
    try {
      Alert.alert(
        'Product Management', 'Do you want to delete this...',
        [
          {
            text: 'Yes', onPress: async () => {
              await firestore().collection('Products').doc(product.id).delete().then(() => {
                Snackbar.show({
                  text: `${product.name} is delete by Admin..`,
                  backgroundColor: colors.warning,
                  duration: Snackbar.LENGTH_LONG,
                  fontFamily: 'Lato-Italic',
                  textColor: colors.white,
                  marginBottom: 100,
                })
                getProducts()
              })
            }
          },
          { text: 'Cancel', onPress: () => getProducts() },
        ],
        {
          cancelable: false
        }
      );

    } catch (error) { console.log("ERROR: ", error); }
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
        placeholder={'Search here...'}
        onChangeText={text => handleSearchText(text)}
        value={searchText}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.productBox}>
          {products.length > 0 ? products.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetails", { product: item })}
                key={index}
                style={styles.productView}
              >

                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.productDetails}>
                  <Text numberOfLines={1} style={styles.headText}>{item.name}</Text>
                  <Text numberOfLines={1} style={styles.descText}>{item.desc}</Text>
                  <Text style={styles.priceText}>₹ {item.price}</Text>
                </View>
                <View
                  style={styles.editDelete}
                >
                  <TouchableOpacity
                    onPress={() => handleEditTouch(item)}
                  >
                    <FontAwesome name={'edit'} size={20} color={colors.black_level_3} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteTouch(item)}
                  >
                    <MaterialCommunityIcons name={'delete-empty'} size={25} color={colors.black_level_3} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          }) :
            <CustomeEmptyComponent />
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Product