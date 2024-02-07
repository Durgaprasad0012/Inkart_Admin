import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useDimensionContext } from '../../context'
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { colors } from '../Common/color';
import { style } from './style'
// import { navigated } from '../../Storage/action';

const CustomeFooterContent = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const [active, setActive] = useState('Home')
    const dispatch = useDispatch()
    // const { navigated } = useSelector(state => state.navigate)
    // console.warn(navigated);
    const handleTouch = name => {
        // dispatch(navigated({
        //     navigate: name
        // }))
        setActive(name)
        navigation.navigate(name)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => handleTouch('Home')}
                style={[
                    styles.iconView,
                    {
                        width: active === 'Home' ? 60 : null,
                        height: active === 'Home' ? 60 : null,
                    }
                ]}
            >
                <AntDesign name={'home'} size={active === 'Home' ? 30 : 25} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleTouch('Product')}
                style={[
                    styles.iconView,
                    {
                        width: active === 'Product' ? 60 : null,
                        height: active === 'Product' ? 60 : null,
                    }
                ]}
            >

                <AntDesign name={'inbox'} size={active === 'Product' ? 30 : 25} color={active === 'Product' ? colors.white : colors.white_level_3} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleTouch('Orders')}
                style={[
                    styles.iconView,
                    {
                        width: active === 'Orders' ? 60 : null,
                        height: active === 'Orders' ? 60 : null,
                    }
                ]}
            >
                <Ionicons name={'reorder-four-outline'} size={active === 'Orders' ? 30 : 25} color={active === 'Orders' ? colors.white : colors.white_level_3} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleTouch('Settings')}
                style={[
                    styles.iconView,
                    {
                        width: active === 'Settings' ? 60 : null,
                        height: active === 'Settings' ? 60 : null,
                    }
                ]}
            >
                <AntDesign name={'setting'} size={active === 'Settings' ? 30 : 25} color={active === 'Settings' ? colors.white : colors.white_level_3} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomeFooterContent