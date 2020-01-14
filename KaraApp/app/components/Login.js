import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
    Image,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {autobind} from 'core-decorators';

@autobind
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
        };
    }

    onBlur() {
        console.log('#####: onBlur');
    }

    componentDidMount() {
        this._loadInitialState();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.outerContainer}/>
                    <Image source={require('./img/klogo.png')} style={{flex: 1, width: '100%'}} resizeMode={'contain'}/>
                    <View style={{flex: 3, alignSelf: 'stretch'}}>
                        <TextInput
                            style={styles.textInput} placeholder='E-mail'
                            onChangeText={(username) => this.setState({username})}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            placeholder='********'
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid='transparent'
                        />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.testLogin}>
                            <Text style={styles.buttonTextStyle}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.registerBtn}
                            onPress={() => this.props.navigation.navigate('TermsConditions')}>
                            <Text style={styles.buttonTextStyle}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.testforgetPassword}>
                            <Text style={styles.forgotPasswordTextStyle}>Forgot Password?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    async testLogin() {
        this.setState({
            loading: true,
        });

        try {
            const result = await this.props.screenProps.store.login(this.state.username, this.state.password);
            this.setState({
                loading: false,
            });
            this.props.navigation.navigate('AuthenticatedStack');
        }
        catch (e) {
            alert(e.message);
            this.setState({
                loading: false,
            });
        }
    }

}

const styles = StyleSheet.create({
    forgotPasswordTextStyle: {
        marginTop: '10%',
        alignSelf: 'center',
        color: '#8b9dc3',
        textDecorationLine: 'underline',
    },

    containerTest: {
        flex: 1,
        paddingTop: 65,
        backgroundColor: 'white',
    },

    wrapper: {
        flex: 1,
    },

    formInput: {
        marginLeft: 20,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 50,
        paddingRight: 50,
    },

    outerContainer: {
        flex: 1,
        alignItems: 'center',
    },

    centreLogo: {
        width: '50%',
    },

    textInput: {
        alignSelf: 'stretch',
        padding: 5,
        marginBottom: 15,
        marginLeft: 15,
        backgroundColor: 'white',
    },

    labelInput: {
        flex: 1,
        color: '#2A4191',
    },

    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#2A4191',
        padding: 10,
        alignItems: 'center',
        color: 'white',
        marginTop: '5%',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
    },

    registerBtn: {
        alignSelf: 'stretch',
        backgroundColor: '#2C334D',
        padding: 10,
        alignItems: 'center',
        color: 'white',
        marginTop: '5%',
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 15,
    },

    buttonTextStyle: {
        color: 'white',
    },
});

