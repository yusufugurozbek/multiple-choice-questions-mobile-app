import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Course} from '../component/Course';
import {styles} from '../helper/styles';
import {fetchData} from '../helper/fetch';
import {getMultiData} from '../helper/storage';
import {useIsFocused, useScrollToTop} from '@react-navigation/native';

export function CourseScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();

  const ref = React.useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    getMultiData(['backendUrl', 'username', 'password']).then(values => {
      if (
        values.backendUrl === null ||
        values.username === null ||
        values.password === null
      ) {
        return navigation.navigate('Settings');
      }
      fetchData(
        values.backendUrl + 'course',
        values.username,
        values.password,
        setCourses,
        setLoading,
      );
    });
    return () => {
      setLoading(true);
      setCourses([]);
    };
  }, [isFocused, navigation]);

  return (
    <View style={[styles.mainWrapper, styles.mb50]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={[styles.centerItems, styles.mt10, styles.pb10]}>
          <Text style={styles.titleStyle}>Please select a course</Text>
          <ScrollView ref={ref}>
            {courses.map(course => (
              <Course key={course.id} data={course} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
