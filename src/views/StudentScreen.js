import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Student} from '../component/Student';
import {styles} from '../helper/styles';
import {fetchData} from '../helper/fetch';
import {getMultiData} from '../helper/storage';
import {useIsFocused, useScrollToTop} from '@react-navigation/native';

export function StudentScreen({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
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
        values.backendUrl + 'student',
        values.username,
        values.password,
        setStudents,
        setLoading,
      );
    });
    return () => {
      setLoading(true);
      setStudents([]);
    };
  }, [isFocused, navigation]);

  return (
    <View style={[styles.mainWrapper, styles.mb50]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={[styles.centerItems, styles.mt10, styles.pb10]}>
          <Text style={styles.titleStyle}>Please select a student</Text>
          <ScrollView ref={ref}>
            {students.map(student => (
              <Student
                key={student.id}
                data={student}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
