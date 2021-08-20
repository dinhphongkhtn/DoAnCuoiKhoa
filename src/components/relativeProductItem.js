import React from 'react'
import {StyleSheet,View,Text, Image  } from "react-native";
import globalStyle from '../assets/theme';
 const RelativeProductItem = props => {

    const {productData} = props;
    return (
      <View style={styles.container}>
           <Text style={styles.textProductName}>{productData.name}</Text>
          <View style={styles.imgContainer}>
                <Image style={styles.productImage}
                source={{uri:productData.image}}
                ></Image>
                  <View style={styles.detailContainer}>
             
             <Text style={styles.textDes}>{productData.shortDescription}</Text>
         </View>
          </View>
        
      </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:globalStyle.secondColor.color,
        borderRadius:10,
        
        width:'50%',
        padding:5,
        height:80
    } ,
     imgContainer:{
       justifyContent:'center',
       flexDirection:'row'
         
     },
     detailContainer:{
         justifyContent:'center'
     },
     productImage:{
        height: 80,
        width:80
     },
     textProductName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textDes: {
        fontSize: 12,
        color: 'gray'
    },
})
export default RelativeProductItem;