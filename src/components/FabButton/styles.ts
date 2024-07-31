import {StyleSheet} from 'react-native'

export const stylesFabButton = StyleSheet.create({
  container: {
    backgroundColor: '#2e54d4',
    zIndex: 999,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '6%',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
})
