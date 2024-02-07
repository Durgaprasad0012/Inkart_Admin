import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from './color'

const CustomeEmptyComponent = () => {
    return (
        <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No products Found....</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyBox:{
        width:'100%',
        alignSelf:'center',
        backgroundColor:colors.black_level_4,
        borderRadius:10,
        alignItems:'center',
        padding:10
    },
    emptyText:{
        fontFamily:"Lato-Italic",
        fontSize:20,
        color:colors.white,
        textAlign:'center'
    }
})
export default CustomeEmptyComponent