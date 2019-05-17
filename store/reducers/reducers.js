import * as actionTypes from '../actions/actionTypes'

export default function deckReducer(state = {}, action) {
    switch (action.type) {

        case actionTypes.GET_ALL_DECKS:
            return action.payload;

        case actionTypes.ADD_NEW_DECK:
            return { ...state, ...action.payload }

        case actionTypes.ADD_NEW_CARD:
            const updatedDeck = state[action.deck];
            updatedDeck.questions.push(action.card);
            return { ...state, [action.deck]: updatedDeck };

        default: return state;
    }
}