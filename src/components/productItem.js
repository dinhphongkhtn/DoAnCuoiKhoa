import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { useSelector } from 'react-redux';
import { Ionicons } from "../assets/index";
import globalStyle from '../assets/theme';
import { getCartItemsSelector } from '../redux/selectors/cartSelector';
import { getFavoriteByIdSelector, getFavoriteSelector } from '../redux/selectors/productSelector';

const ProductItem = props => {

    const { productData, isDetail, navigation,itemWidth ,style} = props;
    const favorites = useSelector(getFavoriteSelector);
    const cartItems = useSelector(getCartItemsSelector);
    const [liked, setliked] = useState(false)
    const [inOrder, setInOrder] = useState(false)
    useEffect(() => {
        const liked = favorites.find(a => a.id === productData.id);
        if (liked !== undefined) {
            setliked(true);
        }else{
            setliked(false)
        }
    }, [favorites])
    // console.log(props);
    useEffect(() => {
        const liked = cartItems.find(a => a.id === productData.id);
        if (liked !== undefined) {
            setInOrder(true);
        }else{
            setInOrder(false)
        }
    }, [cartItems])
    const renderasDetailItem = () => {
        return (
            <View style={[styles.container,style]}>
                <View style={{ flex: 1 }}>

                    <Text style={styles.textPrice}>{productData.name}</Text>
                    <Text style={styles.textPrice}>$ <Text >{productData.price}</Text></Text>

                </View>
                <View style={{ flex: 1.5 }}>
                    <Image
                        style={styles.proImg}
                        source={{ uri: productData.image }}></Image>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Ionicons color={globalStyle.textColor.color} name={liked ? 'heart' : 'heart-outline'} size={25}></Ionicons>
                    <Ionicons color={globalStyle.textColor.color} name={inOrder ? 'cart' : 'cart-outline'} size={25}></Ionicons>
                </View>
            </View>
        )
    }
    const renderasThumbItem = () => {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.proImg}
                    source={{ uri: productData.image }}></Image>
                <Text style={styles.textPrice}>$ <Text >{productData.price}</Text></Text>
            </View>
        )
    }


    return (
        <TouchableWithoutFeedback onPress={() => { navigation.navigate('ProductDetail', { productId: productData.id }) }}>
            {
                isDetail ? renderasDetailItem() : renderasThumbItem()
            }
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.secondColor.color,
        borderRadius: 8,
        marginRight: 20,
        elevation: 1,
        padding: 10,
        width: 160,
        height: 200,

    },
    proImg: {
        width: 130,
        height: 120,
        transform: [{ rotate: '-15deg' }],
        position: 'absolute',
    },
    textPrice: {
        fontWeight: 'bold',
        color: globalStyle.textColor.color,
        fontSize: 18
    }
})

export default ProductItem;