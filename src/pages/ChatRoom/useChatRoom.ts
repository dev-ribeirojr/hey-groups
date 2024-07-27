import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppStackProps} from '../../routes/app.routes'
import {useEffect, useState} from 'react'

type ChatRoomNavigationProp = NativeStackNavigationProp<
  AppStackProps,
  'ChatRoom'
>

export function useChatRoom() {
  const navigation = useNavigation<ChatRoomNavigationProp>()
  const isFocused = useIsFocused()

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [isVisibleModal, setIsVisibleModal] = useState(false)

  useEffect(() => {
    loadUser()
  }, [isFocused])

  function loadUser() {
    if (!auth().currentUser) {
      setUser(null)
      return
    }
    const user = auth().currentUser?.toJSON()
    setUser(user as FirebaseAuthTypes.User)
  }

  function handleModalOrRedirect() {
    if (!user) {
      return navigation.navigate('SignIn')
    }
    handleVisibleModal('open')
  }

  async function handleSignOut() {
    try {
      await auth().signOut()
      navigation.navigate('SignIn')
      setUser(null)
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

  return {
    handleSignOut,
    handleVisibleModal,
    handleModalOrRedirect,
    isVisibleModal,
    user,
  }
}
