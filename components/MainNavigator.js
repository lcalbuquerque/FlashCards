import { TabNavigator, StackNavigator } from 'react-navigation';
import { blueDark, blueLink, white } from '../utils/colors';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import Deck from './Deck';
import Quiz from './Quiz';

const Tabs = TabNavigator({
    Decks: {
        screen: DeckList
    },
    Add: {
        screen: AddDeck,
        navigationOptions: { title: 'Add New Deck' }
    }
},
    {
        navigationOptions: { header: null },
        tabBarOptions: {
            activeTintColor: blueLink,
            style: { backgroundColor: blueDark }
        }
    });

const navigationOptionsDefault = {
    headerTintColor: white,
    headerStyle: { backgroundColor: blueDark, height: 30, paddingBottom: 20 }
};

const FadeTransition = (index, position) => {
    const sceneRange = [index - 1, index];
    const outputOpacity = [0, 1];
    const transition = position.interpolate({ inputRange: sceneRange, outputRange: outputOpacity })
    return { opacity: transition }
}

const NavigationConfig = () => {
    return {
        screenInterpolator: (sceneProps) => {
            const position = sceneProps.position;
            const scene = sceneProps.scene;
            const index = scene.index;
            return FadeTransition(index, position);
        }
    }
}

const MainNavigator = StackNavigator({
    Home: { screen: Tabs },
    Deck: {
        headerStyle: { height: 20 },
        screen: Deck,
        navigationOptions: {  ...navigationOptionsDefault }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: { ...navigationOptionsDefault }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: { ...navigationOptionsDefault }
    }
},
    // Animated Fade Transition btween tabs
    { transitionConfig: NavigationConfig }
);

export default MainNavigator;