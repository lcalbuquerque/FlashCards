import React, { PureComponent } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { addCardToDeck } from '../utils/api';
import { red, blueDark } from '../utils/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addNewCard } from '../store/actions/actions';
import Button from './Button';

class AddCard extends PureComponent {
    state = {
        question: '',
        answer: '',
        questionTooShort: false,
        answerTooShort: false
    };

    createNewCard = () => {
        this.setState({ questionTooShort: false, answerTooShort: false });
        if (this.state.question.length >= 10 && this.state.answer.length > 1) {
            const newCard = {
                question: this.state.question,
                answer: this.state.answer
            }
            const deckTitle = this.props.navigation.state.params.deck;
            addCardToDeck(deckTitle, newCard);
            this.props.addNewCard(deckTitle, newCard);
            this.props.navigation.navigate('Deck', { deck: deckTitle });
        } else {
            if (this.state.question.length < 10) {
                this.setState({ questionTooShort: true })
            }
            if (this.state.answer.length < 1) {
                this.setState({ answerTooShort: true })
            }
        }
    }

    render() {

        return (
            <View style={styles.container}>

                {this.state.questionTooShort && <Text style={styles.error}>The question must have at least 10 characters</Text>}

                <TextInput underlineColorAndroid={blueDark} style={styles.input}
                    placeholder='Question' onChangeText={question => this.setState({ question })} />

                {this.state.answerTooShort && <Text style={styles.error}>Fill an answer.</Text>}

                <TextInput underlineColorAndroid={blueDark} style={styles.input}
                    placeholder='Answer' onChangeText={answer => this.setState({ answer })} />

                <View style={styles.buttonWrapper}>
                    <Button text='Create Card' func={this.createNewCard} />
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
    input: {
        padding: 10,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 17
    },
    buttonWrapper: {
        alignItems: "center"
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addNewCard }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddCard);