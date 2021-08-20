import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,

  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { getUserProfile, userLogin } from '../../apis/userLoginApi';
import { setAccessToken, getAccessToken } from "../../Utils/storage";
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from "../../components/index";
import { AntDesign } from "../../assets/index.js";
import { GET_USER_PROFILE, SET_ACCESS_TOKEN } from '../../redux/actions';
import { SET_ALL_ORDERS } from '../../redux/actions/order';
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password không được bỏ trống'),
});

const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch();


  const handleSubmitFormik = values => {
    userLogin(values)
      .then(res => {
        // console.log(res);
        if (res.data.statusCode === 200) {
          // console.log('handleSubmitFormik', res.data.content.accessToken);
          setAccessToken(res.data.content.accessToken);
          dispatch({ type: SET_ACCESS_TOKEN, payload: res.data.content.accessToken });
         

          getUserProfile(userToken)
            .then((res) => {
                console.log(res.data.content.ordersHistory);
                dispatch({ type: GET_USER_PROFILE, payload: res.data.content })
                dispatch({ type: SET_ALL_ORDERS, payload:res.data.content.ordersHistory})
            })
            .catch(error => {
                console.log(error);
            })

        }
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <LinearGradient colors={['#177899', '#14829b', '#2193b0', '#6dd5ed']} di style={{ flex: 1 }}>
            <View style={{ flex: 1.3, alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name='dingding' color='white' size={100}></AntDesign>
            </View>
            <View style={styles.loginForm}>
              <Text style={styles.textHeader}>WELCOME BRO!</Text>
              <Text style={styles.textHint}>Sign into your account!</Text>
              <View style={{ height: 10 }}></View>
              <Formik
                validationSchema={loginSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmitFormik}>
                {({ values, handleSubmit, handleChange, errors }) => (
                  <>
                    <View style={styles.inputContainer}>
                      {/* <Text>Email</Text> */}
                      <TextInput label='Email' icon='user' icontype='AntDesign'
                        style={[errors.email && styles.inputError]}
                        onChangeText={handleChange('email')}
                        placeholder="example@email.co"
                        value={values.email}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      {/* <Text>Password</Text> */}
                      <TextInput label='Password' icon='form-textbox-password' icontype='MaterialCommunityIcons'
                        style={[
                          errors.password && styles.inputError,
                        ]}
                        placeholder="******"
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        value={values.password}
                      />

                    </View>
                    <LinearGradient style={styles.signInButton}
                      start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                      colors={['#177899', '#14829b', '#2193b0']}>
                      <TouchableOpacity

                        onPress={handleSubmit}>
                        <Text style={{ color: 'white', fontSize: 16 }}>SIGN IN</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    
                  </>
                )}
              </Formik>
              {/* <TouchableOpacity
                  onPress={async () => {
                    await getAccessToken();
                  }}>
                  <Text>Get accessToken</Text>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity 
            onPress={()=>{navigation.navigate('SignupScreen')}}
            style={{ flex: 1.5, justifyContent:'center', alignItems:'center' }}>
              <Text style={{fontWeight:'bold', color:'white'}}>Don't have an account? <Text style={{fontWeight:'bold', fontSize:16,color:'black'}}>Create?</Text></Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
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

export default LoginScreen;
