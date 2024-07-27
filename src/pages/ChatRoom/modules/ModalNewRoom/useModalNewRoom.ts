import {useState} from 'react'
import firestore from '@react-native-firebase/firestore'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'

export function useModalNewRoom({close}: {close: () => void}) {
  const [roomName, setRoomName] = useState('')
  const [loading, setLoading] = useState(false)

  const user = auth().currentUser?.toJSON() as FirebaseAuthTypes.User

  async function createNewRoom() {
    if (!roomName) {
      // nome vazio
      return
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

      close()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {roomName, loading, setRoomName, createNewRoom}
}
