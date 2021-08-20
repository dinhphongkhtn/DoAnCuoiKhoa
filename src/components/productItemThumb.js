import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import globalStyle from '../assets/theme';

const ProductItemThumb = props => {
    const { item, aspectRatio, itemWidth, style, backgroundColor, color,navigation } = props;

    return (
        <View style={[{
            justifyContent: 'center',
            height: 70, backgroundColor: backgroundColor === undefined ? globalStyle.secondColor.color : backgroundColor,
            padding: 5, marginRight: 10, marginBottom: 5,
            borderRadius: 8, width: itemWidth === undefined ? '48%' : itemWidth,
            elevation: 1,
        }, style]}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{
                            width: 40, height: 40, aspectRatio: aspectRatio === undefined ? 1 : aspectRatio,
                            borderColor: globalStyle.textColor.color, borderRightWidth: 2, margin: 2
                        }}
                        source={{ uri: item.image }}></Image>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={[styles.textProductName, { fontSize: 16, color: color === undefined ? globalStyle.textColor.color : color }]}>{item.name}</Text>
                        {/* <Text style={[styles.textProductName, { fontSize: 14, color: color===undefined ? globalStyle.textColor.color : color}]}>$ <Text >{item.price}</Text></Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginRight: 15,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,

        justifyContent: 'center',
        alignItems: 'center'
    },
    textPrice: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18
    }
})

export default ProductItemThumb;