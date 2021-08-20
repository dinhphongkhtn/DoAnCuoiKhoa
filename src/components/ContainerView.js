import React, { memo } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import globalStyle from "../assets/theme/index.js";
const ContainerView = props => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, props.style]}>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss(); console.log('dismiss');}}>
                <>
                    {
                        props.children
                    }
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalStyle.primaryColor.color,
        paddingHorizontal: 10
    }
})


export default memo(ContainerView);