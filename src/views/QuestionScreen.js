import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Question} from '../component/Question';
import {useIsFocused, useScrollToTop} from '@react-navigation/native';
import {styles} from '../helper/styles';
import {
  fetchData,
  getAuthorizationHeader,
  handleFetchError,
  handleResponse,
} from '../helper/fetch';
import {getMultiData} from '../helper/storage';

export function QuestionScreen({route, navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [questionResults, setQuestionResults] = useState([]);
  const [backendUrl, setBackendUrl] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [studentId, setStudentId] = useState();

  const {courseId} = route.params;
  const {courseName} = route.params;

  const ref = React.useRef(null);
  useScrollToTop(ref);

  const isFocused = useIsFocused();

  useEffect(() => {
    getMultiData([
      'backendUrl',
      'username',
      'password',
      'studentId',
      'numberOfCorrectAnswersToMarkQuestionsAsMemorized',
    ]).then(values => {
      setBackendUrl(values.backendUrl);
      setUsername(values.username);
      setPassword(values.password);
      setStudentId(values.studentId);
      fetchData(
        values.backendUrl +
          'course/' +
          courseId +
          '/student/' +
          values.studentId +
          '?numberOfCorrectAnswersToMarkQuestionsAsMemorized=' +
          parseInt(values.numberOfCorrectAnswersToMarkQuestionsAsMemorized, 10),
        values.username,
        values.password,
        setQuestions,
        setLoading,
      );
    });
    return () => {
      setLoading(true);
      setQuestions([]);
      setQuestionResults([]);
    };
  }, [isFocused, courseId]);

  const answers = [];

  const onRadioButtonPress = (questionId, _answerId, answer) => {
    const index = answers.findIndex(item => item.questionId === questionId);
    const studentAnswer = {questionId: questionId, answer: answer};

    if (index === -1) {
      answers.push(studentAnswer);
    } else {
      answers[index] = studentAnswer;
    }
  };

  const sendAnswers = () => {
    const headers = {
      ...{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...getAuthorizationHeader(username, password),
    };
    const sendAnswersEndpoint = backendUrl + 'question?studentId=' + studentId;

    fetch(sendAnswersEndpoint, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(answers),
    })
      .then(handleResponse(response => response.json()))
      .then(result => showResult(result))
      .catch(handleFetchError(sendAnswersEndpoint));
  };

  const showResult = result => {
    setQuestionResults(result);
    const totalQuestion = questions.length;
    const correctAnswers = result.filter(x => x.result).length;
    const incorrectAnswers = result.filter(x => !x.result).length;
    const notAnswered = questions.length - result.length;
    const message =
      'Total Questions: ' +
      totalQuestion +
      '\n' +
      'Correct Answers: ' +
      correctAnswers +
      '\n' +
      'Incorrect Answers: ' +
      incorrectAnswers +
      '\n' +
      'Not Answered Questions: ' +
      notAnswered +
      '\n';
    Alert.alert('Result', message);
  };

  const resetCourse = () => {
    const resetCourseEndpoint =
      backendUrl + 'course/' + courseId + '/student/' + studentId;
    fetch(resetCourseEndpoint, {
      method: 'DELETE',
      headers: getAuthorizationHeader(username, password),
    })
      .then(
        handleResponse(() => {
          Alert.alert(
            'Reset course',
            'The course has been successfully reset',
            [{text: 'Dismiss', onPress: () => navigation.navigate('Home')}],
          );
        }),
      )
      .catch(handleFetchError(resetCourseEndpoint));
  };

  const renderQuestions = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    } else {
      if (questions.length > 0) {
        return (
          <ScrollView ref={ref}>
            {questions.map((question, index) => (
              <Question
                key={question.id}
                data={question}
                questionIndex={index}
                onPress={onRadioButtonPress}
                navigation={navigation}
                questionResult={questionResults.find(
                  item => item.questionId === question.id,
                )}
              />
            ))}
          </ScrollView>
        );
      } else {
        return (
          <Text style={styles.titleStyle}>
            Congratulations! You memorized all questions in this course.
          </Text>
        );
      }
    }
  };

  return (
    <View style={[styles.mainWrapper, styles.mb20]}>
      <Text style={styles.titleStyle}>Course: {courseName}</Text>
      {questions.length > 0 ? (
        <Text style={styles.titleStyle}>
          Total question: {questions.length}
        </Text>
      ) : null}
      {renderQuestions()}
      {questions.length > 0 ? (
        <Button title="Send answers" onPress={sendAnswers} />
      ) : null}
      <Button title="Reset this course" onPress={resetCourse} />
      <Button title="Go home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
