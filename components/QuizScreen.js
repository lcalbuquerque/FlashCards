import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { gray, blueDark } from '../utils/colors';
import { setLocalNotification, clearLocalNotification } from '../utils/notifications';
import Button from './Button';

const NoCards = () => (
    <View style={styles.noCards}>
        <Text style={styles.noCardsText}>No card(s) in this deck.</Text>
    </View>
);

const ResultScreen = (props) => (
    <View style={styles.resultCard}>
        <Text style={styles.resultCardText}>Total questions answered: {props.totalAnswered}</Text>
        <Text style={styles.resultCardText}>Correct Answers: {props.correct}</Text>
        <Button text='Restart' func={props.restart} />
        <Button text='Go Back' func={props.goBack} />
    </View>
);

const ShowQuestionOrAnswer = (props) => (
    <TouchableWithoutFeedback onPress={props.toggle}>
        <View>
            {
                props.current == 'question'
                    ? <Text>Show Answer</Text>
                    : <Text>Show Question</Text>
            }
        </View>
    </TouchableWithoutFeedback>
)

class QuizScreen extends PureComponent {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        show: 'question',
        showResults: false
    };

    showQuestionOrAnswer = () => {
        const show = (this.state.show) === 'question'
            ? 'answer'
            : 'question'

        this.setState({ show });
    }

    userAnswered(answerChosen, answer) {
        if (answerChosen === answer) {
            this.setState({ correctAnswers: this.state.correctAnswers + 1 });
        }
        if (this.state.currentQuestion === this.props.questions.length - 1) {
            this.setState({ showResults: true });
        } else {
            this.setState({ currentQuestion: this.state.currentQuestion + 1 });
        }
        this.setState({ show: 'question' });
    }

    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            show: 'question',
            showResults: false
        });

        clearLocalNotification()
            .then(setLocalNotification)
    }

    goBack = () => { this.props.navigation.dispatch(NavigationActions.back()); }

    render() {
        if (this.props.questions.length === 0) {
            return <NoCards />
        }

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
                    <View style={styles.quizProgress}>
                        <Text>Card {this.state.currentQuestion + 1}/{this.props.questions.length}</Text>
                    </View>

                    <Text style={styles.questionText}>{showingCard.question}</Text>

                    {
                        this.state.show != 'question' &&
                         <Text style={styles.answerText}>{showingCard.answer}</Text>
                    }
                    <ShowQuestionOrAnswer toggle={this.showQuestionOrAnswer} current={this.state.show} />
                    <View>
                        <Button text='Correct' func={() => this.userAnswered('Correct', showingCard.answer)} />
                        <Button text='Incorrect' func={() => this.userAnswered('Incorrect', showingCard.answer)} />
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
    quizProgress: {
        flexDirection: 'row',
        paddingLeft: 200,
        marginTop: -60,
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
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    answerText: {
        fontSize: 26,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: blueDark
    }
});

function mapStateToProps(state, ownProps) {
    return { questions: state[ownProps.navigation.state.params.deck].questions };
}

export default connect(mapStateToProps)(QuizScreen);