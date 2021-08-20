import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "../assets/index.js";
import { HomeTab, PortfolioTab, CartTab } from "../screens/index";
import FavoriteTab from '../screens/tabs/FavoriteTab.js';
const Tab = createBottomTabNavigator();
const HomeNavigator = () => {

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
                iconName = focused
                    ? 'albums'
                    : 'albums-outline';
            } else if (route.name === 'PortfolioTab') {
                iconName = focused ? 'person' : 'person-outline';
            }
            else if (route.name === 'CartTab') {
                iconName = focused ? 'cart' : 'cart-outline';
            }
            else if(route.name === 'FavoriteTab')
            {
                iconName = focused ? 'heart' : 'heart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        }
    })

    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false
            }}
        >
            <Tab.Screen name="HomeTab" component={HomeTab} />
            <Tab.Screen name="FavoriteTab" component={FavoriteTab} />
            <Tab.Screen name="CartTab" component={CartTab} />
            <Tab.Screen name="PortfolioTab" component={PortfolioTab} />
        </Tab.Navigator>
    )
}
export default HomeNavigator;