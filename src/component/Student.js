import React from 'react';
import {Button, View} from 'react-native';
import {storeData} from '../helper/storage';

export const Student = ({navigation, data}): Node => {
  return (
    <View>
      <Button
        title={data.name}
        onPress={() => {
          storeData('studentId', data.id.toString()).then(() =>
            navigation.navigate('Courses'),
          );
        }}
      />
    </View>
  );
};
