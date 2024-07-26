import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppStackProps} from '../../routes/app.routes'
import {useState} from 'react'

type ChatRoomNavigationProp = NativeStackNavigationProp<
  AppStackProps,
  'ChatRoom'
>

export function useChatRoom() {
  const navigation = useNavigation<ChatRoomNavigationProp>()

  const [isVisibleModal, setIsVisibleModal] = useState(false)

  async function handleSignOut() {
    try {
      await auth().signOut()
      navigation.navigate('SignIn')
    } catch (error) {
      console.log(error)
    }
  }

  function handleVisibleModal(action: 'close' | 'open') {
    if (action === 'open') {
      setIsVisibleModal(true)
    } else {
      setIsVisibleModal(false)
    }
  }

  return {handleSignOut, handleVisibleModal, isVisibleModal}
}
