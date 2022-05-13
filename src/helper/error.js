import {Alert} from 'react-native';

export function handleError(message) {
  return error => {
    console.error(message, error);
    Alert.alert('Error', message + '\n' + error, [
      {
        text: 'Dismiss',
      },
    ]);
  };
}
