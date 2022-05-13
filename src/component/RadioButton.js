import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {radioButtonStyles} from '../helper/styles';

const renderCheckedView = isChecked => {
  if (isChecked) {
    return <View style={[radioButtonStyles.radioButtonIconInnerIcon]} />;
  }
};

export default function RadioButton({
  isChecked,
  answer,
  answerLetter,
  onRadioButtonPress,
  questionResult,
}) {
  const getAnswerStyle = () => {
    if (
      questionResult !== undefined &&
      questionResult.correctAnswer === answer
    ) {
      return questionResult.result
        ? radioButtonStyles.correctAnswer
        : radioButtonStyles.wrongAnswer;
    }
  };

  return (
    <TouchableOpacity
      style={[radioButtonStyles.mainContainer, getAnswerStyle()]}
      onPress={onRadioButtonPress}>
      <View style={[radioButtonStyles.radioButtonIcon]}>
        {renderCheckedView(isChecked)}
      </View>
      <View style={[radioButtonStyles.radioButtonTextContainer]}>
        <Text>
          <Text style={radioButtonStyles.answerLetter}>{answerLetter}. </Text>
          <Text style={radioButtonStyles.radioButtonText}>{answer}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
