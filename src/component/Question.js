import React from 'react';
import {Alert, Button, SafeAreaView, Text, View} from 'react-native';
import AnswersContainer from './AnswersContainer';
import {questionStyles} from '../helper/styles';

export const Question = ({
  data,
  questionIndex,
  onPress,
  navigation,
  questionResult,
}): Node => {
  const showCorrectAnswer = () => {
    Alert.alert('Correct Answer', data.correctAnswer, [{text: 'Dismiss'}]);
  };

  return (
    <SafeAreaView>
      <View style={questionStyles.textContainer}>
        <Text style={questionStyles.text}>Question {questionIndex + 1}</Text>
        <Text style={questionStyles.question_context}>{data.question}</Text>
      </View>

      <AnswersContainer
        values={data.answers}
        questionId={data.id}
        onPress={onPress}
        navigation={navigation}
        questionResult={questionResult}
      />
      <View style={questionStyles.seperator_wrapper}>
        <View style={questionStyles.seperator} />
        <Button title={'Correct Answer'} onPress={showCorrectAnswer} />
        <View style={questionStyles.seperator} />
      </View>
    </SafeAreaView>
  );
};
