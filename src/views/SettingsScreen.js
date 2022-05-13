import {Alert, Button, Text, TextInput, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {styles} from '../helper/styles';
import {getMultiData, storeMultiData} from '../helper/storage';
import {useIsFocused} from '@react-navigation/native';
import {isValidBackendUrl} from '../helper/util';

export function SettingsScreen({navigation}) {
  const [backendUrl, setBackendUrl] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [
    numberOfCorrectAnswersToMarkQuestionsAsMemorized,
    setNumberOfCorrectAnswersToMarkQuestionsAsMemorized,
  ] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    getMultiData([
      'backendUrl',
      'username',
      'password',
      'numberOfCorrectAnswersToMarkQuestionsAsMemorized',
    ]).then(values => {
      setBackendUrl(values.backendUrl);
      setUsername(values.username);
      setPassword(values.password);
      setNumberOfCorrectAnswersToMarkQuestionsAsMemorized(
        values.numberOfCorrectAnswersToMarkQuestionsAsMemorized,
      );
    });
  }, [isFocused]);

  const saveSettings = () => {
    const newNumberOfCorrectAnswersToMarkQuestionsAsMemorized = parseInt(
      numberOfCorrectAnswersToMarkQuestionsAsMemorized,
      10,
    );

    if (backendUrl === null || username === null || password === null) {
      Alert.alert(
        'Check values',
        'Backend URL, username and password cannot be null!',
        [{text: 'Dismiss'}],
      );
      return;
    } else if (!isValidBackendUrl(backendUrl)) {
      Alert.alert('Check Backend URL', 'Backend URL is not valid', [
        [{text: 'Dismiss'}],
      ]);
      return;
    } else if (
      Number.isNaN(newNumberOfCorrectAnswersToMarkQuestionsAsMemorized) ||
      newNumberOfCorrectAnswersToMarkQuestionsAsMemorized < 1
    ) {
      Alert.alert(
        'Number of correct answers to mark the questions as memorized',
        'The value of Number of correct answers to mark the questions as memorized cannot be lower than 1',
        [[{text: 'Dismiss'}]],
      );
      return;
    }
    const pairs = [
      ['backendUrl', backendUrl],
      ['username', username],
      ['password', password],
      [
        'numberOfCorrectAnswersToMarkQuestionsAsMemorized',
        numberOfCorrectAnswersToMarkQuestionsAsMemorized,
      ],
    ];
    storeMultiData(pairs).then(() => {
      Alert.alert('Save settings', 'Settings are saved', [
        {text: 'Dismiss', onPress: () => navigation.navigate('Home')},
      ]);
    });
  };

  return (
    <View>
      <Text style={styles.titleStyle}>Backend URL:</Text>
      <TextInput
        style={[styles.textbox, styles.p10, styles.m10]}
        placeholder="Backend URL"
        onChangeText={text => setBackendUrl(text)}
        defaultValue={backendUrl}
      />
      <Text style={styles.titleStyle}>Username:</Text>
      <TextInput
        style={[styles.textbox, styles.p10, styles.m10]}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        defaultValue={username}
      />
      <Text style={styles.titleStyle}>Password:</Text>
      <TextInput
        style={[styles.textbox, styles.p10, styles.m10]}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        defaultValue={password}
      />
      <Text style={styles.titleStyle}>
        Number of correct answers to mark the questions as memorized:
      </Text>
      <TextInput
        style={[styles.textbox, styles.p10, styles.m10]}
        placeholder="Number of correct answers to mark the questions as memorized"
        onChangeText={text =>
          setNumberOfCorrectAnswersToMarkQuestionsAsMemorized(text)
        }
        defaultValue={numberOfCorrectAnswersToMarkQuestionsAsMemorized}
      />
      <Button title={'Save'} onPress={saveSettings} />
    </View>
  );
}
