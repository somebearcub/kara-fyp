import React, {Component} from 'react';
import {createDrawerNavigator, createStackNavigator, DrawerItems} from "react-navigation";
import {TouchableOpacity, AsyncStorage, SafeAreaView, Text, Image} from "react-native";
import {Ionicons} from '@expo/vector-icons';

//Screens
import MainMenu from "./components/MainMenu";
import About from "./components/About";
import ExampleChat from "./components/ExampleChat";
import BreathingExercise from "./components/BreathingExercise";

const MainScreen = createStackNavigator({
    Main: {
        screen: MainMenu,
    },
    ExampleChat: {
        screen: ExampleChat,
    },
}, {
    defaultNavigationOptions: {

        headerStyle: {
            backgroundColor: '#2A4191',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
        },

    },
});

MainScreen.navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
        <Ionicons name={'ios-home'} size={24} color={tintColor}/>
    ),
};

const BreathingExerciseScreen = createStackNavigator({
    BreathingExercise: {screen: BreathingExercise},
}, {
    defaultNavigationOptions: {

        headerStyle: {
            backgroundColor: '#2A4191',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
        },

    },
});

BreathingExerciseScreen.navigationOptions = {
    drawerLabel: 'Breathe',
    drawerIcon: ({tintColor}) => (
        <Ionicons name={'md-body'} size={24} color={tintColor}/>
    ),
};

const AboutScreen = createStackNavigator({
    About: {screen: About},
}, {
    defaultNavigationOptions: {

        headerStyle: {
            backgroundColor: '#2A4191',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
        },

    },
});

AboutScreen.navigationOptions = {
    drawerLabel: 'About',
    drawerIcon: ({tintColor}) => (
        <Ionicons name={'ios-information-circle'} size={24} color={tintColor}/>
    ),
};


export default createDrawerNavigator({
        Home: {
            screen: MainScreen,
        },

        BreathingExercise: {
            screen: BreathingExerciseScreen,
        },

        About: {
            screen: AboutScreen,
        },

    },

    {
        headerMode: 'screen',
        drawerType:
            'left',
        unmountInactiveRoutes: true,

    },
);