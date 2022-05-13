import * as React from 'react';
import {useEffect, useState} from 'react';
import {StudentScreen} from './StudentScreen';
import {CourseScreen} from './CourseScreen';
import {getData} from '../helper/storage';
import {useIsFocused} from '@react-navigation/native';

export function HomeScreen({navigation}) {
  const [studentId, setStudentId] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    getData('studentId').then(value => setStudentId(value));
  }, [isFocused]);

  return studentId === undefined ? (
    <StudentScreen navigation={navigation} />
  ) : (
    <CourseScreen navigation={navigation} />
  );
}
