import React from 'react'
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { signOut } from '../../Storage/action'

import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDimensionContext } from '../../context'
import { style } from './style'
import { colors } from '../Common/color'

const CustomeDrawerContent = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    // handleSignOut
    const handleSignOut = () => {
        Alert.alert('SignOut', 'Are you sure want to signOut..?', [
            {
                text: 'Cancel',
                onPress: () => navigation.goBack(),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(signOut()) },
        ]);
    }
    const content = [
        {
            itemId: 0,
            itemName: 'Home',
            navigation: 'Home',
            icon: () => {
                return (
                    <Ionicons name={'home'} size={20} color={colors.black_level_2} />
                )
            }
        },
        {
            itemId: 1,
            itemName: 'Products',
            navigation: 'Product',
            icon: () => {
                return (
                    <Entypo name={'shopping-cart'} size={20} color={colors.black_level_2} />
                )
            }
        },
        {
            itemId: 2,
            itemName: 'Categories',
            navigation: 'Category',
            icon: () => {
                return (
                    <MaterialIcons name={'category'} size={20} color={colors.black_level_2} />
                )
            }
        },
        {
            itemId: 3,
            itemName: 'Orders',
            navigation: 'Orders',
            icon: () => {
                return (
                    <Ionicons name={'reorder-four-sharp'} size={20} color={colors.black_level_2} />
                )
            }
        },
        {
            itemId: 4,
            itemName: 'Reviews',
            navigation: 'Footer',
            icon: () => {
                return (
                    <MaterialIcons name={'reviews'} size={20} color={colors.black_level_2} />
                    )
                }
            },
            {
                itemId: 5,
                itemName: 'Banners',
                navigation: 'Banner',
                icon: () => {
                    return (
                        <Entypo name={'documents'} size={20} color={colors.black_level_2} />
                        )
                    }
                },
                {
                    itemId: 6,
                    itemName: 'Offers',
                    navigation: 'Offers',
                    icon: () => {
                        return (
                    <MaterialIcons name={'local-offer'} size={20} color={colors.black_level_2} />
                )
            }
        },
        {
            itemId: 7,
            itemName: 'SignOut',
            onPress: handleSignOut,
            icon: () => {
                return (
                    <MaterialIcons name={'logout'} size={20} color={colors.black_level_2} />
                )
            }
        },
    ]
    return (
        <View style={styles.container}>
            <View style={styles.adminView}>
                <Text style={styles.adminText}>ADMINISTRATOR</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.contetView}>
                {content.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.itemId}
                            style={styles.content}
                            onPress={() => item.navigation ? navigation.navigate(item.navigation) : item.onPress()}
                        >
                            <Text style={styles.contentText}> {item.itemName} </Text>
                            {item.icon()}
                        </TouchableOpacity>
                    )
                })}
                <View style={styles.footerBox}>
                    <Image source={require('../../Assets/img/logo.jpeg')} style={styles.footerImage} />
                </View>
            </ScrollView>
        </View>
    )
}

export default CustomeDrawerContent