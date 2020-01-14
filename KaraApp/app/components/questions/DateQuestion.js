import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import DatePicker from 'react-native-datepicker'
import PropTypes from 'prop-types';
import moment from 'moment';

export class DateQuestion extends React.PureComponent {

    static propTypes = {
        configuration: PropTypes.object,
        onChange: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            options: this.props.configuration.options,
            selectedIndex: null,
            date: moment(new Date()).format("DD-MM-YYYY"),
        };
        this.updateAnswer = this.updateAnswer.bind(this);
    }

    componentDidMount() {
        this.props.onChange(this.state.date, this.state.date);
    }

    render() {
        const today = this.state.date;
        return (
            <View style={styles.dateQuestionView}>
                <DatePicker
                    date={this.state.date.toString()}
                    androidMode={'calendar'}
                    onDateChange={date => this.setState({ date })}
                    minDate={"01-01-2018"}
                    maxDate={today}
                    format="DD-MM-YYYY"
                    showIcon={false}
                    style={{flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center',}}
                    customStyles={{
                        dateInput: {
                            borderWidth: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        },

                        dateText: {
                            fontSize: 20,
                            color: '#2A4191',
                            fontWeight: 'bold',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        },
                    }}
                />
            </View>
        )
    }

    updateAnswer(date) {

        this.setState({
            date: date,
        });

        this.props.onChange(date, date);
    }
}

const styles = StyleSheet.create({
    dateQuestionView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%',
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
});