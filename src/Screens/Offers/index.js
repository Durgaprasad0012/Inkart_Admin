import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeTextInput from '../../Components/CustomeTextInput';
import CustomeButton from '../../Components/CustomeButton';
import { useDimensionContext } from '../../context'

import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from '../../Components/Common/color';
import { style } from './style'
import { Empty } from '../../context/empty';

const Offers = () => {
    const dm = useDimensionContext()
    const styles = style(dm.windowWidth, dm.windowHeight, dm.isProtrait)
    const navigation = useNavigation()
    const [offers, setOffers] = useState([])
    const [head, setHead] = useState('')
    const [desc, setDesc] = useState('')
    const [offer, setOffer] = useState('')
    const [code, setCode] = useState('')
    const isFocused = useIsFocused()
    const actionSheetRef = useRef(null)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Offers',
            headerLeft: () => <CustomeLeftIcon />,
            headerRight: () => <CustomeRightEdit />,
        })
    }, [])

    // CustomeRightEdit
    const CustomeRightEdit = () => {
        return (
            <TouchableOpacity
                onPress={() => actionSheetRef.current.show()}
                style={styles.touchEdit}
            >
                <EvilIcons
                    name={'plus'}
                    size={35}
                    color={colors.black_level_2} />
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (isFocused) getOffers()
    }, [isFocused])

    // Offers API
    const getOffers = async () => {
        const snapshot = await firestore().collection('Offers').get()

        if (!snapshot.empty) {
            const res = snapshot.docs
                .filter(doc => doc.exists)
                .map(doc => ({ id: doc.id, ...doc?.data() }));
            setOffers(res)
        }
    }


    // handleCreateOffer
    const handleCreateOffer = async () => {
        if (head !== '' & desc !== "" && offer !== "" && code !== "") {
            coupon = {
                head: head,
                desc: desc,
                offer: offer,
                code: code.toUpperCase(),
                created: Date.now()
            }
            await firestore().collection('Offers').add(coupon).then(() => {
                Snackbar.show({
                    text: 'Your Offer is added..',
                    duration: Snackbar.LENGTH_SHORT,
                    textColor: colors.white,
                    backgroundColor: colors.primary_green,
                    fontFamily: "Lato-Italic",
                })
                actionSheetRef.current.hide()
                getOffers()
            })
        } else {
            Snackbar.show({
                text: 'Please fill the fields..',
                duration: Snackbar.LENGTH_SHORT,
                textColor: colors.black_level_1,
                backgroundColor: colors.dangerTrans,
                fontFamily: "Lato-Italic",
            })
        }
    }

    // handleDelete
    const handleDelete = async item => {
        Alert.alert(
            'Banner Management',
            `Do you want to Delete ${item.head}..?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => getOffers(),
                    style: 'cancel',
                },
                {
                    text: 'Yes', onPress: async () => {
                        await firestore().collection('Offers').doc(item.id).delete().then(() => {
                            Snackbar.show({
                                text: `${item.head} is deleted succuessfully..`,
                                duration: Snackbar.LENGTH_LONG,
                                backgroundColor: colors.warning,
                                textColor: colors.black,
                            });
                            getOffers()
                        })
                    }
                },
            ]
        );
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >
            {/* Action Sheet */}
            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetView}>
                    <View style={styles.actionHeadView}>
                        <Text style={styles.actionHead}>Create Coupon..</Text>
                        <TouchableOpacity
                            onPress={() => actionSheetRef.current.hide()}
                        >
                            <EvilIcons name={'close-o'} size={35} color={colors.black_level_2} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.optionView}>

                        <CustomeTextInput
                            width={'100%'}
                            placeholder={'Head content'}
                            value={head}
                            border={true}
                            onChangeText={(text) => setHead(text)}
                        />
                        <CustomeTextInput
                            width={'100%'}
                            placeholder={'Description..'}
                            value={desc}
                            multiline={true}
                            border={true}
                            onChangeText={(text) => setDesc(text)}
                        />
                        <CustomeTextInput
                            width={'100%'}
                            placeholder={'Offers'}
                            value={offer}
                            type={'numeric'}
                            border={true}
                            onChangeText={(text) => setOffer(text)}
                        />
                        <CustomeTextInput
                            width={'100%'}
                            placeholder={'Offer code'}
                            value={code}
                            border={true}
                            onChangeText={(text) => setCode(text)}
                        />
                        <CustomeButton
                            width={'100%'}
                            text={'Create Coupon'}
                            onPress={() => handleCreateOffer()}
                        />
                    </ScrollView>
                </View>
            </ActionSheet>
            {offers.length > 0 ? offers.map((item, index) => {
                return (
                    <View
                        key={index}
                        style={styles.main}
                    >
                        <ImageBackground source={require('../../Assets/img/Coupon.png')} style={styles.coupon} >
                            <TouchableOpacity
                                onPress={() => handleDelete(item)}
                                style={styles.delete}
                            >
                                <MaterialCommunityIcons name={'delete-circle-outline'} color={colors.danger} size={30} />
                            </TouchableOpacity>
                            <View style={styles.offView}>
                                <Text style={styles.offText}>{item.offer}</Text>
                                <View>
                                    <Text style={styles.offSideText}>%</Text>
                                    <Text style={styles.offSideText}>Off</Text>
                                </View>
                            </View>
                            <View style={styles.contentView}>
                                <Text numberOfLines={1} style={styles.headText}>{item.head}</Text>
                                <Text numberOfLines={2} style={styles.descText}>{item.desc}</Text>
                            </View>
                            <View style={styles.codeView}>
                                <Text style={styles.codeText}>Use Code</Text>
                                <TouchableOpacity style={styles.touchView}>
                                    <Text style={styles.touchText}>{item.code}</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                )
            }) :
                <Empty data={'No offers yet...'} />
            }

        </ScrollView>
    )
}

export default Offers