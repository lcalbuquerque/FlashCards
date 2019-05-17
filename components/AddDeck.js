import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewDeck } from '../store/actions/actions';
import Button from './Button';
import { red, blueDark } from '../utils/colors';

class AddDeck extends Component {
    state = {
        title: '',
        tooShort: false
    };

    createDeck = () => {
        if (this.state.title.length >= 3) {
            saveDeckTitle(this.state.title);
            const deckObj = {
                [this.state.title]: {
                    title: this.state.title,
                    questions: []
                }
            };
            this.props.addNewDeck(deckObj);
            this.props.navigation.navigate('Deck', { deck: this.state.title });
            this.setState({ title: '' });
        } else {
            this.setState({ tooShort: true })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.tooShort && <Text style={styles.error}>The question must have at least 3 characters</Text>}
                <TextInput underlineColorAndroid={blueDark} style={styles.titleInput} placeholder='Title'
                    onChangeText={title => this.setState({ title })} value={this.state.title} />
                <View style={styles.buttonWrapper}>
                    <Button text='Create Deck' func={this.createDeck} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    error: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: red
    },
    titleInput: {
        padding: 10,
        marginTop: 35,
        marginBottom: 10,
        fontSize: 17
    },
    buttonWrapper: {
        alignItems: "center"
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNewDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddDeck);