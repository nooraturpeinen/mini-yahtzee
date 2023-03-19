import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    marginBottom: 15,
    backgroundColor: '#95c98a',
    flexDirection: 'row'
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 19,
    fontWeight: 'bold',
    color: '#549746',
    textAlign: 'center'
  },
  textInput: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    width: 300
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: "row",
    padding: 3,
    backgroundColor: "#a692d9",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 165
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  rules: {
    margin: 15
  },
  board: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  total: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 7,
    color: '#549746',
    fontWeight: 'bold'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center'
  },
  dicePoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center',
    marginTop: 3,
    marginBottom: 3
  },
  player: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#549746',
    textAlign: 'center'
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#95c98a',
    flexDirection: 'row'
  },
  author: {
    color: '#ffffff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10
  }
});