import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../context'
import { style } from './style'

const CustomeLeftIcon = props => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    // handleChange
    const handleChange = () => {
        if (props.type === 'back') {
            navigation.goBack()
        } else {
            navigation.toggleDrawer()
        }
    }
    return (
        <TouchableOpacity onPress={handleChange} >
            {props.type === 'back' ?
                <Image source={require('../../Assets/img/left-arrow.png')} style={styles.icon} />
                :
                <Image source={require('../../Assets/img/drawer.png')} style={styles.icon} />
            }
        </TouchableOpacity>
    )
}

export default CustomeLeftIcon