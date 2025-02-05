import {useState} from 'react'
import firestore from '@react-native-firebase/firestore'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {ModalNewRoomProps} from '.'
import {Alert} from 'react-native'

export function useModalNewRoom({close, updateScreen}: ModalNewRoomProps) {
  const [roomName, setRoomName] = useState('')
  const [loading, setLoading] = useState(false)

  const user = auth().currentUser?.toJSON() as FirebaseAuthTypes.User

  async function createNewRoom() {
    if (!roomName) {
      // nome vazio
      return
    }

    const verifyPermission = await verifyPermissionCreatedNewRoom()

    if (!verifyPermission) {
      return Alert.alert('Você já atingiu o limite de grupos por usuário')
    }

    setLoading(true)
    try {
      const response = await firestore()
        .collection('MESSAGE_TREADS')
        .add({
          name: roomName,
          owner: user?.uid,
          lastMessage: {
            text: `Grupo ${roomName} criado. Seja bem vindo.`,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
        })

      await response.collection('MESSAGES').add({
        text: `Grupo ${roomName} criado. Seja bem vindo.`,
        createdAt: firestore.FieldValue.serverTimestamp(),
        system: true,
      })
      updateScreen()
      close()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function verifyPermissionCreatedNewRoom(): Promise<boolean> {
    try {
      const response = await firestore().collection('MESSAGE_TREADS').get()

      let myThreads: number = 0

      response.docs.map((item) => {
        if (item.data().owner === user.uid) {
          myThreads += 1
        }
        return item
      })

      if (myThreads >= 4) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }

  return {roomName, loading, setRoomName, createNewRoom}
}
