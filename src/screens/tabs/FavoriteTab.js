import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getFavorite } from '../../apis/productApi';
import { ContainerView, ProductItemThumb } from '../../components';
import { getFavoriteSelector } from '../../redux/selectors/productSelector';
import { Ionicons } from "../../assets/index.js";
import globalStyle from '../../assets/theme';
import { unlikeProductUtil } from '../../Utils/productUtils';
import { UNLIKE_PRODUCT } from '../../redux/actions/product';

const FavoriteTab = ({navigation}) => {

    const dispatch = useDispatch();
    const favorites = useSelector(getFavoriteSelector);

    const [favoritesData, setfavoritesData] = useState([])

    useEffect(() => {
        console.log('FavoriteTab');
        getFavorite()
            .then(res => {
                dispatch({ type: GET_FAVORITES, payload: res.data.content });
                setfavoritesData(favorites);
            })
            .catch(error => { console.log("getFavorite" + error); })
    }, []);

    useEffect(() => {

        console.log(favorites);
        setfavoritesData(favorites);
       
    }, [favorites])

    const unlikeProduct = (productId) => {

        unlikeProductUtil(productId)
            .then(res => {
              
                // console.log(res.data.statusCode);
                if (res.data.statusCode === 200) {
                    console.log(res.data);
                    dispatch({ type: UNLIKE_PRODUCT, payload: productId})
                }
            })
            .catch(error => { })

    }

    const renderFavoriteItem = ({ item, index }) => {
        return (
            <View style={{ backgroundColor: 'white', marginBottom: 10 }}>
                <ProductItemThumb navigation={navigation}
                    backgroundColor='white' aspectRatio={2}
                    color={globalStyle.textSecondColor.color}
                    itemWidth='100%' item={item}>
                </ProductItemThumb>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{unlikeProduct(item.id)}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Ionicons name='heart' size={30} color={globalStyle.secondColor.color}></Ionicons>
                            <Text style={{ marginLeft: 5, color: 'white', fontSize: 14 }}>Like</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Ionicons name='cart' size={30} color={globalStyle.secondColor.color}></Ionicons>
                            <Text style={{ marginLeft: 5, color: 'white', fontSize: 14 }}>Add to cart</Text>
                        </View>
                    </TouchableOpacity>
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
                    <Text style={styles.textHeader}>My Favorites</Text>
                </View>
            </View>
            <View style={{ height: '90%' }}>
                <ContainerView >
                    {
                        favorites.count === 0 ?
                            <Text>You dont have liked any product</Text>
                            :
                            <FlatList data={favoritesData}
                            showsVerticalScrollIndicator={false}
                                renderItem={renderFavoriteItem}
                                keyExtractor={item => item.id}
                                contentContainerStyle={styles.itemContainerStyle}
                            ></FlatList>
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


export default FavoriteTab;