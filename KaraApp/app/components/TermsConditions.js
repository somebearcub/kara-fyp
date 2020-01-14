import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Picker,
    Button,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {ButtonGroup} from 'react-native-elements'
import {autobind} from 'core-decorators';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';

@autobind
export default class Register extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <TouchableOpacity style={{paddingLeft: 15}} onPress={() => navigation.goBack(null)}>
                <Ionicons name={'ios-arrow-round-back'} size={24} color='#fff'/>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props)
        this.state = {
            date: "",
            isOpen: false,
            selectedIndex: 2,
        }
        this.onControlChange = this.onControlChange.bind(this);
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex})
    }

    onControlChange(value) {

        return this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        const buttons = ['Yes', 'No']
        const {selectedIndex} = this.state

        return (
            <View style={styles.container}>
                <View style={styles.pageContainerStyle}>
                    <View style={styles.registerUpperContainer}>
                        <Text style={styles.titleHeaderTextStyle}>Terms & Conditions {'\n'}</Text>
                        <Text style={styles.subtitleHeaderTextStyle}>Please read the following T&Cs and accept them
                            before registering with our application.{'\n'}</Text>
                    </View>

                    <View style={styles.termsConditionScrollStyle}>
                        <ScrollView>
                            <Text>
                                Data Collection:
                                {'\n'}{'\n'}
                                As part of our terms and conditions of data collection for this
                                application,
                                you give Kara permission to collect, retain and process information about you, including
                                your age, sex, ethnic origin and details about your work. This information will be used
                                in a
                                large scale study research
                                and so that we can monitor our compliance with the law and best practice in terms of
                                on-discrimination and exercise, administer or perform any right or obligation in the
                                research.
                                {'\n'}{'\n'}
                                The information which we hold will be checked with you from time to time to ensure that
                                it remains up to
                                date. You agree to keep us informed of any changes to your personal data and to comply
                                with the Data Protection Act 1998.
                                {'\n'}{'\n'}
                                By accepting this T&C, the Recipient hereby explicitly and unambiguously consents to the
                                collection, use,
                                holding and transfer, in electronic or other form, of his or her personal data.
                                {'\n'}{'\n'}
                                Be it in sensor data format or
                                and monitoring of their health through this application. Information about them will
                                only be shared with the relevant authorities such as their doctors,
                                and only seek to help them with patient analysis.
                            </Text>
                        </ScrollView>
                    </View>

                    <View style={styles.endSpaceStyle}>
                        <Text style={styles.subtitleHeaderTextStyle}>Do you accept the terms and
                            conditions? {'\n'}</Text>

                        <TouchableOpacity
                            style={styles.btn2}
                            onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.buttonTextStyle}>I agree. Proceed with registration.</Text>
                        </TouchableOpacity>
                    </View>
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

    pageContainerStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },

    registerUpperContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingTop: '8%',
        paddingBottom: '2%',
    },

    titleHeaderTextStyle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#2A4191',
    },

    subtitleHeaderTextStyle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'justify',
        paddingTop: '2%',
    },

    subtitleHeaderTextStyle2: {
        fontSize: 14,
        color: 'grey',

    },

    registerFormContainer: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'stretch',

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
        borderRadius: 15,
    },

    btn2: {
        alignSelf: 'stretch',
        backgroundColor: '#2A4191',
        padding: 10,
        alignItems: 'center',
        color: 'white',
        marginTop: '5%',
        borderRadius: 15,
        paddingLeft: '8%',
        paddingRight: '8%',
    },

    buttonTextStyle: {
        color: 'white',
    },

    textInput: {
        fontSize: 16,
        paddingTop: '1%',
        alignSelf: 'flex-start',
    },

    labelIconStyle: {
        alignSelf: 'center',
        paddingLeft: '2%',
        paddingTop: '1.5%',
        paddingRight: '2%',
        paddingBottom: '1.5%',
    },

    endSpaceStyle: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: '2%',
        paddingBottom: '8%',
        paddingLeft: '8%',
        paddingRight: '8%',
    },

    termsConditionScrollStyle: {
        flex: 2,
        paddingLeft: '8%',
        paddingRight: '8%',
        alignItems: 'stretch',
    },
});

