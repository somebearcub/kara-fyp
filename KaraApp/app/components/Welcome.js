import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Button, Alert,
} from 'react-native';
import {autobind} from 'core-decorators';
import {Ionicons} from '@expo/vector-icons';

@autobind
export default class Welcome extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <TouchableOpacity style={{paddingLeft: 15}} onPress={() => navigation.goBack(null)}>
                <Ionicons name={'ios-arrow-round-back'} size={24} color='#fff'/>
            </TouchableOpacity>
        ),
    });

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.registerUpperContainer}>
                    <Text style={styles.titleHeaderTextStyle}>Hey there. {'\n'}</Text>
                    <Text style={styles.subtitleHeaderTextStyle}>This must be your first time with us. {'\n'}{'\n'}</Text>
                    <Text style={styles.congratsTextStyle}>Congratulations on your
                        pregnancy!{'\n'}{'\n'}</Text>
                    <Text style={styles.subtitleHeaderTextStyle}>
                        Through this wonderful journey of motherhood, you will experience many new things but don't worry, we'll be with you every step of the way.
                        {'\n'}{'\n'}But first, we would like to get to know you so that we can understand and help you better. {'\n'}{'\n'}
                    </Text>
                    <Image source={require('./img/confetti.png')} style={{width: '50%', zIndex: 1,}} />
                    <View
                        style={{
                            paddingTop: '2%',
                            borderBottomColor: '#dfe3ee',
                            borderBottomWidth: 1,
                        }}
                    />
                </View>

                <View style={styles.registerFormContainer}>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    registerUpperContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: '8%',
    },

    titleHeaderTextStyle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#2A4191',
    },

    congratsTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#2A4191',
        textAlign: 'center',
        paddingTop: '2%'
    },

    subtitleHeaderTextStyle: {
        fontSize: 14,
        color: 'black',
        textAlign: 'justify',
        paddingTop: '2%'
    },

    registerFormContainer: {
        flex: 2,
    },

    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#2A4191',
        padding: 10,
        alignItems: 'center',
        color: 'white',
        marginTop: '10%',
        marginLeft: 15,
        marginRight: 15,
    },

    buttonTextStyle: {
        color: 'white',
    },

    textInput: {
        alignSelf: 'stretch',
        padding: 5,
        marginBottom: 15,
        marginLeft: 15,
        backgroundColor: 'white',
    },
});

