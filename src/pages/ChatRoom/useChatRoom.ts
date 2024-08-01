import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import firestore, {Timestamp} from '@react-native-firebase/firestore'
import {useIsFocused, useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AppStackProps} from '../../routes/app.routes'
import {useEffect, useState} from 'react'
import {Alert} from 'react-native'

type ChatRoomNavigationProp = NativeStackNavigationProp<
  AppStackProps,
  'ChatRoom'
>

export interface ThreadsProps {
  _id: string
  name: string
  owner: string
  lastMessage: {
    text: string
    createdAt: Timestamp | Date
  }
}

export function useChatRoom() {
  const navigation = useNavigation<ChatRoomNavigationProp>()
  const isFocused = useIsFocused()

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [threads, setThreads] = useState<ThreadsProps[] | null>(null)
  const [loadingThreads, setLoadingThreads] = useState(true)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [updateScreen, setUpdateScreen] = useState(false)

  useEffect(() => {
    getChats()
    return () => {
      getChats()
    }
  }, [isFocused, updateScreen])

  useEffect(() => {
    loadUser()
    return () => {
      loadUser()
    }
  }, [isFocused])

  async function getChats() {
    try {
      const response = await firestore()
        .collection('MESSAGE_TREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()

      const threadsDoc = response.docs.map((docSnap) => {
        return {
          _id: docSnap.id,
          name: '',
          lastMessage: {text: ''},
          ...docSnap.data(),
        } as ThreadsProps
      })

      setThreads(threadsDoc)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingThreads(false)
    }
  }

  function handleUpdateScreen() {
    setUpdateScreen(!updateScreen)
  }

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
  function deleteRoom(ownerId: string, id: string) {
    if (user && user.uid !== ownerId) {
      return
    }
    Alert.alert('Atenção!', 'Você tem certeza que deseja deletar essa sala?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => handleDeleteRoom(id),
      },
    ])
  }

  async function handleDeleteRoom(id: string) {
    try {
      await firestore().collection('MESSAGE_TREADS').doc(id).delete()
      setUpdateScreen(!updateScreen)
    } catch (error) {}
  }

  return {
    handleSignOut,
    handleVisibleModal,
    handleModalOrRedirect,
    handleUpdateScreen,
    deleteRoom,
    threads,
    loadingThreads,
    isVisibleModal,
    user,
  }
}
