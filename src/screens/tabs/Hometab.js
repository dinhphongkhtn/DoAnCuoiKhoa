import React, { memo, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getFavorite, getProduct, getProductByFeature } from '../../apis/productApi';
import { ContainerView, ProductItem, ProductItemThumb, UserThumb } from '../../components';
import { GET_PRODUCT, GET_PRODUCT_BYFEATURE } from '../../redux/actions';
import { GET_CATEGORY, GET_FAVORITES, SET_PRODUCT_KEYWORD } from '../../redux/actions/product';
import { getProductsSelector, getFeaturedProductsSelector, getFavoriteSelector } from '../../redux/selectors/productSelector';
import Products from '../Products/Products';
import { Ionicons } from "../../assets/index.js";
import { getAccessTokenSelector, getCurrentUserSelector } from '../../redux/selectors/loginSelector';
import { SET_ALL_ORDERS } from '../../redux/actions/order';
const Hometab = ({ navigation }) => {

    const dispatch = useDispatch();
    const featuredProducts = useSelector(getFeaturedProductsSelector);
    const userToken = useSelector(getAccessTokenSelector);
    const favorite = useSelector(getFavoriteSelector);
    const currentUser = useSelector(getCurrentUserSelector);
    const [keyWord, setkeyWord] = useState('')

    // , dispatch({type:SET_PRODUCT_KEYWORD, payload:text})
    useEffect(() => {
        getFavorite(userToken)
            .then(res => {
                // console.log(res.data.content);
                dispatch({ type: GET_FAVORITES, payload: res.data.content.productsFavorite })
            })
            .catch(error => { console.log(error); })

        getProductByFeature('1')
            .then((res) => {
                // console.log(res.data);
                // console.log(res.data);
                dispatch({ type: GET_PRODUCT_BYFEATURE, payload: res.data.content });
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

        getAllCategory()
            .then(res => {
                
                dispatch({ type: GET_CATEGORY, payload: res.data.content })
            })
            .catch(error => { console.log(error); })
      
    }, [])

    // console.log('HomeTab');
    //console.log(navigation);
    const renderProduct = ({ item, index }) => {
        return (
            <ProductItemThumb navigation={navigation} item={item}></ProductItemThumb>
        )
    }

    const renderSearchBar = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                paddingHorizontal: 5,
                height: 40
            }} onPress={() => { navigation.navigate('ProductSearching') }}>
                <TextInput style={{ color: 'gray', width: '90%' }}
                    value={keyWord}
                    onChangeText={text => { setkeyWord(text) }}
                    onFocus={()=>{  navigation.navigate('ProductSearching', { searchKeyWord: keyWord }) }}
                    placeholder='Search'
                ></TextInput>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ProductSearching', { searchKeyWord: keyWord })
                }}>
                    <Ionicons name='search' size={25} color='gray'></Ionicons>
                </TouchableOpacity>
            </View>

        )
    }

    // console.log(products);
    return (
        <ContainerView>
            <View style={styles.userContainer}>
                <UserThumb></UserThumb>
            </View>
            {renderSearchBar()}
            <View style={styles.productContainer}>
                <Text style={styles.textHeader}>Sneakers</Text>
                <Products horizontal={true} navigation={navigation}></Products>
            </View>
            <View style={styles.featuredContainer}>
                <Text style={styles.textHeader}>Featured</Text>
                <FlatList numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={featuredProducts}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.productContainerItemStyle}
                ></FlatList>
            </View>
        </ContainerView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#eeeeee',
        backgroundColor: '#f5f4f5',
        padding: 10
    },
    userContainer: {
        height: '15%',
        borderRadius: 10,
        marginBottom: 5
    },
    productContainer: {
        height: '40%',
        // backgroundColor:'white'
    },
    productContainerItemStyle: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    featuredContainer: {
        height: '35%'

    },
    textHeader: {
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 20
    },
    mainProductContainer: {

        marginTop: 10,

    },

})


export default memo(Hometab);