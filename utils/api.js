import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'Mobile_Flashcards:decks';
//AsyncStorage.clear();

const startingData = {
    React: {
        title: 'React',
        questions: [
            { question: 'Is React a Javascript UI library?', answer: 'Yes' },
            { question: 'Which css propertie you use to change layout to column ?', answer: 'flexDirection' }
        ]
    },
    Sports: {
        title: 'Sports',
        questions: [
            { question: 'Which country won Fifa World Cup in 2018 ?', answer: 'France' },
            { question: 'In basketball, how many players play ?', answer: '5' },
            { question: 'Which golf player won Olympic Games in Rio 2016 ?', answer: 'Tiger Woods' },
        ]
    }
}

// Fetch all decks
export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY).then(result => {
        if (result !== null) {
            return JSON.parse(result)
        } else {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(startingData));
            return startingData;
        }
    });
}

// Get single deck
export function getDeck(title) {
    return getDecks()
        .then((decks) => decks[title]);
}

// Save new deck
export function saveDeckTitle(title) {
    const deckObj = { title, questions: [] };
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: deckObj
    }));
}

// Add a new card
export function addCardToDeck(title, card) {
    return getDecks()
        .then((decks) => {
            decks[title].questions.push(card);
            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
        });
}
