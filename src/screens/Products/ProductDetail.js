import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { getFavorite, getProductById, likeProductApi, unlikeProductApi } from '../../apis/productApi';
import { ContainerView, ProductItemThumb } from '../../components';
import { Ionicons } from "../../assets/index.js";
import { getAccessTokenSelector } from '../../redux/selectors/loginSelector';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoriteSelector } from '../../redux/selectors/productSelector';
import { GET_FAVORITES, LIKE_PRODUCT, UNLIKE_PRODUCT } from '../../redux/actions/product';
import globalStyle from '../../assets/theme';
import RelativeProductItem from '../../components/relativeProductItem';
import { likeProductUtil, unlikeProductUtil } from '../../Utils/productUtils';
import { getCartItemsSelector } from '../../redux/selectors/cartSelector';
import { PUSH_ITEM_TO_CART } from '../../redux/actions/cart';
const ProductDetail = ({ route, navigation }) => {

    const { productId } = route.params;
    const [currentProduct, setcurrentProduct] = useState(null)
    const [selectedSize, setselectedSize] = useState(0)
    const userToken = useSelector(getAccessTokenSelector)
    const [liked, setliked] = useState(false)
    const [inOrder, setInOrder] = useState(false)
    const favorites = useSelector(getFavoriteSelector);
    const cartItems = useSelector(getCartItemsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        getFavorite(userToken)
            .then(res => {
                // console.log(res.data.content);
                dispatch({ type: GET_FAVORITES, payload: res.data.content.productsFavorite })
            })
            .catch(error => { console.log("getFavorite" + error); })

        getProductById(productId)
            .then(res => {
                //console.log(res.data);
                setcurrentProduct(res.data.content);
                setselectedSize(res.data.content.size[0]);

                const isLikedProduct = favorites.find(a => a.id === productId);
                if (isLikedProduct !== undefined) {
                    setliked(true);
                }
                // console.log(isLikedProduct);
            })
            .catch(error => { console.log(error); })

    }, [])
    useEffect(() => {
        const itemIndex = cartItems.findIndex(a=>a.id ===productId);
        console.log('cart change',itemIndex);
        if(itemIndex > 0)
        {
            setInOrder(true);
        }else{
            setInOrder(false)
        }
    }, [cartItems])

    const renderProductSize = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                width: 50, height: 30,
                borderRadius: 4,
                backgroundColor: item === selectedSize ? globalStyle.secondColor.color : 'white',
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',

            }}
                onPress={() => {
                    setselectedSize(item)
                }}
            >
                <Text style={{
                    color: item === selectedSize ? 'white' : 'gray',
                }}> {item}</Text>
            </TouchableOpacity>
        )
    }
    const likeProduct = () => {

        likeProductUtil(productId)
            .then(res => {
                // console.log(res.data.statusCode);
                if (res.data.statusCode === 200) {
                    setliked(true);
                    dispatch({ type: LIKE_PRODUCT, payload: currentProduct })
                }
            })
            .catch(error => { })

    }

    const unlikeProduct = () => {

        unlikeProductUtil(productId)
            .then(res => {
                // console.log(res.data.statusCode);
                if (res.data.statusCode === 200) {
                    setliked(false);
                    dispatch({ type: UNLIKE_PRODUCT, payload: currentProduct.id })
                }
            })
            .catch(error => { })

    }

const pushToCart = ()=>{
    dispatch({type:PUSH_ITEM_TO_CART, payload:currentProduct});

}

    const renderRelativeProductItem = ({ item, dindex }) => {
        return (
            <View style={{
                justifyContent: 'center',
                height: 70, backgroundColor: globalStyle.secondColor.color,
                padding: 5, marginRight: 10,
                borderRadius: 8
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ width: 40, height: 40, borderColor: globalStyle.textColor.color, borderRightWidth: 2, margin: 2 }}
                        source={{ uri: item.image }}></Image>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={[styles.textProductName, { fontSize: 16, color: globalStyle.textColor.color }]}>{currentProduct.name}</Text>
                        <Text style={[styles.textProductName, { fontSize: 14, color: globalStyle.textColor.color }]}>$ <Text >{item.price}</Text></Text>
                    </View>
                </View>
            </View>
        )
    }
    return (

        <View style={styles.container}>
            <View style={styles.commandContainer}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back-sharp' size={40}></Ionicons>
                </TouchableOpacity>

            </View>
            {
                currentProduct !== null ?
                    <>
                        <ContainerView style={styles.productImgContainer}>
                            <ScrollView style={{flex:1}}>
                                <View style={{ flex:1 ,justifyContent:'center', alignItems:'center'}}>
                                    <Image  style={styles.productImage} source={{ uri: currentProduct.image }}></Image>
                                </View>
                                <View style={{ marginVertical: 5 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>Size</Text>
                                    <FlatList horizontal={true} 
                                    showsHorizontalScrollIndicator={false}
                                        data={currentProduct.size}
                                        renderItem={renderProductSize}
                                        keyExtractor={item => item}
                                    />
                                </View>

                                <View style={[styles.productDetailContainer,{flex:2}]}>
                                    <Text style={styles.textProductName}>{currentProduct.name}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.textProductName, { fontSize: 28 }]}>$<Text >{currentProduct.price}</Text></Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <TouchableOpacity style={styles.commandButton}
                                                onPress={
                                                    liked ?
                                                        unlikeProduct
                                                        :
                                                        likeProduct
                                                }
                                            >
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Ionicons name={liked ? 'heart' : 'heart-outline'} size={25} color='white'></Ionicons>
                                                    
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.commandButton}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <TouchableOpacity onPress={pushToCart}>
                                                        <Ionicons name={inOrder ? 'cart' : 'cart-outline'} size={25} color='white'></Ionicons>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Text style={styles.textDes}>{currentProduct.shortDescription}</Text>
                                    <Text style={styles.textDes}>{currentProduct.description} </Text>
                                    <Text style={[styles.textProductName, { fontSize: 18 }]}>Relatives</Text>
                                    <FlatList horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                        data={currentProduct.relatedProducts}
                                        renderItem={renderRelativeProductItem}
                                        keyExtractor={item => item.id}
                                    ></FlatList>
                                </View>

                            </ScrollView>
                        </ContainerView>
                    </>
                    :
                    <Text>Product not found</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    commandContainer: {
        height: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    productImgContainer: {
        // height: '45%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    productDetailContainer: {

        backgroundColor: 'white',
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
        padding: 5
    },
    productImage: {
        width: 150,
        height:150,
        aspectRatio:2

    },
    textProductName: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    textDes: {
        fontSize: 12,
        color: 'gray'
    },
    commandButton: {
        backgroundColor: globalStyle.secondColor.color,

        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginHorizontal: 3
    }
})

export default ProductDetail;