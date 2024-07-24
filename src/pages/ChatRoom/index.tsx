import {Button, Text, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types'
import {AppStackProps} from '../../routes/app.routes'
import {useNavigation} from '@react-navigation/native'

type ChatRoomNavigationProp = NativeStackNavigationProp<
  AppStackProps,
  'ChatRoom'
>

export function ChatRoom() {
  const navigation = useNavigation<ChatRoomNavigationProp>()

  return (
    <SafeAreaView>
      <View>
        <Text>Chat Room</Text>
        <Button title="Login" onPress={() => navigation.navigate('SignIn')} />
      </View>
    </SafeAreaView>
  )
}
