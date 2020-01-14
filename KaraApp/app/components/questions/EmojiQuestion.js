import React, {Component} from 'react';
import {Text, StyleSheet, TouchableHighlight, View, Image, FlatList} from "react-native";
import PropTypes from 'prop-types';

export class EmojiQuestion extends React.PureComponent {

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
            <View style={styles.emojiQuestionView}>
                {/*<FlatList data={this.state.options} renderItem={this.renderItem} horizontal={true}*/}
                          {/*keyExtractor={(item) => 'emoji-' + item.name} style={{flex:2,*/}
                    {/*maxHeight: 500,}}/>*/}
                {this.state.options.map((item, index) => this.renderItem({item, index}))}
            </View>
        )
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

    renderItem({item, index}) {
        return (<View style={{flex: 1, alignItem: 'center', paddingRight: 20,}} key={"emoji"+item.name}><TouchableHighlight key={index}
                                    style={[styles.notPressedStyle,
                                        this.state.selectedIndex === index ? {
                                            backgroundColor: '#2A4191',
                                            borderWidth: 2,
                                            borderRadius: 40,
                                        } : {}]
                                    }
                                    onPress={this.updateAnswer(item.value, index, item.name)}
        >
            <Text style={[this.state.selectedIndex === index ? {
                color: '#FFFFFF',
                borderWidth: 2,
                borderRadius: 40,
                borderColor: '#2A4191',
                backgroundColor: '#2A4191',
                fontWeight: 'bold',
                fontSize: 50,
            } : {}, {
                textAlign: 'center',
                width:'100%',
                fontSize: 50,}]}>{item.name}</Text>
        </TouchableHighlight></View>);
    }
}

const styles = StyleSheet.create({
    emojiQuestionView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    pressedStyle: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#2A4191',
        borderWidth: 2,
        borderRadius: 40,
    },

    notPressedStyle: {
        alignContent: 'center',
        borderWidth: 2,
        borderRadius: 40,
        margin: 20,
        borderColor: '#e0e0e0',
    },
});