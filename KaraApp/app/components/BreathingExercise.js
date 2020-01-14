import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated, Easing, Alert,
} from 'react-native';
import {LinearGradient} from 'expo';
import {autobind} from 'core-decorators';
import {Ionicons} from '@expo/vector-icons';

@autobind
export default class BreathingExercise extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (
            <TouchableOpacity style={{paddingLeft: 15}} onPress={() => navigation.openDrawer()}>
                <Ionicons name={'ios-menu'} size={24} color='#fff'/>
            </TouchableOpacity>
        ),
    });

    constructor(props) {
        super(props);
        this.state = {
            size: new Animated.Value(1),
            breathingText: 'Breathe In',
            isPaused: false,
            timer: 98,
            countdownTimer: 3,
            sessionNotStarted: true,
        };
    }


    componentDidMount() {
        this.setState({
            size: new Animated.Value(1),
            breathingText: 'Breathe In',
            isPaused: false,
            timer: 98,
            countdownTimer: 3,
            sessionNotStarted: true,
        });


        this.interval = setInterval(
            () => {
                if (this.state.timer === 0) {
                    clearInterval(this.interval);
                    return;
                }
                this.setState((prevState) => ({timer: prevState.timer - 1}))
            },
            1000,
        );

        this.countdownTimer = setInterval(
            () => this.setState((prevState) => ({countdownTimer: prevState.countdownTimer - 1})),
            1000,
        );

        this.startTimer = setTimeout(() => {
            this.setState({
                sessionNotStarted: false,
                countdownTimer: 0,
            });
            this.executeBreathing();


            clearInterval(this.countdownTimer);
        }, 3000);

        // this.size = this.state.size.interpolate({
        //     inputRange: [1, 10],
        //     outputRange: [10, 250],
        //     extrapolate: 'clamp',
        // });
    }

    componentWillUnmount() {
        console.log('unmounted lah');
        clearInterval(this.interval);
        clearInterval(this.countdownTimer);
        clearTimeout(this.startTimer);
    }


    async _loopAnimationUp(value = 50) {
        this.state.size.setValue(value);
        await new Promise(resolve => this.setState({breathingText: 'Breathe In'}, resolve));
        console.log('Animating...')
        await new Promise(resolve => Animated.timing(this.state.size, {
            toValue: 250,
            duration: 4000,
            easing: Easing.linear,
        }).start(resolve));
        console.log('Animated...')
    }

    async _loopHold(value = 250) {
        this.state.size.setValue(value);
        await new Promise(resolve => this.setState({breathingText: 'Hold'}, resolve));
        console.log('Animating...')
        await new Promise(resolve => Animated.timing(this.state.size, {
            toValue: 250,
            duration: 7000,
        }).start(resolve));
        console.log('Animated...')

    }


    async _loopAnimationDown(value = 250) {
        this.state.size.setValue(value);
        await new Promise(resolve => this.setState({breathingText: 'Breathe Out'}, resolve));
        await new Promise(resolve => Animated.timing(this.state.size, {
            toValue: 50,
            duration: 8000,
            easing: Easing.linear,
        }).start(resolve));
    }

    render() {

        const {navigation} = this.props;
        return (
            <LinearGradient
                style={styles.gradientBackgroundStyle}
                colors={["#3a7bd5", "#3a6073"]}>
                <View style={styles.topContainer}>
                    <Text style={styles.timerTextStyle}> {this.state.timer} </Text>
                </View>
                <View style={styles.container}>
                    {this.renderContainer()}
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.roundBtn} onPress={() =>
                        Alert.alert(
                            'Stop the exercise?',
                            'If you stop the exercise, you will have to restart it again when you come back.',
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
                        )}>
                        <Ionicons name={'md-close'} size={24} color='#fff'/>
                    </TouchableOpacity>

                </View>
            </LinearGradient>
        );
    }

    async executeBreathing() {
        let breathingSteps = [
            this._loopAnimationUp,
            this._loopHold,
            this._loopAnimationDown,
        ];

        for (let i = 0; i < 5; i++) {
            for (let step of breathingSteps) {
                await step();
            }
        }
    }

    renderContainer() {
        if (this.state.sessionNotStarted) {
            return (
                <>
                    <View style={styles.container2}>
                        <Text style={styles.relaxText}>Relax...</Text>
                        <Text style={styles.breatheSubtitleStyle}> Your session starts in </Text>
                        <Text style={styles.breatheTimerStyle}>{this.state.countdownTimer}</Text>
                    </View>
                </>
            );
        } else {
            return (
                <>
                    <View style={styles.container}>
                        <View style={styles.circleStatic}>
                            <Animated.View style={styles.breatheCircle}>
                                <Animated.View style={[styles.breatheCircle2, {
                                    width: this.state.size,
                                    height: this.state.size,
                                    borderRadius: this.state.size,
                                }]}>
                                </Animated.View>
                            </Animated.View>
                            <Text style={styles.breatheTextStyle}>{this.state.breathingText}</Text>
                        </View>
                    </View>
                </>
            );
        }
    }
}


const styles = StyleSheet.create({
    gradientBackgroundStyle: {
        flex: 1,
        alignItems: 'stretch',
        position: 'relative',
    },
    body: {
        alignItems: 'center',
        backgroundColor: '#202020',
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        margin: 0,
        width: '100%',
    },
    container: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    circleStatic: {
        flex: 1,
        width: 250,
        height: 250,
        borderRadius: 250/2,
        backgroundColor: 'white',
        opacity: 0.2,
        position: 'absolute',
        zIndex: 0,
        justifyContent: 'center',
        alignItems:'center'
    },

    container2: {
        flex: 5,
        justifyContent: 'center',
        flexDirection: 'column',
    },

    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backButton: {
        alignSelf: 'stretch',
        padding: 10,
        alignItems: 'center',
        color: 'white',
        marginTop: '10%',
        opacity: 0.5,
    },

    breatheCircle: {
        // width: 250,
        // height: 250,
        zIndex: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    breatheCircle2: {
        // width: 200,
        // height: 200,
        backgroundColor: 'white',
        opacity: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    timerTextStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'justify',
        opacity: 0.5,
    },

    breatheTextStyle: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        zIndex: 4,
        position: 'absolute',
    },

    breatheTimerStyle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        opacity: 0.7,
    },

    relaxText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        opacity: 0.8,
    },

    breatheSubtitleStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        opacity: 0.5,
    },

    image: {
        borderRadius: 150 / 2,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    roundBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        opacity: 0.3,
        backgroundColor: 'black',
        borderRadius: 40 / 2,
    },
});

