import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';

export class LadderQuestion extends React.PureComponent {

    static propTypes = {
        configuration: PropTypes.object,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            options: this.props.configuration.options,
            selectedIndex: null,
            pressed: false,
            selectedColor: 'transparent',
        }
        this.updateAnswer = this.updateAnswer.bind(this);
    }

    render() {
        return (
            <View style={styles.ladderQuestionView}>

            </View>
        )
    }

    updateAnswer(value, index) {
        const that = this;
        return function () {
            that.setState({
                selectedIndex: index,
            });

            that.props.onChange(value);
        }
    }
}

const styles = StyleSheet.create({
    ladderQuestionView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
});