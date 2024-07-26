import {Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native'
import {stylesFabButton} from './styles'

export function FabButton({onPress}: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={stylesFabButton.container}>
      <View>
        <Text style={stylesFabButton.text}>+</Text>
      </View>
    </TouchableOpacity>
  )
}
