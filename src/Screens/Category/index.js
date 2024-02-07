import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import ActionSheet from 'react-native-actions-sheet';
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeTextInput from '../../Components/CustomeTextInput';
import CustomeButton from '../../Components/CustomeButton';
import uploadImage from '../../Components/Common/Storages';

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDimensionContext } from '../../context'
import { Empty } from '../../context/empty';
import { colors } from '../../Components/Common/color';
import { style } from './styles'

const Category = () => {
    const dm = useDimensionContext()
    const styles = style(dm.windowWidth, dm.windowHeight, dm.isProtrait)
    const navigation = useNavigation()
    const [category, setCategory] = useState([])
    const isFocused = useIsFocused()
    const actionSheetRef = useRef(null)
    const [uploadUri, setUploadUri] = useState(null)
    const [catname, setCatName] = useState('')
    const [desc, setDesc] = useState('')


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Category',
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
        if (isFocused) getCategory()
    }, [isFocused])

    const getCategory = async () => {
        const snapshot = await firestore().collection('Categories').get()

        if (!snapshot.empty) {
            const res = snapshot.docs
                .filter(doc => doc.exists)
                .map(doc => ({ id: doc.id, ...doc?.data() }));
            setCategory(res)
        }
    }

    // handleCamera
    const handleCamera = async () => {
        const options = {
            mediaType: 'photo',
        };
        await launchCamera(options, response => {
            if (response && response.assets) {
                setUploadUri(response?.assets[0]?.uri);
            }
        });
    };
    // handleGallery

    const handleGallery = async () => {
        try {
            const options = {
                mediaType: 'photo',
            }
            await launchImageLibrary(options, (res) => {
                if (res && res?.assets) {
                    setUploadUri(res?.assets[0]?.uri)
                }
            });
        } catch (error) {
            console.log('ERROR ON GALLERY LOADING: ', error);
        }
    }

    const handleCreateCategory = async () => {
        if (
            uploadUri
            && catname !== '' && desc !== ''
        ) {
            const responseUri = await uploadImage(uploadUri);
            const _category = {
                name: catname,
                desc: desc,
                image: responseUri,
            }
            await firestore()
                .collection('Categories')
                .add(_category)
                .then(() => {
                    Snackbar.show({
                        text: 'Category is added successfully..',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.primary_green,
                        textColor: colors.white,
                        marginBottom: 50
                    });
                    actionSheetRef.current.hide()
                    getCategory()
                    setCatName('')
                    setDesc('')
                    setUploadUri(null)
                });
        } else {
            Snackbar.show({
                text: 'Fill up all the fields to continue.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.dangerTrans,
                textColor: colors.black,
            });
        }
        actionSheetRef.current.hide()
    }

    // handleDeleteCategory
    const handleDeleteCategory = async (item) => {
        Alert.alert(  
            'Banner Management',  
            `Do you want to Delete ${item.name}..?`,  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => getCategory(),  
                    style: 'cancel',  
                },  
                {text: 'Yes', onPress:async () => {
                    await firestore().collection('Categories').doc(item.id).delete().then(()=>{
                        Snackbar.show({
                            text: `${item.name} is deleted succuessfully..`,
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: colors.warning,
                            textColor: colors.black,
                        });
                        getCategory()
                    })
                }},  
            ]  
        );  
    }

    return (
        <View style={styles.container}>
            {/* Action Sheet */}
            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetView}>
                    <View style={styles.actionHeadView}>
                        <Text style={styles.actionHead}>Create Categories..</Text>
                        <TouchableOpacity
                            onPress={() => actionSheetRef.current.hide()}
                        >
                            <EvilIcons name={'close-o'} size={35} color={colors.black_level_2} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.optionView}>

                        <CustomeTextInput
                            width={'100%'}
                            placeholder={'Category Name'}
                            border={true}
                            value={catname}
                            onChangeText={text => setCatName(text)}
                        />
                        <CustomeTextInput
                            width={'100%'}
                            placeholder={'Description..'}
                            multiline={true}
                            border={true}
                            value={desc}
                            onChangeText={text => setDesc(text)}
                        />

                        <View style={styles.imageView}>
                            {uploadUri ?
                                <View>
                                    <TouchableOpacity
                                        onPress={() => setUploadUri(null)}
                                        style={styles.closeImage}
                                    >
                                        <EvilIcons name={'close-o'} size={25} color={colors.danger} />
                                    </TouchableOpacity>
                                    <Image source={{ uri: uploadUri }} style={styles.uriImage} />
                                </View>
                                : <Entypo name={'images'} size={35} color={colors.black_level_3} />}
                        </View>
                        <View style={styles.cameraOption}>
                            <TouchableOpacity
                                style={styles.touchView}
                                onPress={() => handleCamera()}
                            >
                                <Ionicons name={'camera'} size={30} color={colors.primary_green} />
                                <Text style={styles.uploadText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.touchView}
                                onPress={() => handleGallery()}
                            >
                                <Ionicons name={'image'} size={28} color={colors.primary_green} />
                                <Text style={styles.uploadText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                        <CustomeButton
                            width={'100%'}
                            text={'Create Category'}
                            onPress={() => handleCreateCategory()}
                        />
                    </ScrollView>
                </View>
            </ActionSheet>

            <ScrollView showsVerticalScrollIndicator={false}>
                {category.length > 0 ? category.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                margin: 10,
                                padding: 10,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: colors.primary_green,
                                borderRadius: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: colors.lightWhite,
                            }}
                        >
                            <MaterialCommunityIcons
                                name={'delete-empty'}
                                size={25}
                                color={colors.danger}
                                style={styles.delete}
                                onPress={() => handleDeleteCategory(item)}
                            />
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={{
                                width: '60%'
                            }}>
                                <Text style={{
                                    fontFamily: 'Lato-Bold',
                                    fontSize: 20,
                                    color: colors.primary_green
                                }}>
                                    {item.name}
                                </Text>
                                <Text style={{
                                    fontFamily: 'Lato-Regular',
                                    fontSize: 18,
                                    color: colors.black_level_2
                                }}>
                                    {item.desc}
                                </Text>
                            </View>
                        </View>
                    )
                }) : <Empty data={'No Data here....'} />}
            </ScrollView>

        </View>
    )
}

export default Category