import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './app/components/Login';
import {Font} from "expo";
import NavigationService from './app/components/NavigationService';
import AuthenticatedStack from "./app/AuthenticatedStack";
import UnauthenticatedStack from "./app/UnauthenticatedStack";
import Store from "./api/store";
import {autobind} from "core-decorators";
import RJV from 'react-joi-validation';
import Joi from 'joi-react-native';


const RootSwitchApplication = createSwitchNavigator({
    UnauthenticatedStack: {screen: UnauthenticatedStack},
    AuthenticatedStack: {screen: AuthenticatedStack},
});

const RootApplication = createAppContainer(RootSwitchApplication);

@autobind
export default class App extends React.Component {
    setupNavigationStack(navRef) {
        NavigationService.setTopLevelNavigator(navRef);
        this.store.setChangeCallback(() => NavigationService.navigate('AuthenticatedStack'));
        this.store.setFailedCallback(() => NavigationService.navigate('UnauthenticatedStack'));
    }

    store = null;

    constructor(props) {
        super(props);
        this.state = {
            projectAssetsReady: false,
        };


        this.store = new Store();
        this.store.connect();
    }

    async initProjectRequirements() {
        // await Font.loadAsync({
        //     // 'fontname': require('./fontfile.ttf'),
        //
        // });

        this.setState({
            projectAssetsReady: true,
        });
    }

    componentDidMount() {
        this.initProjectRequirements();
        RJV.setJoi(Joi);
    }

    componentWillUnmount() {
        // Remove all listeners
        this.store.unmountStore();
    }

    render() {
        if (!this.state.projectAssetsReady) {
            return (<Expo.AppLoading/>);
        } else {
            return (
                <RootApplication uriPrefix={'/'} ref={this.setupNavigationStack} screenProps={{
                    store: this.store,
                }}/>
            )
        }
    }

}
