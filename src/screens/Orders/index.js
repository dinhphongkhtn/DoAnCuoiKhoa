import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ContainerView, ProductItemThumb } from '../../components';
import { Ionicons, AntDesign } from "../../assets/index.js";
import globalStyle from '../../assets/theme';
import { getAmountSelector, getCartItemsSelector } from '../../redux/selectors/cartSelector';
import { getOrdersSelector, getOrderAmountSelector, getAllOrdersSelector } from '../../redux/selectors/orderSelector';
import { orderApi } from "../../apis/orderApi.js";
import { inOut } from 'react-native/Libraries/Animated/Easing';
import { getAccessTokenSelector, getCurrentUserSelector } from '../../redux/selectors/loginSelector';
import { getUserProfile } from '../../apis/userLoginApi';
import { SET_ALL_ORDERS } from '../../redux/actions/order';
const HEADER_STRING = 'Orders'
const Orders = ({ navigation }) => {

    const dispatch = useDispatch();
    const orders = useSelector(getAllOrdersSelector);
    const userToken = useSelector(getAccessTokenSelector);
    const [ordersData, setordersData] = useState([])

    const compare = (a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        // console.log(userToken);
        getUserProfile(userToken)
            .then((res) => {
                // console.log(res.data.content.ordersHistory);
                dispatch({ type: SET_ALL_ORDERS, payload: res.data.content.ordersHistory })
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (orders.length !== 0) {
            // console.log(orders);
            // points.sort(function(a, b){return b-a});
            orders.sort(compare);
            setordersData(orders);
        }
    }, [orders])


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (item.status === '1')
                        navigation.navigate('OrderDetail', { orders: item.orderDetail })
                }}
                style={{
                    backgroundColor: 'white', marginBottom: 10,
                    padding: 3,
                    borderRadius: 8,
                    height: 50

                }}>
                <Text>Id: <Text style={{ fontWeight: 'bold' }}>{item.id}</Text></Text>
                <Text>Date: <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.date}</Text></Text>

            </TouchableOpacity>
        )
    }
    return (
        <View>

            <View style={styles.commandContainer}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back-sharp' size={40}></Ionicons>
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text style={styles.textHeader}>{HEADER_STRING}</Text>
                </View>
            </View>
            <View style={{ height: '90%' }}>
                <ContainerView >
                    {
                        ordersData.count === 0 ?
                            <Text>You dont have liked any product</Text>
                            :
                            <View style={{ height: '100%' }}>
                                <FlatList data={ordersData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.date}
                                    contentContainerStyle={styles.itemContainerStyle}
                                ></FlatList>

                            </View>
                    }
                </ContainerView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    commandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '5%',
        marginVertical: 10
    },
    headerContainer: {

        width: '90%',
        alignItems: 'center'
    },
    textHeader: {

        fontWeight: 'bold',
        fontSize: 20
    },
    itemContainerStyle: {
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center'
    }
})


export default Orders;