import React, { Component } from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllDecks } from '../store/actions/actions';
import { blueDark, blueCard, white } from '../utils/colors';

class DeckList extends Component {
    componentDidMount() {
        this.props.getAllDecks();
    }

    key = (item, index) => index.toString();

    navigateToDeck = (deck) => {
        this.props.navigation.navigate('Deck', { deck });
    }

    render() {
        return (
            <FlatList style={styles.deckList} data={Object.values(this.props.decks)}
                keyExtractor={this.key} renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => this.navigateToDeck(item.title)} >
                        <View style={styles.deckItem}>
                            <Text style={styles.deckTitle}>{item.title}</Text>
                            <Text style={styles.cardNumber}>Cards: {item.questions.length}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    deckList: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 5,
        padding: 20
    },
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
        color: blueCard,
        fontSize: 15
    }
});

function mapStateToProps(state) {
    return { decks: state };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAllDecks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList); 