import { TabNavigator, StackNavigator } from 'react-navigation';
import { blueDark, blueHighlight, white } from '../utils/colors';
import DeckListScreen from './DeckListScreen';
import AddDeckScreen from './AddDeckScreen';
import AddCardScreen from './AddCardScreen';
import IndividualDeckScreen from './IndividualDeckScreen';
import QuizScreen from './QuizScreen';

const Tabs = TabNavigator({
    Decks: {
        screen: DeckListScreen
    },
    Add: {
        screen: AddDeckScreen,
        navigationOptions: { title: 'Add New Deck' }
    }
},
    {
        navigationOptions: { header: null },
        tabBarOptions: {
            activeTintColor: blueHighlight,
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
    IndividualDeck: {
        headerStyle: { height: 20 },
        screen: IndividualDeckScreen,
        navigationOptions: { title: 'Home', ...navigationOptionsDefault }
    },
    Quiz: {
        screen: QuizScreen,
        navigationOptions: { title: 'Card', ...navigationOptionsDefault }
    },
    AddCard: {
        screen: AddCardScreen,
        navigationOptions: { title: 'Card', ...navigationOptionsDefault }

    }
},
    // Animated Fade Transition btween tabs
    { transitionConfig: NavigationConfig }
);

export default MainNavigator;