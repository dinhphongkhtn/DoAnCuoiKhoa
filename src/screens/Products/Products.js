import React,{memo, useEffect} from 'react'
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../apis/productApi'
import { ProductItem } from '../../components';
import { GET_PRODUCT } from '../../redux/actions';
import { getKeywordSelector, getProductsSelector } from '../../redux/selectors/productSelector';

const Products = props => {

    const dispatch = useDispatch();
    const products = useSelector(getProductsSelector);
     const keyword = useSelector(getKeywordSelector);
     const {navigation,horizontal} = props;

     
    useEffect(() => {

        getProduct('')
            .then(res => {
                dispatch({ type: GET_PRODUCT, payload: res.data.content });
            })
            .catch(error => {

            })
    }, [])

    useEffect(() => {

        getProduct(keyword)
            .then(res => {
                    // console.log(res.data.content);
                dispatch({ type: GET_PRODUCT, payload: res.data.content });
            })
            .catch(error => {

            })
    }, [keyword])

    console.log(keyword);

    const renderProduct = ({ item, index }) => {
        // console.log(item);
        return (
            <ProductItem 
            style={{width:200}}
            navigation={navigation} isDetail productData={item}></ProductItem>
        )
    }
//console.log('Product');
    return (
        <FlatList horizontal={horizontal}
            data={products}
            showsHorizontalScrollIndicator={false}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
        ></FlatList>
    )
}

export default memo(Products);