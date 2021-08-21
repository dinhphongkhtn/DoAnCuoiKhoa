import React, { memo, useEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../apis/userLoginApi.js';
import globalStyle from '../assets/theme/light.js';
import { GET_USER_PROFILE } from '../redux/actions/login.js';
import { getAccessTokenSelector, getCurrentUserSelector } from "../redux/selectors/loginSelector.js";
const UserThumb = () => {

    const userToken = useSelector(getAccessTokenSelector);
    const currentUser = useSelector(getCurrentUserSelector);
    const dispatch = useDispatch();

    const getUserDetail = () => {

        getUserProfile(userToken)
            .then((res) => {
                console.log(res.data.content);
                dispatch({ type: GET_USER_PROFILE, payload: res.data.content })
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getUserProfile(userToken)
        .then((res) => {
            console.log(res.data.content);
            dispatch({ type: GET_USER_PROFILE, payload: res.data.content })
            
        })
        .catch(error => {
            console.log(error);
        })
    }, [])
    useEffect(() => {

        getUserDetail();
    }, [userToken])

    return (
        <View style={styles.container}>
            {
                currentUser !== null &&

                <View style={[styles.avatarContainer, { flexDirection: 'row' }]}>

                    <Image
                        source={{ uri: currentUser.avatar }}
                        style={styles.imgAvatar}></Image>
                    <View style={{ paddingLeft: 10, width: '90%' }}>
                        <Text style={styles.textInfor}>{currentUser.name}</Text>
                        <Text style={[styles.textInfor, { fontSize: 12, color: 'gray' }]}>{currentUser.email}</Text>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        
        // alignItems:'center'
    },
    avatarContainer: {
        padding: 3,
        backgroundColor:'white'
    },
    imgAvatar: {
        width: 80,
        height: 80,
        borderWidth: 5,
        borderColor: globalStyle.primaryColor.color,
        borderRadius: 100
    },

    textInfor: {
        color: globalStyle.textSecondColor.color,
        fontSize: 25,
        fontWeight:'bold'
    }

})


export default memo(UserThumb);