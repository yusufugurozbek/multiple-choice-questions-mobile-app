import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/views/HomeScreen';
import {CourseScreen} from './src/views/CourseScreen';
import {QuestionScreen} from './src/views/QuestionScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Button, Linking} from 'react-native';
import {Common as common} from './src/constant/common';
import {SettingsScreen} from './src/views/SettingsScreen';
import {StudentScreen} from './src/views/StudentScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  const getDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <Button
          title="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        <Button
          title="Change Student"
          onPress={() => props.navigation.navigate('Students')}
        />
        <Button
          title="Settings"
          onPress={() => props.navigation.navigate('Settings')}
        />
        <Button
          title="GitHub"
          onPress={() =>
            Linking.openURL(
              'https://github.com/yusufugurozbek/multiple-choice-questions',
            )
          }
        />
      </DrawerContentScrollView>
    );
  };

  let commonOptions = {title: common.appName};

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={getDrawerContent}>
        <Drawer.Screen
          name="Home"
          options={commonOptions}
          component={HomeScreen}
        />
        <Drawer.Screen
          name="Students"
          options={commonOptions}
          component={StudentScreen}
        />
        <Drawer.Screen
          name="Courses"
          options={commonOptions}
          component={CourseScreen}
        />
        <Drawer.Screen
          name="Questions"
          options={commonOptions}
          component={QuestionScreen}
        />
        <Drawer.Screen
          name="Settings"
          options={commonOptions}
          component={SettingsScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
