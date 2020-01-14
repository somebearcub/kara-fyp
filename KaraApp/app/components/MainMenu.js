import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert, FlatList, Image,
} from 'react-native';
import {autobind} from 'core-decorators';
import {Card, Button} from 'react-native-elements';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {APP_URL} from "../../api/store";


@autobind
export default class MainMenu extends React.Component {

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
                                              style: 'cancel',
                                          },
                                          {
                                              text: 'Confirm',
                                              onPress: navigation.getParam('onPressLogout', () => console.log('Still setting up')),
                                              // This will call the function you set at componentDIdMount, the second parameter is if the thing isnt set then u give it a default value
                                          },
                                      ],
                                      {cancelable: false},
                                  )
                              }>
                <MaterialCommunityIcons name={'logout'} size={20} color='#fff'/>
            </TouchableOpacity>
        ),
    });
    state = {
        consultations: [],
    };
    //           image={{uri:"http://192.168.1.122:3030" + item.picture}}
    //           imageProps={{resizeMode: 'cover'}}
    //           imageStyle={{ width: 200, height: 200 }}
    renderConsultation({item}) {
        console.log(item, APP_URL+ item.picture);
        return (<Card
            containerStyle={styles.cardStyle}
            title={item.cTitle}
            titleStyle={styles.cardTitleTextStyle}>
            <Image
                source={{uri: APP_URL+ item.picture}}
                style={{height: 130, width: '100%', alignSelf: 'stretch', resizeMode: 'contain'}}
            />
            <Text style={styles.normalTextStyle}>{item.question_count} Questions</Text>
            <Button
                buttonStyle={styles.cardBtnStyle}
                title='Go' onPress={() => this.props.navigation.navigate('ExampleChat', {consultationId: item.id})}/>
        </Card>)
    };

    componentDidMount() {
        // You will have to put the function into the navigation state so that the navigation bar can see it
        this.props.navigation.setParams({
            onPressLogout: this.testLogout,
        });
        this.state = {
            givenName: '',
        }
        this.retrieveConsultations();
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerTextStyle}>Welcome
                        back, {this.props.screenProps.store.user && this.props.screenProps.store.user.givenName}.</Text>
                    <Text style={styles.subtitleTextStyle}>The doctors want you to fill these up before your next
                        appointment.
                        {"\n"}{"\n"}
                        You can always redo these questionnaires whenever you change your mind and there might be new questions added. You will be notified if there is.
                    </Text>
                </View>

                <View style={styles.lowerContainer}>
                    <Text style={styles.headerTextStyle}>E-Consultations</Text>
                    <View style={styles.consultationListContainer}>
                        <FlatList data={this.state.consultations} horizontal={true}
                                  renderItem={this.renderConsultation} keyExtractor={item => 'item-'+item.id}/>
                    </View>
                </View>
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

    async retrieveConsultations() {
        const {data} = await this.props.screenProps.store.app.service('consultation').find({
            query: {
                consultationId: this.state.consultationId,
                $sort: {
                    id: 1,
                },
            }
        });

        console.log(data);
        this.setState({
            consultations: data,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
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

    upperContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: '10%',
    },

    lowerContainer: {
        flex: 5,
        flexDirection: 'column',
        paddingTop: '10%',
    },

    titleHeaderTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#2A4191',
        paddingTop: '2%',
    },

    usernameHeaderTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#2A4191',
    },

    headerTextStyle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#2A4191',
        paddingTop: '2%',
        paddingLeft: '5%',
    },

    subtitleTextStyle: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'justify',
        justifyContent: 'flex-start',
        paddingTop: '3%',
        paddingLeft: '5%',
    },

    displayPictureStyle: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: 'grey',
    },

    normalTextStyle: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-start',
    },

    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: '5%',

    },

    cardStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: '95%',
        width: 200,
    },

    cardBtnStyle: {
        backgroundColor: '#FABE3A',
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,
    },

    consultationListContainer: {
        flex: 1,
    },

    cardImageStyle: {
        alignSelf: 'center',
    },

    cardTitleTextStyle: {
        textAlign: 'left',
        fontSize: 14,
        color: '#2A4191',
        paddingRight: 8,
    },
});

