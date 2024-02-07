import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar'
import ActionSheet from 'react-native-actions-sheet'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDimensionContext } from '../../context'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeTextInput from '../../Components/CustomeTextInput'
import CustomeDropDown from '../../Components/CustomeDropDown'
import CustomeButton from '../../Components/CustomeButton'
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import uploadImage from '../../Components/Common/Storages'

import { colors } from '../../Components/Common/color'
import { style } from './style'

const CreateProduct = () => {
    const dm = useDimensionContext()
    const styles = style(dm.windowWidth, dm.windowHeight, dm.isProtrait)
    const route = useRoute()
    const { type, data } = route.params
    const navigation = useNavigation()
    const isFouced = useIsFocused()
    const [category, setCategory] = useState([])
    const [orderStatus, setOrderStatus] = useState([])
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [cat, setCat] = useState('')
    const [qnt, setQnt] = useState('')
    const [price, setPrice] = useState('')
    const [uploadUri, setUploadUri] = useState(null)
    const [loading, setLoading] = useState(false)

    const actionSheetRef = useRef(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: type === 'create' ? 'Create Product' : 'Edit Product',
            headerLeft: () => <CustomeLeftIcon type={'back'} />,
        })
    }, [])

    useEffect(() => {
        if (isFouced) getCategory()
        setName(data?.name)
        setDesc(data?.desc)
        setQnt(data?.quantity)
        setPrice(data?.price)
        setUploadUri(data?.image)
        setCat(data?.categoryName)
    }, [isFouced])

    // Category API
    const getCategory = async () => {
        try {
            const snapshot = await firestore()
                .collection('Categories')
                .get()
            if (!snapshot.empty) {
                const res = snapshot.docs
                    .filter(doc => doc.exists)
                    .map(doc => ({ id: doc.id, ...doc?.data() }));
                setCategory(res)
                setOrderStatus(data.categoryName ? data.categoryName : res[0].name)
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    // handleCamera
    const handleCamera = async () => {
        const options = {
            mediaType: 'photo',
        };
        await launchCamera(options, response => {
            actionSheetRef.current?.hide();
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
                actionSheetRef.current?.hide()
                if (res && res?.assets) {
                    setUploadUri(res?.assets[0]?.uri)
                }
            });
        } catch (error) {
            console.log('ERROR ON GALLERY LOADING: ', error);
        }
    }


    const _categoryID = category.filter(doc => {
        const result = doc.name === cat
        return result
    })
    // handleCreateProduct
    const handleCreateProduct = async () => {
        setLoading(true)
        if (
            uploadUri
            && name !== '' && desc !== '' && category !== '' && qnt !== 0 && price !== ''
        ) {
            const responseUri = await uploadImage(uploadUri);
            const product = {
                created: Date.now(),
                updated: Date.now(),
                name: name,
                desc: desc,
                categoryID: _categoryID[0].id,
                categoryName: cat,
                quantity: qnt,
                price: price,
                image: responseUri,
            };
            await firestore()
                .collection('Products')
                .add(product)
                .then(() => {
                    Snackbar.show({
                        text: 'Product Added successfully',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.primary_green,
                        textColor: colors.white,
                        marginBottom: 50
                    });
                    navigation.goBack();
                    setLoading(false)
                });
        } else {
            Snackbar.show({
                text: 'Fill up all the fields to continue.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.danger,
                textColor: colors.white,
                marginBottom: 50
            });
            setLoading(false)
        }
    };

    // handleUpdateProduct
    const handleUpdateProduct = async () => {
        setLoading(true)
        if (
            uploadUri
            && name !== '' && desc !== '' && category !== '' && qnt !== '' && price !== ''
        ) {
            const responseUri = uploadUri.includes('file://') ? await uploadImage(uploadUri) : uploadUri
            const product = {
                updated: Date.now(),
                name: name,
                desc: desc,
                categoryID: _categoryID[0].id,
                categoryName: cat,
                quantity: qnt,
                price: price,
                image: responseUri,
            };
            await firestore()
                .collection('Products')
                .doc(data.id)
                .update(product)
                .then(() => {
                    Snackbar.show({
                        text: 'Product Added successfully',
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: colors.primary_green,
                        textColor: colors.white,
                        marginBottom: 50
                    });
                    navigation.goBack();
                    setLoading(false)
                });

        } else {
            Snackbar.show({
                text: 'Fill up all the fields to continue.',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: colors.danger,
                textColor: colors.white,
                marginBottom: 50
            });
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            {/* Model */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}>
                <View style={styles.centeredView}>
                    <ActivityIndicator size={75} color={colors.primary_green} />
                </View>
            </Modal>

            {/* Action Sheet */}
            <ActionSheet ref={actionSheetRef}>
                <View style={styles.actionSheetView}>
                    <View style={styles.actionHeadView}>
                        <Text style={styles.actionHead}>Upload Product Image..</Text>
                        <TouchableOpacity
                            onPress={() => actionSheetRef.current.hide()}
                        >
                            <EvilIcons name={'close-o'} size={35} color={colors.black_level_2} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionView}>
                        <TouchableOpacity
                            style={styles.touchView}
                            onPress={() => handleCamera()}
                        >
                            <Ionicons name={'camera'} size={50} color={colors.primary_green} />
                            <Text style={styles.uploadText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchView}
                            onPress={() => handleGallery()}
                        >
                            <Ionicons name={'image'} size={50} color={colors.primary_green} />
                            <Text style={styles.uploadText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ActionSheet>

            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <CustomeTextInput
                    width={'100%'}
                    placeholder={'Product Name'}
                    value={name}
                    border={true}
                    onChangeText={(text) => setName(text)}
                />
                <CustomeTextInput
                    width={'100%'}
                    placeholder={'Product Descrption...'}
                    border={true}
                    multiline={true}
                    value={desc}
                    onChangeText={(text) => setDesc(text)}
                />
                {category.length > 0 ?
                    <CustomeDropDown data={category} setData={obj => { setCat(obj) }} preData={orderStatus} />
                    : null}
                <CustomeTextInput
                    width={'100%'}
                    placeholder={'Product Quantity'}
                    border={true}
                    type={'numeric'}
                    value={`${qnt}`}
                    onChangeText={(text) => setQnt(text)}
                />
                <CustomeTextInput
                    width={'100%'}
                    placeholder={'Product Price'}
                    border={true}
                    value={price}
                    type={'numeric'}
                    onChangeText={(text) => setPrice(text)}
                />

                <TouchableOpacity
                    onPress={() => uploadUri ? {} : actionSheetRef.current.show()}
                    style={styles.productImageView}>
                    <Text style={styles.uploadText}>Upload product image</Text>
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

                </TouchableOpacity>

            </ScrollView>
            <CustomeButton
                width={'100%'}
                text={type === 'create' ? 'Add Product' : 'Update Product'}
                onPress={type === 'create' ? handleCreateProduct : handleUpdateProduct}
            />
        </View>
    )
}

export default CreateProduct