import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ContainerView, ProductItemThumb } from '../../components';
import { Ionicons, AntDesign } from "../../assets/index.js";
import globalStyle from '../../assets/theme';
import { getAmountSelector, getCartItemsSelector } from '../../redux/selectors/cartSelector';
import { getOrdersSelector, getOrderAmountSelector } from '../../redux/selectors/orderSelector';
import { orderApi } from "../../apis/orderApi.js";
import { inOut } from 'react-native/Libraries/Animated/Easing';
import { getCurrentUserSelector } from '../../redux/selectors/loginSelector';
import { CLEAR_ALL_ITEMS } from '../../redux/actions/cart';
const HEADER_STRING = 'Order detail'
const OrderDetail = ({ route, navigation }) => {

    const dispatch = useDispatch();
    // const orders = useSelector(getOrdersSelector);
    const amount = useSelector(getOrderAmountSelector);
    const { orders } = route.params;
    const [ordersData, setordersData] = useState([])
    const currentUser = useSelector(getCurrentUserSelector);
    useEffect(() => {
        // console.log(orders);
        //  console.log(orders);
        setordersData(orders);
    }, []);

    const pushOrder = () => {

        const pushedOrder = ordersData.map((item) => {
            return {
                productId: item.id,
                quantity: item.quantity
            }
        });
        // console.log(pushedOrder);
        orderApi({ orderDetail: pushedOrder, email: currentUser !== undefined ? currentUser.email : '' })
            .then(res => { 
                dispatch({type:CLEAR_ALL_ITEMS});
                

             })
            .catch(error => { console.log(error); })
    }


    const renderItem = ({ item, index }) => {
        console.log(item);
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 10, flexDirection: 'row' }}>
                <ProductItemThumb navigation={navigation}
                    backgroundColor='white' aspectRatio={2}
                    color={globalStyle.textSecondColor.color}
                    itemWidth='70%' item={item.data}>
                </ProductItemThumb>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12 }}>Quantity </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.data.quantity}</Text>
                        </View>
                    </View>
                    <Text style={{
                        color: globalStyle.textSecondColor.color,
                        marginLeft: 10,
                        fontSize: 20, fontWeight: 'bold'
                    }}>$<Text>{item.amount}</Text></Text>
                </View>

            </View>
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
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={styles.itemContainerStyle}
                                ></FlatList>
                                <TouchableOpacity style={{
                                    height: '10%',
                                    backgroundColor: globalStyle.secondColor.color,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: 10

                                }} onPress={() => { pushOrder() }}>
                                    <View>
                                        <Text style={{ color: globalStyle.textColor.color, fontSize: 14 }}>Pay</Text>
                                        <AntDesign name='creditcard' color='white' size={30}></AntDesign>
                                    </View>
                                    <View style={{ marginLeft: 10, }}>
                                        <Text style={{ color: globalStyle.textColor.color, fontSize: 18 }}>Amount</Text>
                                        <Text style={{
                                            color: globalStyle.textColor.color,
                                            fontSize: 25, fontWeight: 'bold',
                                            alignSelf: 'flex-end'
                                        }}>$ <Text>{amount}</Text></Text>
                                    </View>
                                </TouchableOpacity>
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


export default OrderDetail;