import React, { memo, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ContainerView, ProductItem, ProductItemThumb, UserThumb } from '../../components';
import { getProductsSelector, getFeaturedProductsSelector, getFavoriteSelector, getSearchingProductSelector, getAllCategoriesSelector } from '../../redux/selectors/productSelector';
import Products from '../Products/Products';
import { Ionicons } from "../../assets/index.js";
import { getAccessTokenSelector } from '../../redux/selectors/loginSelector';
import { getProduct, getProductByCategory } from '../../apis/productApi';
import { CHANGE_FILTER } from '../../redux/actions/product';
import globalStyle from '../../assets/theme';
const ProductSearching = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const [keyWord, setkeyWord] = useState('')
    const productsSelector = useSelector(getSearchingProductSelector);
    const [products, setProducts] = useState([])
    const { searchKeyWord } = route.params;
    const allCatesSelector = useSelector(getAllCategoriesSelector);

    const [allCates, setallCates] = useState([])
    const [selectedCates, setselectedCates] = useState([])
    useEffect(() => {
        // console.log(allCatesSelector);
        // setallCates(allCatesSelector);
        
    }, [allCatesSelector])

    useEffect(() => {
        // console.log(allCatesSelector);
        
        setallCates(allCatesSelector);
        setkeyWord(searchKeyWord);
        refreshProduct();
    }, []);
    const refreshProduct = () => {

        getProduct(keyWord)
            .then(res => {
                
                let tmpCates = [];
                if (selectedCates.length === 0) {
                    tmpCates = [...allCatesSelector];
                }
                else {
                    tmpCates = [...selectedCates];
                }

                let tmpResult = [];
                // console.log(res.data.content);
                for (let pro of res.data.content) {
                    // console.log(typeof(pro.categories));

                    const _cate = JSON.parse(pro.categories)
                    for (let cate of _cate) {
                        //  console.log(cate);
                        const currentCate = tmpResult.find(a => a.title === cate.id);
                        //  console.log(currentCate);
                        if (currentCate === undefined || currentCate === null) {
                            // console.log(cate);
                            const idx = tmpCates.findIndex(a => a.id === cate.id);
                            if (idx > -1)
                                tmpResult.push(
                                    {
                                        title: cate.id,
                                        data: [{ ...pro }]
                                    });
                            // console.log(tmpResult);
                        } else {
                            currentCate.data.push(pro);
                        }
                    }
                }

                setProducts(tmpResult);
            })
            .catch(error => { console.log(error); })
        // setProducts([]);
        // getProductByCate();
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
                 <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name='arrow-back-sharp' size={40}></Ionicons>
                </TouchableOpacity>

                <TextInput style={{ color: 'gray', width: '90%' }}
                    value={keyWord} autoFocus
                    onChangeText={text => { setkeyWord(text) }}
                    placeholder='Search'

                ></TextInput>
                <TouchableOpacity onPress={() => {
                    refreshProduct()
                }}>

                    <Ionicons name='search' size={25} color='gray'></Ionicons>
                </TouchableOpacity>
            </View>
        )
    }
    const getProductByCate = () => {

        let result = [];
        let tmpCate = [];
        if (selectedCates.length === 0) {
            tmpCate = [...allCates];
        }
        else {
            tmpCate = [...selectedCates];
        }

        for (const obj of selectedCates) {
            getProductByCategory(obj.id)
                .then(res => {
                    // console.log(res.data.content);
                    const tmpResult = {
                        title: obj.id,
                        data: [...res.data.content]
                    }
                    result.push(tmpResult);
                    // result = [...result]
                    setProducts([...result]);
                })
                .catch(error => { console.log(error); })

        }
        // console.log(result);
    }
    const renderProduct = ({ item, index }) => {
        // console.log(item);
        return (
            <ProductItem style={{ marginBottom: 10, width: '47%' }}
                navigation={navigation} isDetail productData={item}></ProductItem>
        )
    }



    const renderCateItem = ({ item, index }) => {


        const itemIndex = selectedCates.findIndex(a => a.id === item.id);
        if (itemIndex > -1) {
            item.isSelected = true;
        } else {
            item.isSelected = false;
        }
        // console.log(itemIndex);

        return (
            <TouchableOpacity style={{
                paddingHorizontal: 10,

                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: item.isSelected ? 'gray' : globalStyle.secondColor.color,
                marginRight: 5,

            }} onPress={() => {
                item.isSelected ? selectedCates.splice(itemIndex, 1) : selectedCates.push(item);

                setselectedCates([...selectedCates]);
            }}>
                <Text style={{ fontWeight: 'bold', }}>{item.category}</Text>
            </TouchableOpacity>
        )
    }
    const renderSectionHeader = ({ section }) => (
        <>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 5 }}>{section.title}</Text>
            <FlatList
                numColumns={2}
                data={section.data}
                renderItem={renderProduct}
                showsHorizontalScrollIndicator={false}
            />
        </>
    )
    // console.log(products);
    return (
        <ContainerView style={{ padding: 10 }}>

            {renderSearchBar()}
            <View style={styles.productContainer}>
                <FlatList data={allCates} horizontal={true}
                    style={{ height: 50, marginVertical: 5 }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderCateItem}></FlatList>
                {/* <Text style={styles.textHeader}>Sneakers</Text> */}
                {/* <FlatList data={products} numColumns={2} style={{ marginTop: 10, height: '90%' }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={renderProduct}></FlatList> */}

                <SectionList renderSectionHeader={renderSectionHeader}
                    sections={products} style={{ marginTop: 10, height: '90%' }}
                    keyExtractor={(item, index) => item + index}
                    renderItem={(item) => { return null }}

                />
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
        height: '90%',
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
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },

})


export default memo(ProductSearching);