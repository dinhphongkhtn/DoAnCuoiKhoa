import React, { useRef ,useEffect} from 'react'
import { TextInput as RNTextInput, View, StyleSheet, Text, Animated, Keyboard } from 'react-native'

import { Ionicons, AntDesign, MaterialCommunityIcons } from "../assets/index.js";
const TextInput = props => {



    const { value, placeholder, secureTextEntry, onChangeText, label, icon, icontype } = props;
    const contentX = useRef(new Animated.Value(5)).current;
    const contentY = useRef(new Animated.Value(15)).current;

    const scaleY = contentX.interpolate(
        {
            inputRange: [0, 5],
            outputRange: [0.9, 1.1]
        })
    // const scaleY = 1;
    const onFocus = () => {
        
       

        Animated.parallel([

            Animated.timing(contentY, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(contentX, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }),

        ]).start();
    }
    const onBlur = () => {
        
        Keyboard.dismiss();
        if (value.length === 0) {
            Animated.parallel([
                Animated.timing(contentY, {
                    toValue: 15,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(contentX, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }),

            ]).start();
        }

    }
    const setIcon =()=>{
        switch(icontype)
        {
            case 'Ionicons': return <Ionicons name={icon} size={20}></Ionicons>;
            case 'AntDesign': return <AntDesign name={icon} size={20}></AntDesign>;
            case 'MaterialCommunityIcons': return <MaterialCommunityIcons name={icon} size={20}></MaterialCommunityIcons>;
        }
    }
useEffect(() => {
    if(value)
    {

    }else{
        onFocus();
    }
}, [])
    //console.log(props.style);

    return (
        <View style={styles.container}>
            <Animated.View style={
                [{
                    transform:
                        [
                            { translateY: contentY },
                            { translateX: contentX },

                            { scaleY: scaleY }
                        ],
                    direction: 'ltr',
                    position:'absolute'
                }]
            }>
                <Text
                    style={styles.textHint}>{label}</Text>
            </Animated.View>
            <View style={[styles.textInput, typeof (props.style) !== 'undefined' && props.style]}>

                <RNTextInput onFocus={onFocus} onBlur={onBlur}
                    style={{ width: '90%' ,marginTop:5}}
                    value={value}
                    // placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                />
                <View style={{ width: '10%' }}>
                  {setIcon()}
                   
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        borderRadius:18,
        elevation: 1,
        
    },
    textInput: {
        
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
    },
    textHint: {

        fontSize: 14,
        marginLeft:5,
        color:'gray',
        marginBottom:5

    },
})
export default TextInput;