import React, {Component} from 'react';
import {Text, StyleSheet, TouchableHighlight, View, FlatList} from "react-native";
import PropTypes from 'prop-types';

export class MCQQuestion extends React.PureComponent {

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
        this.renderItem = this.renderItem.bind(this);
    }

    render() {
        return (
            <View style={styles.mcqQuestionView}>
                <FlatList data={this.state.options} renderItem={this.renderItem}
                          keyExtractor={(item) => 'mcq-' + item.name} style={{flex:2,
                    maxHeight: 500,}}/>
            </View>
        )
    }

    renderItem({item, index}) {
        return (<TouchableHighlight key={index}
                                    style={[styles.notPressedStyle,
                                        this.state.selectedIndex === index ? {
                                            backgroundColor: '#2A4191',
                                        } : {}]
                                    }
                                    underlayColor={'#2A4191'}
                                    onPress={this.updateAnswer(item.value, index, item.name)}
        >
            <Text style={this.state.selectedIndex === index ? {
                color: '#FFFFFF',
                backgroundColor: '#2A4191',
                fontWeight: 'bold',
            } : {}}>{item.name}</Text>
        </TouchableHighlight>);
    }

    updateAnswer(value, index, humanAnswer) {
        const that = this;
        return function () {
            that.setState({
                selectedIndex: index,
            });

            that.props.onChange(value, humanAnswer);
        }
    }
}

const styles = StyleSheet.create({
    mcqQuestionView: {
        flex: 1,
        // flexDirection: 'column',
        // alignItems: 'center',
        // paddingTop: '10%',
        // paddingLeft: '5%',
        // paddingRight: '5%',
    },

    pressedStyle: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2A4191',
        backgroundColor: '#2A4191',
        padding: 5,
    },

    notPressedStyle: {
        flex: 1,
        alignItems: 'center',
        // width: '100%',
        height: 40,
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#2A4191',
        padding: 5,
        marginBottom: 5,
    },
});