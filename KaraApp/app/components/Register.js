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
    Alert,
    Button, FlatList,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {ButtonGroup} from 'react-native-elements'
import {autobind} from 'core-decorators';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';

import validate from 'react-joi-validation';
import Joi from 'joi-react-native';


const joiSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    familyName: Joi.string().required(),
    givenName: Joi.string().required(),
    dateOfBirth: Joi.date().max('now').iso().required(),
    nationality: Joi.string().only(['Singaporean (Born Here)', 'Singaporean (Migrated Here)', 'Permanent Resident', 'Long Term Visa (Work/Student)']).required(),
    ethnicGroup: Joi.string().only(['Chinese', 'Malay', 'Indian', 'Eurasian', 'Caucasian', 'Others']).required(),
    maritalStatus: Joi.string().only(['Single', 'Engaged', 'Married', 'Cohabiting', 'Divorced', 'Widowed']).required(),
    employmentStatus: Joi.string().only(['I\'m working full-time.', 'I\'m working part-time.', 'I\'m self-employed.', 'I\'m unemployed.']).required(),
    fPregnancy: Joi.boolean(),
});


@autobind
class RegisterClass extends React.Component {

    static defaultProps = {
        submissionData: {
            email: '',
            password: '',
            familyName: '',
            givenName: '',
            dateOfBirth: '',
            nationality: 'Singaporean (Born Here)',
            ethnicGroup: 'Chinese',
            maritalStatus: 'Single',
            employmentStatus: 'I\'m working full-time.',
            fPregnancy: false,
        },
    };


