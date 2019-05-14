import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { blueDark, blueHighlight, white } from '../utils/colors';

class DeckListItem extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigateToDeck(this.props.deck.title)} >
                <View style={styles.deckItem}>
                    <Text style={styles.deckTitle}>{this.props.deck.title}</Text>
                    <Text style={styles.cardNumber}>Cards: {this.props.deck.questions.length}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    deckItem: {
        backgroundColor: blueDark,
        marginBottom: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 1,
        elevation: 3,
        borderRadius: 5
    },
    deckTitle: {
        marginBottom: 5,
        fontSize: 18,
        color: white,
    },
    cardNumber: {
        color: blueHighlight,
        fontSize: 15
    }
});

export default DeckListItem;