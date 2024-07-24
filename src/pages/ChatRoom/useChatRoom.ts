import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppStackProps} from '../../routes/app.routes'

type ChatRoomNavigationProp = NativeStackNavigationProp<
  AppStackProps,
  'ChatRoom'
>

export function useChatRoom() {
  const navigation = useNavigation<ChatRoomNavigationProp>()

  async function handleSignOut() {
    try {
      await auth().signOut()
      navigation.navigate('SignIn')
    } catch (error) {
      console.log(error)
    }
  }
  return {handleSignOut}
}
