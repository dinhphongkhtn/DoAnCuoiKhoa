import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignupScreen, HomeScreen, ProductDetail } from '../screens';
import { getAccessToken } from '../Utils/storage';
import { getAccessTokenSelector } from '../redux/selectors/loginSelector';
import { useSelector, useDispatch } from 'react-redux';
import HomeNavigator from "./HomeNavigator";
import OrderDetail from '../screens/Orders/OrderDetail.js';
import ProductSearching from '../screens/Products/ProductSearching';
import Orders from '../screens/Orders';
import UserProfile from '../screens/UserScreens/userProfile';
import { getUserProfile } from '../apis/userLoginApi';
const Stack = createStackNavigator();

const RootNavigation = () => {

  const [isLogin, setIsLogin] = useState(false);
  const accessToken = useSelector(getAccessTokenSelector)
  const dispatch = useDispatch();

  useEffect(() => {

    const setAccessTokenToRedux = async () => {
      const accessTokenStorage = await getAccessToken();
      if (accessTokenStorage) {
        dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessTokenStorage });
      }
    }
    setAccessTokenToRedux();

  }, [])

  useEffect(() => {

    if (accessToken) {
      getUserProfile(accessToken)
        .then(res => {
          if (res.data.statusCode !== 200) {
            setIsLogin(false);
          }

        })
        .catch(error => { setIsLogin(false); })
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

  }, [accessToken])

  // console.log(isLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {
          isLogin ? (
            <>
              <Stack.Screen name="HomeScreen" component={HomeNavigator} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} />
              <Stack.Screen name="OrderDetail" component={OrderDetail} />
              <Stack.Screen name="OrderScreen" component={Orders} />
              <Stack.Screen name="ProductSearching" component={ProductSearching} />
              <Stack.Screen name="UserProfile" component={UserProfile} />
            </>
          ) :
            (
              <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />

              </>
            )

        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
