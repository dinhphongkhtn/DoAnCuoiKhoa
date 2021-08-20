import React from 'react'
import { StyleSheet, Text as RNText, View } from "react-native";
import { AntDesign,Ionicons,EvilIcons,MaterialIcons,MaterialCommunityIcons } from "../assets/index";
import globalStyle from '../assets/theme';
const Text = props => {

    const {label, value} = props;
    return (
        <View style={styles.container}>
           
            <View style={styles.valueContainer}>
                <RNText style={styles.textHint}>{label}</RNText>
                <RNText style={styles.textInput}>{value}</RNText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    iconContainer: {
        width: '30%'
    },
    valueContainer: {
        width: '100%',
        
        marginBottom:5
    },
    textInput: {
        
        fontSize:18,
        color:globalStyle.textSecondColor.color,
        // backgroundColor:'green'
    },
    textHint: {

        fontSize: 12,
        color:'gray',
        marginBottom:5,
        // backgroundColor:'red'
    },
})


export default Text;