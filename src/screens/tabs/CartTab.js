import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { ContainerView, ProductItemThumb } from '../../components';
import { Ionicons, AntDesign } from "../../assets/index.js";
import globalStyle from '../../assets/theme';
import { getAmountSelector, getCartItemsSelector } from '../../redux/selectors/cartSelector';
import { DECREASE_QUANTITY, INCREASE_QUANTITY } from '../../redux/actions/cart';
import { CREATE_ORDER } from '../../redux/actions/order';
const HEADER_STRING = 'CART'
const CartTab = ({ navigation }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItemsSelector);
    const amount = useSelector(getAmountSelector);

    const [cartItemsData, setcartItemsData] = useState([])

    useEffect(() => {

    }, []);

    useEffect(() => {

        setcartItemsData(cartItems);

    }, [cartItems])

    const increaseQuantity = (proId) => {

        dispatch({ type: INCREASE_QUANTITY, payload: proId })
    }
    const decreaseQuantity = (proId) => {

        dispatch({ type: DECREASE_QUANTITY, payload: proId })
    }

const order =()=>{

    const orders = cartItems.map((item)=>{return {id: item.id, quantity:item.quantity, amount:item.amount, data:item}})
    // console.log(orders);
    dispatch({type:CREATE_ORDER,payload:{orders, amount} });

    navigation.navigate('OrderDetail',{orders: orders});
}

    const renderFavoriteItem = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                <ProductItemThumb navigation={navigation}
                    backgroundColor='white' aspectRatio={2}
                    color={globalStyle.textSecondColor.color}
                    itemWidth='100%' item={item}>
                </ProductItemThumb>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity onPress={() => { decreaseQuantity(item.id) }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <AntDesign name='minuscircleo' size={30} color={globalStyle.secondColor.color}></AntDesign>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 60, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.quantity}</Text></View>
                        <TouchableOpacity onPress={() => { increaseQuantity(item.id) }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <AntDesign name='pluscircleo' size={30} color={globalStyle.secondColor.color}></AntDesign>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{
                            color: globalStyle.textSecondColor.color,
                            marginLeft: 10,
                            fontSize: 20, fontWeight: 'bold'
                        }}>$<Text>{item.amount}</Text></Text>
                    </View>
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
                        cartItemsData.count === 0 ?
                            <Text>You dont have liked any product</Text>
                            :
                            <View style={{ height: '100%' }}>
                                <FlatList data={cartItemsData}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={renderFavoriteItem}
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

                                }} onPress={()=>{order();}}>
                                    <View>
                                        <Text style={{ color: globalStyle.textColor.color, fontSize: 14 }}>Order</Text>
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


export default CartTab;