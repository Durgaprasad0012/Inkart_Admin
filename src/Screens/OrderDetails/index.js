import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useDimensionContext } from '../../context'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import CustomeButton from '../../Components/CustomeButton'
import ActionSheet from "react-native-actions-sheet";
import { colors } from '../../Components/Common/color'
import { style } from './style'
import CustomeDropDown from '../../Components/CustomeDropDown'

const OrderDetails = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const route = useRoute()
    const { order } = route.params
    const actionSheetRef = useRef(null)
    const [orderStatus, setOrderStatus] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (order) {
            setOrderStatus(order?.orderStatus)
        }
    }, [order])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Orders Details',
            headerLeft: () => <CustomeLeftIcon type={'back'} />,
        })
    }, [])

    // handleUpdateOrder
    const handleUpdateOrder = async () => {
        try {
            if (order?.id) {
                if(status === ''){
                    Snackbar.show({
                        text: "Please Selected your order Status..",
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: colors.dangerTrans,
                        textColor: colors.white
                    })
                }else{
                await firestore().collection('Orders').doc(order?.id).update({
                    orderStatus: status
                }).then(()=>{
                    setOrderStatus(status.name)
                    actionSheetRef.current.hide()
                    setTimeout(() => {
                        Snackbar.show({
                            text: "Order Status is Uploaded",
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor: colors.primary_green,
                            textColor: colors.white
                        })
                    }, 1000);
                })}
            }
        } catch (error) {
            console.log("ERROR : ", error);
        }
    }
    
    // Update Status info
    const arraySections = [
        { name: 'Ordered' },
        { name: 'Order Inprogress' },
        { name: 'Order Packed' },
        { name: 'Order Shiped' },
        { name: 'Out of Delivery' },
        { name: 'Delivered' },
        { name: 'Retruned' },
        { name: 'Faild' },
    ]
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {/* Action Sheet */}
                <ActionSheet ref={actionSheetRef}>
                    <View style={styles.actionSheetView}>
                        <View style={styles.actionHeadView}>
                            <Text style={styles.actionHead}>Update Status..</Text>
                            <TouchableOpacity
                                onPress={() => actionSheetRef.current.hide()}
                            >
                                <EvilIcons name={'close-o'} size={35} color={colors.black_level_2} />
                            </TouchableOpacity>
                        </View>
                        <CustomeDropDown data={arraySections} setData={text => setStatus(text)} preData={orderStatus} />
                        <CustomeButton
                            width={'100%'}
                            text={"Update"}
                            onPress={() => handleUpdateOrder()}
                        />
                    </View>
                </ActionSheet>

                {/* Order Status */}
                <View style={styles.orderBox}>
                    <Entypo name='box' size={40} color={colors.white} />
                    <View style={styles.orderIdView}>
                        <Text style={styles.headText} numberOfLines={2}>OrderID : {(order?.id).toUpperCase()}</Text>
                        <Text style={styles.headBold} numberOfLines={2}>{orderStatus ?? ''}</Text>
                    </View>
                </View>

                {/* Item Details */}
                <View>
                    <Text style={styles.items}>Items :</Text>
                    {order?.cartItems?.map((data, index) => {
                        return (
                            <View key={index} style={styles.cartItemView}>
                                <View style={styles.cartQntView}>
                                    <Text style={styles.cartQnt}>{data.quantity}</Text>
                                </View>
                                <Octicons name={'north-star'} size={18} color={colors.black_level_2} />
                                <View>
                                    <Text style={styles.cartHead}>{data.name}</Text>
                                    <Text style={styles.cartBody} numberOfLines={2}>{data.desc}</Text>
                                </View>
                                <View style={styles.priceView}>
                                    <Text style={styles.cartHead}>₹ {data.price}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>

                {/* Payment Details */}
                <View>
                    <Text style={styles.items}>Payment Details :</Text>
                    <View style={styles.payDetails}>
                        <View>
                            <Text style={styles.payBody}>Bag Total</Text>
                            <Text style={styles.payBody}>Coupon Discount</Text>
                            <Text style={styles.payBody}>Delivery</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={[styles.payBody, { alignSelf: 'flex-end' }]}>₹ 0.00</Text>
                            <Text style={styles.coupon}>Applay Coupon</Text>
                            <Text style={[styles.payBody, { alignSelf: 'flex-end' }]}>₹ 50.00</Text>
                        </View>
                    </View>
                    <View style={styles.totalAmout}>
                        <Text style={styles.cartHead}>Total Amout</Text>
                        <Text style={styles.cartHead}>₹ {order.totalAmout}</Text>
                    </View>
                </View>

                {/* Address Details */}
                <View style={{ width: '50%', overflow: 'hidden' }}>
                    <Text style={styles.items}>Address : </Text>
                    <Text style={styles.cartBody} numberOfLines={5}>{order.address}</Text>
                </View>

                {/* Payment Method */}
                <View>
                    <Text style={styles.items}>Payment Method</Text>
                    <View style={styles.methodView}>
                        <MaterialIcons name='payment' color={colors.black} size={50} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.cartBody}>******789</Text>
                            <Text style={styles.cartBody}>{order.paymentMethod}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <CustomeButton
                text={'Update Status'}
                width={'100%'}
                onPress={() => actionSheetRef.current.show()}
            />
        </View>
    )
}

export default OrderDetails