import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Alert } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDimensionContext } from '../../context'
import uploadImage from '../../Components/Common/Storages';
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeButton from '../../Components/CustomeButton';
import CustomeTextInput from '../../Components/CustomeTextInput';
import ActionSheet from 'react-native-actions-sheet';

import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from '../../Components/Common/color';
import { style } from './style'

const Banner = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const isFocued = useIsFocused()
    const [banners, setBanners] = useState([])
    const [head, setHead] = useState('')
    const [desc, setDesc] = useState('')
    const [uploadUri, setUploadUri] = useState(null)

    const actionSheetRef = useRef(null)


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Banners',
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
                <AntDesign
                    name={'plussquareo'}
                    size={30}
                    color={colors.black_level_2} />
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (isFocued) getBanners()
    }, [isFocued])

    // getBanners API
    const getBanners = async () => {
        try {
            const snapshot = await firestore().collection('Banners').get()
            if (!snapshot.empty) {
                const res = snapshot.docs
                    .filter(doc => doc.exists)
                    .map(doc => ({ id: doc.id, ...doc?.data() }));
                setBanners(res)
            }
        } catch (error) {
            console.log("Error: ", error);
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


    // handleCreateBanner
    const handleCreateBanner = async () => {
        if (
            uploadUri
            && head !== '' && desc !== ''
        ) {
            const responseUri = await uploadImage(uploadUri);
            const banners = {
                head: head,
                desc: desc,
                image: responseUri,
            };
            console.warn(responseUri);
            await firestore()
                .collection('Banners')
                .add(banners)
                .then(() => {
                    Snackbar.show({
                        text: 'Banner is added successfully..',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.primary_green,
                        textColor: colors.white,
                        marginBottom: 50
                    });
                    actionSheetRef.current.hide()
                    getBanners()
                });
        } else {
            Snackbar.show({
                text: 'Fill up all the fields to continue.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.dangerTrans,
                textColor: colors.black,
            });
        }
    }

    // handleDelete
    const handleDelete = async (banner)=>{
        Alert.alert(  
            'Banner Management',  
            `Do you want to Delete ${banner.head}..?`,  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => getBanners(),  
                    style: 'cancel',  
                },  
                {text: 'Yes', onPress:async () => {
                    await firestore().collection('Banners').doc(banner.id).delete().then(()=>{
                        Snackbar.show({
                            text: `${banner.head} is deleted succuessfully..`,
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: colors.warning,
                            textColor: colors.black,
                        });
                        getBanners()
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
                        <Text style={styles.actionHead}>Create Banner..</Text>
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
                            text={'Create Banner'}
                            onPress={() => handleCreateBanner()}
                        />
                    </ScrollView>
                </View>
            </ActionSheet>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                {banners.length > 0 ? banners.map((item, index) => {
                    return (
                        <View key={index}
                            style={styles.bannerBox}
                        >
                            <TouchableOpacity
                            onPress={()=>handleDelete(item)}
                            style={styles.delete}
                            >
                                <MaterialCommunityIcons name={'delete-circle-outline'} size={35} color={colors.danger} />
                            </TouchableOpacity>
                            <ImageBackground
                                source={{ uri: item.image }}
                                style={styles.imageBackground}
                            >
                                <View style={styles.contentText}>
                                    <Text style={styles.headText}>{item.head}</Text>
                                    <Text style={styles.headDesc}>{item.desc}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )
                })
                    : null}
            </ScrollView>
        </View>

    )
}

export default Banner