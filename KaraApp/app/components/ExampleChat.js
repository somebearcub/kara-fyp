import React, {PureComponent} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    Button,
    Alert,
} from 'react-native';

import AnimatedBar from 'react-native-animated-bar';
import {GiftedChat, Actions, Bubble, SystemMessage} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import {Ionicons} from '@expo/vector-icons';
import {MCQQuestion} from './questions/MCQQuestion'
import {NumericQuestion} from "./questions/NumericQuestion";
import {DateQuestion} from "./questions/DateQuestion";
import {LadderQuestion} from "./questions/LadderQuestion";
import {FreeTextQuestion} from "./questions/FreeTextQuestion";
import {EmojiQuestion} from "./questions/EmojiQuestion"
import {VerticalSliderQuestion} from "./questions/VerticalSliderQuestion";
import {APP_URL} from "../../api/store";

export default class ExampleChat extends PureComponent {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (
            <TouchableOpacity style={{paddingLeft: 15}} onPress={() =>
                Alert.alert(
                    'Stop consultation?',
                    'By leaving this screen, you will have to restart the e-consultation again when you come back.',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'Confirm',
                            onPress: () => navigation.goBack(null),
                            // navigation.getParam('onPressLogout', () => console.log('Still setting up')),
                            // This will call the function you set at componentDIdMount, the second parameter is if the thing isnt set then u give it a default value
                        },
                    ],
                    {cancelable: false},
                )

            }>
                <Ionicons name={'ios-arrow-round-back'} size={24} color='#fff'/>
            </TouchableOpacity>
        ),
    });
    startQuestions = () => {

        this.displayQuestion(0);
        this.setState({
            btnTextValue: 'Next',
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: false,
            typingText: null,
            btnTextValue: 'Start',
            progress: 0,
            currentQuestion: null,
            currentQuestionIndex: 0,
            totalQuestionsCount: 0,
            questionsList: [],
            givenName: '',
            consultations: [],
            currentQuestionAnswer: null,
            currentQuestionHuman: null,
            consultationId: this.props.navigation.getParam('consultationId', 0),
            isFinished: false,
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this._isAlright = null;
        this.updateAnswer = this.updateAnswer.bind(this);
        this.onSubmitAnswer = this.onSubmitAnswer.bind(this);
        this.thankYouNext = this.thankYouNext.bind(this);
    }

    componentDidMount() {
        this.retrieveQuestionsList();

        this._isMounted = true;
        this.setState(() => {
            return {
                messages: require('./data/messages.js'),
            };
        });

        const interval = setInterval(() => {
            if (this.state.progress > 0.9) return clearInterval(interval);

            this.setState(state => {
                return {
                    progress: state.currentQuestionIndex + 0.1,
                };
            });
        }, 1000);
    }

    /*
    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        });

        setTimeout(() => {
            if (this._isMounted === true) {
                this.setState((previousState) => {
                    return {
                        messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
                        loadEarlier: false,
                        isLoadingEarlier: false,
                    };
                });
            }
        }, 1000); // simulating network
    }
*/

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });

        // for demo purpose
        this.answerDemo(messages);
    }

    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState((previousState) => {
                    return {
                        typingText: 'Kara is typing...',
                    };
                });
            }
        }

        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive('Nice picture!');
                    } else if (messages[0].location) {
                        this.onReceive('My favorite place');
                    } else {
                        if (!this._isAlright) {
                            this._isAlright = true;
                            this.onReceive("Alright! Let's go. (: ");
                        }
                    }
                }
            }
        }, 1000);
    }

    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Kara',
                        // avatar: APP_URL + "/images/consultations/picture-1555484222878.jpg"
                        avatar: require("./img/KaraAvatar.png")
                    },
                }),
            };
        });
    }

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Action 1': (props) => {
                alert('option 1');
            },
            'Action 2': (props) => {
                alert('option 2');
            },
            'Cancel': () => {
            },
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    },
                }}
            />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 14,
                }}
            />
        );
    }

    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    /**
     *
     * @param answer
     * @returns {Promise<void>}
     */
    async updateAnswer(answer, humanAnswer) {
        this.setState({
            currentQuestionAnswer: answer,
            currentQuestionHuman: humanAnswer,
        });
    }

    renderFooter(props) {
        if (this.state.currentQuestion !== null) {
            switch (this.state.currentQuestion.questionComponent) {
                case 'MCQQuestion':
                    return (
                        <MCQQuestion key={this.state.key} configuration={this.state.currentQuestion.question_details}
                                     onChange={this.updateAnswer}/>)
                case 'NumericQuestion':
                    return (<NumericQuestion key={this.state.key}
                                             configuration={this.state.currentQuestion.question_details}
                                             onChange={this.updateAnswer}/>)
                case 'DateQuestion':
                    return (<DateQuestion key={this.state.key}
                                          configuration={this.state.currentQuestion.question_details}
                                          onChange={this.updateAnswer}/>)
                case 'LadderQuestion':
                    return (<LadderQuestion key={this.state.key}
                                            configuration={this.state.currentQuestion.question_details}
                                            onChange={this.updateAnswer}/>)
                case 'EmojiQuestion':
                    return (<EmojiQuestion key={this.state.key}
                                           configuration={this.state.currentQuestion.question_details}
                                           onChange={this.updateAnswer}/>)
                case 'FreeTextQuestion':
                    return (<FreeTextQuestion key={this.state.key}
                                              configuration={this.state.currentQuestion.question_details}
                                              onChange={this.updateAnswer}/>)
                case 'CheckboxQuestion':
                    return (<CheckboxQuestion key={this.state.key}
                                              configuration={this.state.currentQuestion.question_details}
                                              onChange={this.updateAnswer}/>)
                case 'VerticalSliderQuestion':
                    return (<CheckboxQuestion key={this.state.key}
                                              configuration={this.state.currentQuestion.question_details}
                                              onChange={this.updateAnswer}/>)
            }
        }

        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.questionsProgressBarContainer}>
                    <AnimatedBar
                        progress={(this.state.currentQuestionIndex+1) / this.state.totalQuestionsCount}
                        height={5}
                        barColor="#2A4191"
                        fillColor="#9FAACD"
                        borderRadius={5}
                        borderWidth={0}
                        animate={false}
                    />
                </View>
                <Text
                    style={styles.progressBarSubtitle}> Question {this.state.currentQuestionIndex + 1}/{this.state.totalQuestionsCount}</Text>
                <View style={styles.chatAreaContainer}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={this.onSend}
                        loadEarlier={this.state.loadEarlier}
                        onLoadEarlier={this.onLoadEarlier}
                        isLoadingEarlier={this.state.isLoadingEarlier}
                        renderAvatarOnTop={true}


                        user={{
                            _id: 1, // sent messages should have same user._id

                        }}

                        renderActions={this.renderCustomActions}
                        renderBubble={this.renderBubble}
                        renderSystemMessage={this.renderSystemMessage}
                        renderCustomView={this.renderCustomView}
                        renderChatFooter={this.renderFooter}
                        renderInputToolbar={() => null}
                        minInputToolbarHeight={10}
                    />
                    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={150} enabled/>
                </View>
                <View style={styles.endSpaceStyle}>
                    {this.renderButtons()}
                </View>
            </View>
        );
    }

    async retrieveQuestionsList() {
        // Retrieve questions from server
        const {data, total, limit, skip} = await this.props.screenProps.store.app.service('question').find({
            query: {
                // Change to your consultation id
                consultationId: this.state.consultationId,
                $sort: {
                    id: 1,
                },
            },
        });


        await new Promise(resolve => this.setState({
            questionsList: data,
            currentQuestionIndex: 0,
            totalQuestionsCount: total,
        }, resolve));

    }

    async displayQuestion(zeroBasedIndex) {
        console.log(zeroBasedIndex, this.state.totalQuestionsCount);
        if (zeroBasedIndex >= this.state.totalQuestionsCount) {
            return false;
        }


        this.onReceive(this.state.questionsList[zeroBasedIndex].qDescription);

        await new Promise(resolve => this.setState({
            currentQuestion: this.state.questionsList[zeroBasedIndex],
            currentQuestionIndex: zeroBasedIndex,
            currentQuestionAnswer: null,
            key: Math.random(),
        }, resolve));

    }

    async onSubmitAnswer() {

        if(this.state.currentQuestionAnswer === null) {
            Alert.alert(
                'Please select an option!',
                'You have not selected any option.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                {cancelable: true},
            )
            return;
        }

        this.onSend({
            _id: Math.floor(Math.random() & Math.floor(3)) + new Date(),
            text: this.state.currentQuestionHuman,
            user: {_id: 1},
            createdAt: new Date(),
        });

        this.setState({
            btnTextValue: 'Next',
        });

        console.log({
            questionId: this.state.currentQuestion.id,
            consultationId: this.state.consultationId,
            rText: this.state.currentQuestionAnswer,
        });

        await this.props.screenProps.store.app.service('responses').create({
            questionId: this.state.currentQuestion.id,
            consultationId: this.state.consultationId,
            rText: this.state.currentQuestionAnswer,
        });

        if (this.state.currentQuestionIndex + 1 >= this.state.totalQuestionsCount) {
            await this.props.screenProps.store.app.service('consultation').patch(this.state.consultationId, {
                submitted: true,
            });

            await this.thankYouNext();
            return;
        }

        await this.displayQuestion(this.state.currentQuestionIndex + 1);
    }

    async thankYouNext() {
        this.setState({
            btnTextValue: 'Finish',
            currentQuestion: null,
            isFinished: true,
        });
        //TODO: add user name
        this.onReceive("Thank you," + "!" + "I have received all your responses and I'll be sending them to the doctor before your next appointment. (:");
    }

    renderButtons() {
        if (this.state.isFinished) {
            return (<TouchableOpacity
                style={styles.btn2}
                onPress={() => this.props.navigation.goBack()}
            >
                <Text style={styles.buttonTextStyle}>Finish</Text>
            </TouchableOpacity>);
        }
        if (this.state.currentQuestion === null) {
            return (<TouchableOpacity
                style={styles.btn2}
                onPress={this.startQuestions}
            >
                <Text style={styles.buttonTextStyle}>Start</Text>
            </TouchableOpacity>);
        } else {
            return (<TouchableOpacity
                style={styles.btn2}
                onPress={this.onSubmitAnswer}
            >
                <Text style={styles.buttonTextStyle}>{this.state.btnTextValue}</Text>
            </TouchableOpacity>);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
    },

    questionsProgressBarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    chatAreaContainer: {
        flex: 11,
    },

    footerText: {
        fontSize: 14,
        color: '#aaa',
    },


    btn2: {
        padding: 10,
        backgroundColor: '#2A4191',
        alignItems: 'center',
        color: 'white',
        // marginTop: '5%',
        borderRadius: 15,

    },

    buttonTextStyle: {
        color: 'white',
    },

    progressBarSubtitle: {
        color: '#b3b3b3',
        textAlign: 'center',
        paddingBottom: 10,
    },

    item: {
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 2,
        borderColor: '#2A4191',
        backgroundColor: 'white',
    },

    endSpaceStyle: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
});

