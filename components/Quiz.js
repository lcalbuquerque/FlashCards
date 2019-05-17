import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { gray, blueDark } from '../utils/colors';
import { setLocalNotification, clearLocalNotification } from '../utils/notifications';
import Button from './Button';

const ResultScreen = (props) => (
    <View style={styles.resultCard}>
        <Text style={styles.resultCardText}>Total questions answered: {props.totalAnswered}</Text>
        <Text style={styles.resultCardText}>Correct Answers: {((props.correct / props.totalAnswered) * 100).toFixed(0)}%</Text>
        <View style={styles.quizButtons}>
            <Button text='Restart' func={props.restart} />
            <Button text='Go Back' func={props.goBack} />
        </View>
    </View>
);

const ShowAnswer = (props) => (
    <TouchableWithoutFeedback onPress={props.show}>
        <View>
            <Text>Show Answer</Text>
        </View>
    </TouchableWithoutFeedback>
)

class Quiz extends PureComponent {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        showAnswer: false,
        showResults: false
    };

    showAnswer = () => {
        this.setState({ showAnswer: true });
    }

    userAnswered(answerChosen) {
        if (answerChosen === 'Correct') {
            this.setState({ correctAnswers: this.state.correctAnswers + 1 });
        }
        if (this.state.currentQuestion === this.props.questions.length - 1) {
            this.setState({ showResults: true });
        } else {
            this.setState({ currentQuestion: this.state.currentQuestion + 1 });
        }
        this.setState({ showAnswer: false });
    }

    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            showAnswer: false,
            showResults: false
        });

        clearLocalNotification()
            .then(setLocalNotification)
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    }

    render() {

        if (this.state.showResults) {
            return (
                <ResultScreen totalAnswered={this.props.questions.length} correct={this.state.correctAnswers}
                    restart={this.restartQuiz} goBack={this.goBack} />
            );
        }

        const showingCard = this.props.questions[this.state.currentQuestion];

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.quizCard}>
                    <View>
                        <Text>Card {this.state.currentQuestion + 1}/{this.props.questions.length}</Text>
                    </View>

                    <Text style={styles.questionText}>{showingCard.question}</Text>

                    {
                        this.state.showAnswer ?
                            <View style={styles.answerView}>
                                <Text style={styles.answerText}> Answer: {showingCard.answer}</Text>
                            </View>
                            :
                            <ShowAnswer show={this.showAnswer} />
                    }

                    <View style={styles.quizButtons}>
                        <Button text='Correct' func={() => this.userAnswered('Correct')} />
                        <Button text='Incorrect' func={() => this.userAnswered('Incorrect')} />
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    noCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCardsText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    resultCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultCardText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    quizButtons: {
        flexDirection: 'row',
    },
    quizCard: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 25,
        padding: 25,
        backgroundColor: gray,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 3
    },
    questionText: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    answerText: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: blueDark
    },
    answerView: {
        backgroundColor: gray,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 1,
        elevation: 3,
        borderRadius: 5
    },
});

function mapStateToProps(state, ownProps) {
    return { questions: state[ownProps.navigation.state.params.deck].questions };
}

export default connect(mapStateToProps)(Quiz);