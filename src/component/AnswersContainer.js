import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import RadioButton from './RadioButton';

export default function AnswersContainer({
  values,
  questionId,
  onPress,
  navigation,
  questionResult,
}) {
  const [currentSelectedItem, setCurrentSelectedItem] = useState(-1);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setCurrentSelectedItem(-1);
    });
  }, [navigation]);

  const _onPress = (pressQuestionId, pressAnswerId, pressAnswer) => {
    onPress(pressQuestionId, pressAnswerId, pressAnswer);
    setCurrentSelectedItem(pressAnswerId);
  };

  const _getAnswerLetter = answerId => {
    switch (answerId) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      case 4:
        return 'E';
    }
  };

  const _renderRadioButtons = () => {
    return (values || []).map((answer, answerId) => {
      let isChecked = currentSelectedItem === answerId;
      return (
        <RadioButton
          key={answerId}
          onRadioButtonPress={() => _onPress(questionId, answerId, answer)}
          isChecked={isChecked}
          answer={answer}
          answerLetter={_getAnswerLetter(answerId)}
          questionResult={questionResult}
        />
      );
    });
  };
  return <View>{_renderRadioButtons()}</View>;
}
