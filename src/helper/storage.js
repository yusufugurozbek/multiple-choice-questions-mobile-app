import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleError} from './error';
import {Common as common} from '../constant/common';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(common.storageKeyPrefix + key, value);
  } catch (error) {
    handleError('Error while getting data for key: ' + key);
  }
};

export const storeMultiData = async pairs => {
  const mappedPairs = pairs.map(pair => [
    common.storageKeyPrefix + pair[0],
    pair[1],
  ]);
  const keys = pairs.map(pair => common.storageKeyPrefix + pair[0]);
  try {
    await AsyncStorage.multiSet(mappedPairs);
  } catch (error) {
    handleError('Error while getting data for keys: ' + keys.toString());
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(common.storageKeyPrefix + key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    handleError('Error while getting data for key: ' + key);
  }
};

export const getMultiData = async keys => {
  const mappedKeys = keys.map(key => common.storageKeyPrefix + key);
  var result = {};
  try {
    const values = await AsyncStorage.multiGet(mappedKeys);
    if (values.length > 0) {
      values.forEach(
        value =>
          (result[value[0].replace(common.storageKeyPrefix, '')] = value[1]),
      );
    }
    return result;
  } catch (error) {
    handleError('Error while getting data for keys: ' + mappedKeys.toString());
  }
};
