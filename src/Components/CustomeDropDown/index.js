import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDimensionContext } from '../../context';
import { colors } from '../Common/color';
import { style } from './style';

const CustomeDropDown = (props) => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const { data, setData, preData } = props
    const [activeSections, setActiveSections] = useState([])
    const [selection, setSection] = useState('')

    useEffect(() => {
        const data = preData ? preData : data[0].name
        setSection(data)
    }, [preData])


    const _updateSections = activeSections => {
        setActiveSections(activeSections)
    }

    const SECTIONS = [
        { id: 0, sectionData: preData ?? data[0].name },
    ];


    const _renderHeader = () => {
        return (
            <View style={styles.sectionView}>
                <Text style={styles.sectionTitle}>{selection}</Text>
                <AntDesign name={'down'} size={20} color={colors.black_level_1} />
            </View>
        )
    }

    const _renderContent = () => {
        return (
            <>
                {data.map((item, index) => {
                    if (item.name === selection) {
                        return null
                    } else {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setActiveSections([]),
                                        setData(item.name),
                                        setSection(item.name)
                                }}
                            >
                                <Text style={[styles.sectionTitle, { borderTopColor: colors.black_level_1, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 10 }]}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                })}
            </>
        )
    }
    return (
        <View>
            <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
                sectionContainerStyle={styles.sectionContainerStyle}
                underlayColor={'transparent'}
            />
        </View>
    )
}

export default CustomeDropDown