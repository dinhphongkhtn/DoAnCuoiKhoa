import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,

    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { uploadUserProfile, userSignUp } from '../../apis/userLoginApi';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from "../../components/index.js";
import { AntDesign, Ionicons } from "../../assets/index.js";
import { useSelector, useDispatch } from 'react-redux';
import { getAccessTokenSelector, getCurrentUserSelector } from '../../redux/selectors/loginSelector';
import { SET_ACCESS_TOKEN } from '../../redux/actions';
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email không được bỏ trống')
        .email('Email không hợp lệ'),
    phone: Yup.string()
        .required('Phone number không được bỏ trống'),
    name: Yup.string().required('Tên không được bỏ trống'),
});

const UserProfile = ({ navigation }) => {
    const handleSubmitFormik = values => {
        values.gender = gender;
        const data = { ...values };
        console.log(data);
        uploadUserProfile(data, userToken)
            .then(res => {
                alert('Updated');
                dispatch({ type: SET_ACCESS_TOKEN, payload: '' })
            }
            )
            .catch(err => console.log(err));
    };
    const userToken = useSelector(getAccessTokenSelector);
    const currentUserSelector = useSelector(getCurrentUserSelector);
    const dispatch = useDispatch()
    const [gender, setGender] = useState(true)
    useEffect(() => {

    }, [currentUserSelector])
    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <LinearGradient colors={['#177899', '#14829b', '#2193b0', '#6dd5ed']} style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', marginHorizontal: 20, padding: 10, borderRadius: 10 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <AntDesign name='dingding' color='#177899' size={100}></AntDesign>
                        </View>
                        <Formik
                            validationSchema={loginSchema}
                            initialValues={{
                                email: currentUserSelector.email,
                                name: currentUserSelector.name,
                                gender: currentUserSelector.gender,
                                phone: currentUserSelector.phone
                            }}
                            onSubmit={handleSubmitFormik}>
                            {({ values, handleSubmit, handleChange, errors }) => (
                                <>
                                    <View style={styles.inputContainer}>
                                        <TextInput label='Name'
                                            style={[styles.inputField, errors.name && styles.inputError]}
                                            onChangeText={handleChange('name')}
                                            placeholder="username"
                                            value={values.name}
                                        />

                                        {errors.name && (
                                            <Text style={styles.errorText}>{errors.name}</Text>
                                        )}
                                    </View>
                                    <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                                        <TouchableOpacity
                                            onPress={() => { setGender(!gender) }}
                                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                                            {
                                                !gender && <AntDesign name='check' color='#177899' size={30}></AntDesign>
                                            }

                                            <Text>Male</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => { setGender(!gender) }}

                                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            {
                                                gender && <AntDesign name='check' color='#177899' size={30}></AntDesign>
                                            }
                                            <Text>Female</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput label='Email'
                                            style={[styles.inputField, errors.email && styles.inputError]}
                                            onChangeText={handleChange('email')}
                                            placeholder="example@email.co"
                                            value={values.email}
                                        />

                                        {errors.email && (
                                            <Text style={styles.errorText}>{errors.email}</Text>
                                        )}
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput label='Phone number'
                                            style={[styles.inputField, errors.phone && styles.inputError]}
                                            onChangeText={handleChange('phone')}
                                            placeholder="+84123123123"
                                            value={values.phone}
                                        />

                                        {errors.phone && (
                                            <Text style={styles.errorText}>{errors.phone}</Text>
                                        )}
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent:'center', }}>
                                        <LinearGradient style={[styles.signInButton,{marginRight:5}]}
                                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                            colors={['#177899', '#14829b', '#2193b0']}>
                                            <TouchableOpacity

                                                onPress={handleSubmit}>
                                                <Text style={{ color: 'white', fontSize: 16 }}>SAVE</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                        <LinearGradient style={styles.signInButton}
                                            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                            colors={['#177899', '#14829b', '#2193b0']}>
                                            <TouchableOpacity

                                                onPress={() => { navigation.goBack() }}>
                                                <Text style={{ color: 'white', fontSize: 16 }}>BACK</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>

                                </>
                            )}
                        </Formik>
                    </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginForm: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginVertical: 10,
        backgroundColor: 'white'
    },
    inputField: {
        borderWidth: 1,
        padding: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
    signInButton: {
        backgroundColor: '#bffefe',
        padding: 8,
        width: '30%',
        alignItems: 'center',
        marginHorizontal:5
    }, textHeader: {
        fontSize: 26,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#177899'
    },
    textHint: {
        color: '#177899',
        fontSize: 12,
        alignSelf: 'center'

    },
    loginForm: {
        flex: 1.5,
        // justifyContent: 'center',
        padding: 20,
        backgroundColor: '#eeeeee',
        marginHorizontal: 20,
        opacity: 1,
        borderRadius: 10
    },
    inputContainer: {
        marginVertical: 5,
    },
    inputField: {
        borderWidth: 0,
        padding: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
    signInButton: {

        padding: 8,
        width: '40%',
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 13,
        elevation: 3,
        marginTop: 10
    },
});

export default UserProfile;
