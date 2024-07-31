import {StyleSheet} from 'react-native'

export const stylesThreads = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 240, 245, 0.5)',
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#121212',
  },
  description: {
    marginTop: 2,
    fontSize: 16,
  },
})
