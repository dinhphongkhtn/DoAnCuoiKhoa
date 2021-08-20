import React from 'react';
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
import { userSignUp } from '../../apis/userLoginApi';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from "../../components/index.js";
import { AntDesign } from "../../assets/index.js";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password không được bỏ trống'),
  name: Yup.string().required('Tên không được bỏ trống'),
});

const SignupScreen = ({navigation}) => {
  const handleSubmitFormik = values => {
    const data = { ...values, gender: true, phone: '0982167222' };
    userSignUp(data)
      .then(res => navigation.goBack())
      .catch(err => console.log(err));
  };

  return (


    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <LinearGradient colors={['#177899', '#14829b', '#2193b0', '#6dd5ed']} style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{backgroundColor:'white', marginHorizontal:20, padding:10, borderRadius:10}}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name='dingding' color='#177899' size={100}></AntDesign>
            </View>
            <Formik
              validationSchema={loginSchema}
              initialValues={{ email: '', password: '', name: '' }}
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
                    <TextInput label='Password'
                      style={[
                        styles.inputField,
                        errors.password && styles.inputError,
                      ]}
                      placeholder="******"
                      secureTextEntry={true}
                      onChangeText={handleChange('password')}
                      value={values.password}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
               
                  <LinearGradient style={styles.signInButton}
                      start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                      colors={['#177899', '#14829b', '#2193b0']}>
                      <TouchableOpacity

                        onPress={handleSubmit}>
                        <Text style={{ color: 'white', fontSize: 16 }}>SIGN UP</Text>
                      </TouchableOpacity>
                    </LinearGradient>
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

export default SignupScreen;
