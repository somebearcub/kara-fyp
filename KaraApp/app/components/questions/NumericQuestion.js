import React, {Component} from 'react';
import {Text, StyleSheet, View} from "react-native";
import Slider from "react-native-slider";
import PropTypes from 'prop-types';

export class NumericQuestion extends React.PureComponent {

    static propTypes = {
        configuration: PropTypes.object,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            options: this.props.configuration.options,
            selectedIndex: null,
            value: 2,
        }
        this.updateAnswer = this.updateAnswer.bind(this);
    }

    componentDidMount() {
        const {value} = this.state;
        this.props.onChange(value, `${this.state.options.preValueText || ""} ${value} ${this.state.options.postValueText || ""}`);
    }

    render() {
        return (
            <View style={styles.numericQuestionView}>
                <Slider
                    value={this.state.value}
                    onValueChange={this.updateAnswer}
                    minimumValue={this.state.options.min}
                    maximumValue={this.state.options.max}
                    maximumTrackTintColor={"#BDBDBD"}
                    minimumTrackTintColor={"#2A4191"}
                    thumbTintColor={"#FABE3A"}
                    step={this.state.options.step}
                />
                <Text style={styles.numericQuestionStyle}>
                    {(this.state.options.preValueText ? this.state.options.preValueText : "") + " "}
                    {this.state.value}
                    {" " + (this.state.options.postValueText ? this.state.options.postValueText : "")}
                </Text>
            </View>
        )
    }

    updateAnswer(value) {

        this.setState({
            value: value,
        });

        this.props.onChange(value, `${this.state.options.preValueText || ""} ${value} ${this.state.options.postValueText || ""}`);
    }
}

const styles = StyleSheet.create({
    numericQuestionView: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },

    sliderStyle: {
        alignItems: 'center',
        width: '100%',
    },

    notPressedStyle: {
        alignItems: 'center',
        width: '40%',
        height: '20%',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2A4191',
        padding: 5,
    },

    numericQuestionStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#2A4191',
        fontWeight: 'bold',
    },
});