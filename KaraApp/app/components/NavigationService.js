// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function goBack(routeName = null) {
    _navigator.dispatch(
        NavigationActions.back({
            key: routeName,
        })
    );
}

function getState() {
    return _navigator.state;
}

function getNavigator() {
    return _navigator;
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator,
    getState,
    getNavigator,
    goBack,
};