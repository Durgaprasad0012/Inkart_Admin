import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import CustomeLeftIcon from '../../Components/CustomeLeftIcon'
import CustomeSearchBox from '../../Components/CustomeSearchBox';
import { useDimensionContext } from '../../context'
import CustomeEmptyComponent from '../../Components/Common/CustomeEmptyComponent';
import { colors } from '../../Components/Common/color'
import { style } from './style'

const Users = () => {
    const dimensions = useDimensionContext()
    const styles = style(dimensions.windowWidth, dimensions.windowHeight, dimensions.isProtrait)
    const navigation = useNavigation()
    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState('')
    const isFocused = useIsFocused()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Users',
            headerStyle: {
                backgroundColor: colors.white_level_1,
                height: 60,
            },
            headerLeft: () => <CustomeLeftIcon type={'back'} />
        })
    }, [])

    useEffect(() => {
        if (isFocused) getUsers()
    }, [isFocused])

    // Get users API
    const getUsers = async () => {
        const snapshot = await firestore()
            .collection('Users')
            .where('username', '!=', 'Admin')
            .get()
        if (!snapshot.empty) {
            const res = snapshot.docs
                .filter(doc => doc.exists)
                .map(doc => ({ id: doc.id, ...doc?.data() }));
            setUsers(res)
        } else {
            setUsers([])
            Snackbar.show({
                text: "no result found...!",
                backgroundColor: colors.danger,
                duration: Snackbar.LENGTH_LONG,
                fontFamily: 'Lato-Italic',
                textColor: colors.white
            })
        }
    }
    // handleSearchText
    const handleSearchText = async text => {
        setSearchText(text)
        const snapshot = await firestore()
            .collection('Users')
            .orderBy('firstName')
            .startAt(text)
            .endAt(text + '\uf8ff')
            .get()
        if (!snapshot.empty) {
            const res = snapshot.docs
                .filter(doc => doc.exists)
                .map(doc => ({ id: doc.id, ...doc?.data() }));
            const result = res.filter(doc => doc.username !== 'Admin')
            setUsers(result)
        } else {
            setUsers([])
        }
    }
    // BlockUser
    const BlockUser = ({ data }) => {
        // handleBlockUser
        const handleBlockUser = async (item) => {
            try {
                await firestore()
                    .collection('Users')
                    .doc(item.id)
                    .update({
                        status: item?.status ? false : true
                    })
                    .then(() => getUsers())
            } catch (error) {
                console.log("ERROR : ", error);
            }
        }
        return (
            <TouchableOpacity
                onPress={() => handleBlockUser(data)}
                style={[styles.blockView, { backgroundColor: data?.status ? colors.danger : colors.primary }]}
            >
                {data?.status ?
                    <Text style={styles.blockText}>Block</Text>
                    :
                    <Text style={styles.blockText}>Unblock</Text>
                }
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <CustomeSearchBox
                placeholder={'Search here...'}
                onChangeText={text => handleSearchText(text)}
                value={searchText}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                {users.length > 0 ? users.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={styles.userBox}
                        >
                            {item.profileimage ? <Image source={{ uri: item.profileimage }} style={styles.profileImage} /> : <Image source={require('../../Assets/img/user_icon.png')} style={styles.profileImage} />}
                            <View style={styles.contentView}>
                                <Text style={styles.headText}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.emailText}>{item.email}</Text>
                                <Text style={styles.contactText}>{item.mobilenumber}</Text>
                            </View>
                            <BlockUser data={item} />
                        </View>
                    )
                }) :
                    <CustomeEmptyComponent />
                }
            </ScrollView>
        </View>
    )
}

export default Users