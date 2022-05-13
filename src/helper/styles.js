import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainWrapper: {flex: 1},
  centerItems: {alignItems: 'center'},
  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
  },
  m10: {margin: 10},
  mt10: {marginTop: 10},
  mb20: {marginBottom: 20},
  mb50: {marginBottom: 50},
  p10: {padding: 10},
  pb10: {paddingBottom: 10},
  textbox: {borderWidth: 1, borderColor: 'gray'},
});

export const questionStyles = StyleSheet.create({
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginLeft: 10,
  },
  text: {marginTop: 30, fontSize: 25, fontWeight: 'bold'},
  question_context: {fontSize: 20, marginTop: 10, marginBottom: 20},
  seperator: {flex: 1, height: 1, backgroundColor: 'gray', margin: 10},
  seperator_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
});

export const radioButtonStyles = StyleSheet.create({
  mainContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonIcon: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'gray',
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIconInnerIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'gray',
    borderRadius: 25 / 2,
    borderWidth: 3,
    borderColor: 'white',
  },
  radioButtonTextContainer: {
    flex: 5,
    justifyContent: 'center',
    margin: 15,
  },
  radioButtonText: {
    fontSize: 18,
  },
  answerLetter: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  correctAnswer: {backgroundColor: 'green'},
  wrongAnswer: {backgroundColor: 'red'},
});
