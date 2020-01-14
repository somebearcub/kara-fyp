import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from "react-navigation";

//Screens
import Login from "./components/Login";
import {Register} from "./components/Register";
import TermsConditions from "./components/TermsConditions"
import ExampleChat from "./components/ExampleChat";
import BreathingExercise from "./components/BreathingExercise";


const LoginScreen = createStackNavigator({
        Login: {
            screen: Login,
        },
    },
    {
        headerMode: 'none',
    },
);

const RegisterScreen = createStackNavigator({
    Register: {
        screen: Register,
    },
}, {
    headerMode: 'screen',
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

const TermsConditionsScreen = createStackNavigator({
    TermsConditions: {
        screen: TermsConditions,
    },
}, {
    headerMode: 'screen',
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


const ExampleScreen = createStackNavigator({
    ExampleChat: {
        screen: ExampleChat,
    },
}, {
    headerMode: 'screen',
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

const RouterComponent = createStackNavigator({
        // BreathingExercise: {
        //     screen: BreathingExerciseScreen,
        // },

        ExampleChat: {
            screen: ExampleScreen,
        },

        Login: {
            screen: LoginScreen,
        },
        Register: {
            screen: RegisterScreen,
        },

        TermsConditions: {
            screen: TermsConditionsScreen,
        },
    },

    {
        headerMode: 'none',
        //Login
        initialRouteName: 'Login',
    },
);

export default RouterComponent;