    constructor(props) {
        super(props);

        this.state = {
            date: "",
            isOpen: false,
            selectedIndex: 2,
            isLoading: false, // Before you use any state it is best to setup the initial value here
            // Or you will get this.state.whatever is undefined before u set state. :D
        }
        this.onControlChange = this.onControlChange.bind(this);
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex(selectedIndex) {
        this.props.changeValue('fPregnancy', selectedIndex === 0);
        this.setState({selectedIndex})
    }

    onControlChange(value) {

        return this.setState({
            isOpen: !this.state.isOpen,
        });
    }


    render() {
        return (
            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={90}>
                <FlatList data={[{}]} renderItem={item => this.renderRegistrationPage(this.props)} />
            </KeyboardAvoidingView>
        );
    }

    renderRegistrationPage(props) {
        const buttons = ['Yes', 'No']
        const {selectedIndex} = this.state;

        const {
            validateHandler, changeValue, errors, submissionData: {
                email,
                password,
                familyName,
                givenName,
                dateOfBirth,
                nationality,
                ethnicGroup,
                maritalStatus,
                employmentStatus,
                fPregnancy,
            },
        } = this.props; // Destructuring Assignment

        return <View style={styles.pageContainerStyle}>
            <View style={styles.registerUpperContainer}>
                <Text style={styles.titleHeaderTextStyle}>Register with us.{'\n'}</Text>
                <Text style={styles.subtitleHeaderTextStyle}>Create your account by filling up the profile
                    form below.{'\n'}</Text>
            </View>

            <View style={styles.registerFormContainer}>
                <View style={styles.formSectionStyle}>
                    <MaterialIcons style={styles.labelIconStyle} name="email" size={20} color="#2A4191"/>
                    <TextInput
                        onChangeText={text => changeValue('email', text)}
                        onBlur={validateHandler('email')}
                        style={styles.textInput} placeholder='E-mail'
                        placeholderTextColor='black'
                        underlineColorAndroid='transparent'
                    />
                    {errors.email && <Text style={styles.validationErrorTextStyle}>{errors.email}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialIcons style={styles.labelIconStyle} name="lock" size={20} color="#2A4191"/>
                    <TextInput
                        onChangeText={text => changeValue('password', text)}
                        onBlur={validateHandler('password')}
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder='Password'
                        placeholderTextColor='black'
                        underlineColorAndroid='transparent'
                    />
                    {errors.password &&
                    <Text style={styles.validationErrorTextStyle}>{errors.password}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialIcons style={styles.labelIconStyle} name="person" size={20} color="#2A4191"/>
                    <TextInput
                        onChangeText={text => changeValue('familyName', text)}
                        onBlur={validateHandler('familyName')}
                        style={styles.textInput} placeholder='Family Name'
                        placeholderTextColor='black'
                        underlineColorAndroid='transparent'
                    />
                    {errors.familyName &&
                    <Text style={styles.validationErrorTextStyle}>{errors.familyName}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialIcons style={styles.labelIconStyle} name="person-pin" size={20}
                                   color="#2A4191"/>
                    <TextInput
                        onChangeText={text => changeValue('givenName', text)}
                        onBlur={validateHandler('givenName')}
                        style={styles.textInput} placeholder='Given Name'
                        placeholderTextColor='black'
                        underlineColorAndroid='transparent'
                    />
                    {errors.givenName &&
                    <Text style={styles.validationErrorTextStyle}>{errors.givenName}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialCommunityIcons style={styles.labelIconStyle} name="calendar-blank" size={20}
                                            color="#2A4191"/>
                    <DatePicker
                        style={{width: '100%'}}
                        date={dateOfBirth}
                        mode="date"
                        placeholder="Birthdate"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => changeValue('dateOfBirth', date)}
                        customStyles={{
                            dateInput: {
                                borderWidth: 0,
                                justifyContent: 'center',
                                alignSelf: 'flex-start',
                                alignItems: 'flex-start',
                                paddingBottom: '2%',
                            },

                            dateIcon: {
                                height: 0,
                                width: 0,
                            },

                            placeholderText: {
                                fontSize: 16,
                                color: 'black',
                            },
                        }}
                    />
                    {errors.dateOfBirth &&
                    <Text style={styles.validationErrorTextStyle}>{errors.dateOfBirth}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialCommunityIcons style={styles.labelIconStyle} name="ring" size={20}
                                            color="#2A4191"/>
                    <Picker
                        mode='dropdown'
                        selectedValue={maritalStatus}
                        style={styles.pickerStyle}
                        onValueChange={(itemValue, itemIndex) => changeValue('maritalStatus', itemValue)}>
                        <Picker.Item label="Single" value="Single"/>
                        <Picker.Item label="Engaged" value="Engaged"/>
                        <Picker.Item label="Married" value="Married"/>
                        <Picker.Item label="Cohabiting" value="Cohabiting"/>
                        <Picker.Item label="Divorced" value="Divorced"/>
                        <Picker.Item label="Widowed" value="Widowed"/>
                    </Picker>
                    {errors.maritalStatus &&
                    <Text style={styles.validationErrorTextStyle}>{errors.maritalStatus}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialCommunityIcons style={styles.labelIconStyle} name="flag-variant" size={20}
                                            color="#2A4191"/>
                    <Picker
                        selectedValue={nationality}
                        style={styles.pickerStyle}
                        onValueChange={(itemValue, itemIndex) => changeValue('nationality', itemValue)}>
                        <Picker.Item label="Singaporean (Born Here)" value="Singaporean (Born Here)"/>
                        <Picker.Item label="Singaporean (Migrated Here)" value="Singaporean (Migrated Here)"/>
                        <Picker.Item label="Permanent Resident" value="Permanent Resident"/>
                        <Picker.Item label="Long Term Visa (Work/Student)" value="Long Term Visa (Work/Student)"/>
                    </Picker>
                    {errors.nationality &&
                    <Text style={styles.validationErrorTextStyle}>{errors.nationality}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <MaterialCommunityIcons style={styles.labelIconStyle} name="account-group" size={20}
                                            color="#2A4191"/>
                    <Picker
                        selectedValue={ethnicGroup}
                        style={styles.pickerStyle}
                        itemStyle={{fontSize: 9}}
                        onValueChange={(itemValue, itemIndex) => changeValue('ethnicGroup', itemValue)}>
                        <Picker.Item label="Chinese" value="Chinese"/>
                        <Picker.Item label="Malay" value="Malay"/>
                        <Picker.Item label="Indian" value="Indian"/>
                        <Picker.Item label="Eurasian" value="Eurasian"/>
                        <Picker.Item label="Caucasian" value="Caucasian"/>
                        <Picker.Item label="Others" value="Others"/>
                    </Picker>
                    {errors.ethnicGroup &&
                    <Text style={styles.validationErrorTextStyle}>{errors.ethnicGroup}</Text>}
                </View>
                <View style={styles.formSectionStyle}>
                    <Entypo style={styles.labelIconStyle} name="suitcase" size={20}
                            color="#2A4191"/>
                    <Picker
                        selectedValue={employmentStatus}
                        style={styles.pickerStyle}
                        itemStyle={{fontSize: 10}}
                        onValueChange={(itemValue, itemIndex) => changeValue('employmentStatus', itemValue)}>
                        <Picker.Item label="I'm working full-time" value="I'm working full-time."/>
                        <Picker.Item label="I'm working part-time" value="I'm working part-time."/>
                        <Picker.Item label="I'm self-employed" value="I'm self-employed."/>
                        <Picker.Item label="I'm unemployed" value="I'm unemployed."/>
                    </Picker>
                    {errors.employmentStatus &&
                    <Text style={styles.validationErrorTextStyle}>{errors.employmentStatus}</Text>}
                </View>
                <View style={styles.bigContainer}>
                    <View style={styles.smallContainer}>
                        <MaterialIcons style={styles.labelIconStyle} name="pregnant-woman" size={20}
                                       color="#2A4191"/>
                        <Text style={styles.textInput}>
                            Is this your first pregnancy?
                        </Text>
                    </View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        selectedButtonStyle={{backgroundColor: 'green'}}
                        buttons={buttons}
                        containerStyle={{
                            height: '50%',
                            width: '100%',
                            paddingBottom: '5%',
                        }}
                    />
                </View>
                <View style={styles.endSpaceStyle}>
                    <Text style={styles.subtitleHeaderTextStyle2}>All data collected will be kept strictly
                        private and confidential. {'\n'}</Text>
                    <TouchableOpacity
                        style={styles.btn2}
                        onPress={this.testRegister}
                    >
                        <Text style={styles.buttonTextStyle}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    }

    async testRegister() {
        // Usually I will turn on the refreshing/loading flag before i run anything. So if you have
        // a spinner to display, you can take the opportunity to {this.state.isLoading && <Spinner />}


        try {
            this.setState({
                isLoading: true,
            });
            const {
                submissionData: {
                    email,
                    password,
                    familyName,
                    givenName,
                    dateOfBirth,
                    nationality,
                    ethnicGroup,
                    maritalStatus,
                    employmentStatus,
                    fPregnancy,
                }, validateAll, errors,
            } = this.props;

            // All these promises, if they fail to resolve (i.e. throw error) it will automagically throw error
            // to the catch block, so you can confidently use this knowing that if got bug then it'll throw error

            await new Promise(resolve => validateAll(resolve));

            console.log(this.props.submissionData, errors);
            if (Object.keys(errors).length > 0) {
                throw new Error("Validation still got error");// This doesn't throw error but you want to throw so
                // that your try-catch block will stop the fella from running.
                // The IDE will warn you if there is a local throw/catch, but you can safely ignore.
            }

            await this.props.screenProps.store.app.service('users').create({
                email,
                password,
                familyName,
                givenName,
                dateOfBirth,
                nationality,
                ethnicGroup,
                maritalStatus,
                employmentStatus,
                fPregnancy,
            });

            const result = await this.props.screenProps.store.login(this.props.submissionData.email, this.props.submissionData.password);


            this.setState({
                isLoading: false,
            })

            Alert.alert(
                'Registration Success',
                'Account successfully created! You can access your e-consultations immediately.',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log('OK Pressed'),
                        style: 'cancel',
                    },
                ],
            );

            this.props.navigation.navigate('AuthenticatedStack');
        } catch (e) {

            console.log(e);
            this.setState({
                isLoading: false, // Need to ake sure if it doesn't work, your loading flag should turn off haha
            });

            // I think you don't have to put the below, but if you don't like to see the red screen you can comment this off.
            throw e;
        }
    }
}


export const Register = validate(RegisterClass, {
    joiSchema: joiSchema,
    only: 'submissionData',
});

Register.navigationOptions = ({navigation}) => ({
    headerLeft: (
        <TouchableOpacity style={{paddingLeft: 15}} onPress={() => navigation.goBack(null)}>
            <Ionicons name={'ios-arrow-round-back'} size={24} color='#fff'/>
        </TouchableOpacity>
    ),
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    pageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
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

    validationErrorTextStyle: {
        color: 'red',
        fontSize: 10,
        paddingLeft: '2%',
        paddingRight: '2%',
        alignSelf: 'center',
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

    formSectionStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        paddingTop: '2%',
        paddingBottom: '1%',
        paddingLeft: '6%',
        paddingRight: '10%',
        borderBottomWidth: 0.5,
        borderColor: '#dfe3ee',
    },

    bigContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: '2%',
        paddingBottom: '3%',
        paddingLeft: '8%',
        paddingRight: '8%',
        borderBottomWidth: 0.5,
        borderColor: '#dfe3ee',
    },

    smallContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
    },


    endSpaceStyle: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: '8%',
        paddingTop: '5%',
        paddingLeft: '8%',
        paddingRight: '8%',
    },

    pickerStyle: {
        width: '100%',
        height: '100%',
        color: 'black',
    },

    pickerBoolStyle: {
        width: '100%',
        height: '100%',
        color: 'black',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
});

