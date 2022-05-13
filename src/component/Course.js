import React from 'react';
import {Button, View} from 'react-native';

export const Course = ({navigation, data}): Node => {
  return (
    <View>
      <Button
        title={data.name}
        onPress={() => {
          navigation.navigate('Questions', {
            courseId: data.id,
            courseName: data.name,
          });
        }}
      />
    </View>
  );
};
