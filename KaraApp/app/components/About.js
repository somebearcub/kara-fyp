import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Button, Alert,
} from 'react-native';
import {autobind} from 'core-decorators';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

@autobind
export default class About extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (
            <TouchableOpacity style={{paddingLeft: 15}} onPress={() => navigation.openDrawer()}>
                <Ionicons name={'ios-menu'} size={24} color='#fff'/>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={{paddingRight: 10}}
                              onPress={() =>
                                  Alert.alert(
                                      'Logout',
                                      'Are you sure you want to logout?',
                                      [
                                          {
                                              text: 'Cancel',
                                              onPress: () => console.log('Cancel Pressed'),
                                              style: 'cancel'
                                          },
                                          {
                                              text: 'Confirm', onPress: navigation.getParam('onPressLogout', () => console.log('Still setting up'))
                                              // This will call the function you set at componentDIdMount, the second parameter is if the thing isnt set then u give it a default value
                                          },
                                      ],
                                      {cancelable: false}
                                  )
                              }>
                <MaterialCommunityIcons name={'logout'} size={20} color='#fff'/>
            </TouchableOpacity>
        ),
    });


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTextStyle}>What is Kara?</Text>
                <Text style={styles.subtitleTextStyle}>Kara is an app designed by students from the
                    School of Computer Science and Engineering in collaboration with the Lee Kong Chian School of Medicine, it seeks to help doctors to collect
                    patient data efficiently.
                    {"\n"}{"\n"}
                    The first of its' kind, it collects active data through chatbot style questionnaires/e-Consultations and will ultimately replace pen-and-paper methods of administering patient health questionnaires. In this first phase of implementation, we have included a breathing exercise for patients to try to calm themselves when they feel anxious. In the next phase, the application will collect passive data from phone sensors.</Text>
            </View>
        );
    }

    async testLogout() {
        this.setState({
            loading: true,
        });

        try {
            await this.props.screenProps.store.logout();
            this.setState({
                loading: false,
            });
            this.props.navigation.navigate('UnauthenticatedStack');
            alert('You have successfully logged out.');
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
    },

    btn: {
        alignSelf: 'stretch',
        backgroundColor: '#2A4191',
        padding: 20,
        alignItems: 'center',
        color: 'white',
    },

    buttonTextStyle: {
        color: 'white',
    },

    headerTextStyle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        color: '#2A4191',
        paddingTop: '2%',
    },

});

