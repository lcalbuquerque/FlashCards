import { getDecks } from '../../utils/api';
import * as actionTypes from './actionTypes'

export function getAllDecks() {
    return (dispatch) => {
        getDecks()
            .then((decks) => {
                dispatch({
                    type: actionTypes.GET_ALL_DECKS,
                    payload: decks
                })
            })
    }
}

export function addNewDeck(deck) {
    return { type: actionTypes.ADD_NEW_DECK, payload: deck }
}

export function addNewCard(deck, card) {
    return { type: actionTypes.ADD_NEW_CARD, deck, card }
}