import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { removeAccessToken } from '../../Utils/storage'

export default function HomeScreen() {
    return (
        <View>
            <Text> textInComponent </Text>
            <TouchableOpacity onPress={() => {
                removeAccessToken().then(res => {
                    
                })
            }}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

})
