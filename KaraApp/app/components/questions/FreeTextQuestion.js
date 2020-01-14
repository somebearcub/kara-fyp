import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import PropTypes from 'prop-types';

export class FreeTextQuestion extends React.PureComponent {

    static propTypes = {
        configuration: PropTypes.object,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            options: this.props.configuration.options,
            selectedIndex: null,
            freeTextAnswer: '',
        }
        this.updateAnswer = this.updateAnswer.bind(this);
    }

    componentDidMount() {
        this.props.onChange(this.state.freeTextAnswer);
    }

    render() {
        return (
            <View style={styles.freeTextQuestionStyle}>
                <TextInput
                    onChangeText={this.updateAnswer}
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    placeholder={"Type your answer here."}
                    placeholderTextColor={"#9E9E9E"}
                    numberOfLines={10}
                    multiline={true}
                />
            </View>
        )
    }

    updateAnswer(freeTextAnswer) {

        this.setState({
            freeTextAnswer: freeTextAnswer,
    });

        this.props.onChange(freeTextAnswer, freeTextAnswer);
    }
}

const styles = StyleSheet.create({
    freeTextQuestionStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },

    TextInputStyleClass: {
        flex: 1,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20 ,
        backgroundColor : "#FFFFFF",
    },
});