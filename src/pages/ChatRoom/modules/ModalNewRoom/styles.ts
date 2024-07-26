import {StyleSheet} from 'react-native'

export const stylesModalNewRoom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34,34,34,0.4)',
  },
  modal: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
  input: {
    borderRadius: 6,
    backgroundColor: '#DDD',
    height: 45,
    marginVertical: 16,
    fontSize: 16,
    paddingHorizontal: 6,
  },
  buttonCreate: {
    borderRadius: 6,
    backgroundColor: '#2E54D4',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFF',
  },
})
