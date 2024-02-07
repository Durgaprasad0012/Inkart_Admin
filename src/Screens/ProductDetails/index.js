import React, { useLayoutEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import { useDimensionContext } from '../../context'
import ExtraInfo from './Components/ExtraInfo'
import { colors } from '../../Components/Common/color'
import { style } from './style'

const ProductDetails = () => {
  const dm = useDimensionContext()
  const styles = style(dm.windowWidth, dm.windowHeight, dm.isProtrait)
  const navigation = useNavigation()
  const route = useRoute()
  const { product } = route.params
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Description',
      headerLeft: () => <CustomeLeftIcon type={'back'} />,
      headerRight: () => <CustomeRightEdit />,
    })
  }, [])

  // CustomeRightEdit
  const CustomeRightEdit = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', { type: 'edit', data: product })}
        style={styles.touchEdit}
      >
        <FontAwesome
          name={'edit'}
          size={35}
          color={colors.black_level_2} />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View>
          <Text style={styles.productName}>{product?.name}</Text>
          <View style={styles.priceView}>
            <Text style={[styles.priceText, { color: colors.black_level_1 }]}>₹ {product?.price}</Text>
            <Text style={[styles.priceText, { color: colors.primary_green }]}>25% off</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.productDetailsView}>
          <Text style={styles.productDetails}>Product Details</Text>
          <Text style={styles.desc}>{product?.desc}</Text>
        </View>
        <ExtraInfo />
      </ScrollView>
    </View>
  )
}

export default ProductDetails